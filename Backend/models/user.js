// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profileImage: {
    type: String,
    default: "",
  },
  // ✅ Password reset fields - REQUIRED for forgot password
  resetPasswordToken: {
    type: String,
    default: undefined,
  },
  resetPasswordExpire: {
    type: Date,
    default: undefined,
  },
}, {
  timestamps: true,
});

export default mongoose.model("User", UserSchema);