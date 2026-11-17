// models/Payment.js
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null
    },
    reference: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending"
    },
    packageName: { type: String, default: "" },
    paystackData: { type: Object, default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);