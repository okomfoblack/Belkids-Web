// controllers/bookingController.js
import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const { packageName, amount, eventDate, guests, notes, paymentReference } = req.body;
    if (!packageName || !amount) {
      return res.status(400).json({ success: false, message: "packageName and amount required" });
    }
    const booking = await Booking.create({
      user: req.user.id,
      packageName,
      amount,
      eventDate: eventDate || null,
      guests: guests || 0,
      notes: notes || "",
      paymentReference: paymentReference || null,
      paid: !!paymentReference,
      status: paymentReference ? "confirmed" : "pending",
    });
    return res.status(201).json({ success: true, data: booking });
  } catch (err) {
    console.error("createBooking:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: bookings });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getAllBookings = async (_req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "username email profileImage")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: bookings });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "cancelled", "completed"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "username email");
    if (!booking) return res.status(404).json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, data: booking });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};