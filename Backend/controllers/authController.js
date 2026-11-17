// controllers/authController.js
import dotenv from "dotenv";
dotenv.config();

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

let transporter;
try {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD },
    });
    transporter.verify((err) => {
      if (err) console.error("❌ Email verify:", err.message);
      else console.log("✅ Email transporter ready");
    });
  }
} catch (err) {
  console.error("❌ Transporter error:", err.message);
}

const signToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

/**
 * Validates an international phone number.
 * Mirrors the frontend rule:
 *  - optional leading "+"
 *  - 7–15 digits after stripping spaces/dashes/parentheses
 *  - rejects all-same-digit fakes (0000000)
 *  - rejects straight-run fakes (1234567)
 */
const isValidPhone = (raw) => {
  if (!raw || typeof raw !== "string") return false;
  const cleaned = raw.replace(/[\s\-()]/g, "");
  if (!/^\+?\d{7,15}$/.test(cleaned)) return false;
  const digits = cleaned.replace(/^\+/, "");
  if (/^(\d)\1+$/.test(digits)) return false;
  if (/^0?1234567/.test(digits)) return false;
  return true;
};

export const signup = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmPassword,
      phone,
      profileImage,
    } = req.body;

    // Required fields
    if (!username || !email || !password || !confirmPassword || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields (including phone number)",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Server-side phone validation
    if (!isValidPhone(phone)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid international phone number (7–15 digits, optional +)",
      });
    }

    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    if (await User.findOne({ username })) {
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let avatar = `https://ui-avatars.com/api/?name=${username}&background=2E7D32&color=fff`;
    if (
      profileImage &&
      typeof profileImage === "string" &&
      profileImage.trim() !== ""
    ) {
      if (
        profileImage.startsWith("/uploads/") ||
        profileImage.startsWith("data:image") ||
        profileImage.startsWith("http")
      ) {
        avatar = profileImage;
      }
    }

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      phone: phone.trim(),
      profileImage: avatar,
    });

    console.log("✅ Signup:", user.email, "| Phone:", user.phone);
    const token = signToken(user);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({
      success: false,
      message: err.message || "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log("✅ Login:", user.email);
    const token = signToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email)
      return res.status(400).json({ success: false, message: "Email required" });
    if (!transporter)
      return res.status(500).json({
        success: false,
        message: "Email not configured",
      });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "No account found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${
      process.env.FRONTEND_URL || "http://localhost:5173"
    }/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"Belkids" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Reset Your Belkids Password",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #2E7D32;">Reset Password</h2>
          <p>Hello ${user.username},</p>
          <p>Click below to reset your password. Expires in 1 hour.</p>
          <a href="${resetUrl}" style="display:inline-block; padding:14px 30px; background:#2E7D32; color:#fff; text-decoration:none; border-radius:8px; font-weight:700;">Reset Password</a>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Reset link sent" });
  } catch (err) {
    console.error("❌ Forgot error:", err);
    res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Both fields required",
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const newToken = signToken(user);
    res.status(200).json({
      success: true,
      message: "Password reset successful",
      token: newToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        phone: user.phone || "",
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("❌ Reset error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid token" });
    res.status(200).json({ success: true, email: user.email });
  } catch {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};