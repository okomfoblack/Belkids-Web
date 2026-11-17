// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    packageName: { type: String, required: true },
    amount: { type: Number, required: true },

    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },

    eventDate: { type: Date, required: true },
    kidsCount: { type: Number, required: true, min: 1 },

    rulesAccepted: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending"
    },
    paymentReference: { type: String, default: null },
    paid: { type: Boolean, default: false }
  },
  { timestamps: true }
);

bookingSchema.index(
  { eventDate: 1 },
  {
    unique: true,
    partialFilterExpression: { status: { $in: ["pending", "confirmed"] } }
  }
);

export default mongoose.model("Booking", bookingSchema);