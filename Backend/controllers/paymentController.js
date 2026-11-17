// controllers/paymentController.js
import Payment from "../models/Payment.js";
import Booking from "../models/Booking.js";
import axios from "axios";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

export const initializePayment = async (req, res) => {
  try {
    const { email, amount, packageName, bookingId } = req.body;

    if (!email || !amount || !packageName) {
      return res.status(400).json({
        success: false,
        message: "email, amount, and packageName are required"
      });
    }

    if (!PAYSTACK_SECRET) {
      return res.status(500).json({
        success: false,
        message: "PAYSTACK_SECRET_KEY is not set in the backend .env"
      });
    }

    const payment = await Payment.create({
      user: req.user?.id || null,
      booking: bookingId || null,
      reference: `BK_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      amount: Math.round(Number(amount) * 100),
      status: "pending",
      packageName
    });

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: payment.amount,
        reference: payment.reference,
        currency: "GHS",
        callback_url: `${FRONTEND_URL}/payment-callback`
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data.status) {
      return res.status(200).json({
        success: true,
        authorization_url: response.data.data.authorization_url,
        reference: payment.reference
      });
    }

    return res.status(400).json({
      success: false,
      message: "Paystack initialization failed"
    });
  } catch (error) {
    console.error(
      "initializePayment error:",
      error.response?.data || error.message
    );
    return res.status(500).json({
      success: false,
      message: error.response?.data?.message || error.message || "Server Error"
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { reference } = req.params;

    const payment = await Payment.findOne({ reference });
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found"
      });
    }

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } }
    );

    const paystackData = response.data.data;

    if (
      paystackData.status === "success" &&
      paystackData.amount >= payment.amount
    ) {
      payment.status = "success";
      payment.paystackData = paystackData;
      await payment.save();

      if (payment.booking) {
        await Booking.findByIdAndUpdate(payment.booking, {
          status: "confirmed",
          paid: true,
          paymentReference: reference
        });
      }

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully"
      });
    }

    payment.status = "failed";
    await payment.save();
    return res.status(400).json({
      success: false,
      message: "Payment verification failed"
    });
  } catch (error) {
    console.error(
      "verifyPayment error:",
      error.response?.data || error.message
    );
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllPayments = async (_req, res) => {
  try {
    const payments = await Payment.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("getAllPayments error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user?.id }).sort({
      createdAt: -1
    });
    return res.status(200).json({ success: true, data: payments });
  } catch (error) {
    console.error("getMyPayments error:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const paystackWebhook = async (req, res) => {
  try {
    const crypto = (await import("crypto")).default;
    const hash = crypto
      .createHmac("sha512", PAYSTACK_SECRET)
      .update(req.body)
      .digest("hex");

    if (hash !== req.headers["x-paystack-signature"]) {
      return res.sendStatus(401);
    }

    const event = JSON.parse(req.body.toString());
    if (event.event === "charge.success") {
      const { reference } = event.data;

      const payment = await Payment.findOneAndUpdate(
        { reference },
        { status: "success", paystackData: event.data },
        { new: true }
      );

      if (payment?.booking) {
        await Booking.findByIdAndUpdate(payment.booking, {
          status: "confirmed",
          paid: true,
          paymentReference: reference
        });
      }

      console.log("✅ Webhook: payment success →", reference);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.error("paystackWebhook error:", error.message);
    return res.sendStatus(500);
  }
};