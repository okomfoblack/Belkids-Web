// routes/bookingRoutes.js
import express from "express";
import {
  createBooking,
  checkAvailability,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} from "../controllers/bookingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/check-availability", protect, checkAvailability);
router.get("/my", protect, getMyBookings);
router.get("/all", protect, admin, getAllBookings);
router.patch("/:id/status", protect, admin, updateBookingStatus);

export default router;