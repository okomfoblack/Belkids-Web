// controllers/bookingController.js
import Booking from "../models/Booking.js";

const isValidPhone = (raw) => {
  if (!raw || typeof raw !== "string") return false;
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(cleaned)) return false;
  const digits = cleaned.replace(/^\+/, "");
  if (/^(\d)\1+$/.test(digits)) return false;
  if (/^0?1234567/.test(digits)) return false;
  return true;
};

const isClosedDay = (date) => {
  const day = new Date(date).getDay();
  return day === 1 || day === 2;
};

const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

export const createBooking = async (req, res) => {
  try {
    const {
      packageName,
      amount,
      fullName,
      phone,
      email,
      eventDate,
      kidsCount
    } = req.body;

    if (!packageName || !amount) {
      return res
        .status(400)
        .json({ success: false, message: "packageName and amount required" });
    }
    if (!fullName || !fullName.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Full name is required" });
    }
    if (!phone || !isValidPhone(phone)) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid phone number" });
    }
    if (!eventDate) {
      return res
        .status(400)
        .json({ success: false, message: "Event date is required" });
    }
    if (!kidsCount || Number(kidsCount) < 1) {
      return res.status(400).json({
        success: false,
        message: "Number of kids is required (min 1)"
      });
    }

    const date = startOfDay(eventDate);
    if (isNaN(date.getTime())) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid event date" });
    }
    if (isClosedDay(date)) {
      return res.status(400).json({
        success: false,
        message: "We are closed on Mondays and Tuesdays"
      });
    }
    const today = startOfDay(new Date());
    if (date < today) {
      return res
        .status(400)
        .json({ success: false, message: "Event date cannot be in the past" });
    }

    const clash = await Booking.findOne({
      eventDate: date,
      status: { $in: ["pending", "confirmed"] }
    });
    if (clash) {
      return res.status(400).json({
        success: false,
        message: "That date is already booked. Please choose another."
      });
    }

    const booking = await Booking.create({
      user: req.user.id,
      packageName,
      amount,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email || req.user.email || "",
      eventDate: date,
      kidsCount: Number(kidsCount),
      rulesAccepted: true,
      status: "pending"
    });

    return res.status(201).json({ success: true, data: booking });
  } catch (err) {
    console.error("createBooking:", err.message);
    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "That date is already booked. Please choose another."
      });
    }
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const checkAvailability = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ success: false, message: "date is required" });
    }
    const d = startOfDay(date);
    if (isNaN(d.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid date" });
    }
    if (isClosedDay(d)) {
      return res
        .status(200)
        .json({ success: true, available: false, reason: "closed" });
    }
    const existing = await Booking.findOne({
      eventDate: d,
      status: { $in: ["pending", "confirmed"] }
    });
    return res.status(200).json({ success: true, available: !existing });
  } catch (err) {
    console.error("checkAvailability:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).sort({
      createdAt: -1
    });
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
      return res
        .status(400)
        .json({ success: false, message: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user", "username email");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Not found" });
    return res.status(200).json({ success: true, data: booking });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};