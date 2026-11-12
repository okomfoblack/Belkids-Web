// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    packageName: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    eventDate: {
      type: Date
    },
    guests: {
      type: Number,
      default: 0
    },
    notes: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    },
    paymentReference: {
      type: String,
      default: null
    },
    paid: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);