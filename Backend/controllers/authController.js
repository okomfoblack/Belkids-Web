// controllers/authController.js
import dotenv from 'dotenv';
dotenv.config();

import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

// ✅ DEBUG - Check if .env is loading
console.log('🔍 Checking Email Configuration:');
console.log('  EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('  EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ SET' : '❌ NOT SET');
console.log('  EMAIL_SERVICE:', process.env.EMAIL_SERVICE || '❌ NOT SET');

// ✅ Configure email transporter
let transporter;

try {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.error('❌ Email credentials missing! Please check your .env file');
  } else {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // ✅ Verify transporter connection
    transporter.verify((error, success) => {
      if (error) {
        console.error('❌ Email transporter verification failed:', error.message);
      } else {
        console.log('✅ Email transporter is ready to send emails');
      }
    });
  }
} catch (error) {
  console.error('❌ Failed to create email transporter:', error.message);
}

// ============================================
// SIGNUP - FIXED
// ============================================
export const signup = async (req, res) => {
  try {
    console.log('📝 Signup request received:', req.body);

    const {
      username,
      email,
      password,
      confirmPassword,
      profileImage,
    } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      console.log('❌ Missing fields:', { username, email, password, confirmPassword });
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    if (password !== confirmPassword) {
      console.log('❌ Passwords do not match');
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Check if username is taken
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      console.log('❌ Username already taken:', username);
      return res.status(400).json({
        success: false,
        message: "Username already taken",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Handle profile image
    let avatar = `https://ui-avatars.com/api/?name=${username}&background=ff7739&color=fff`;
    if (profileImage && profileImage.trim() !== "") {
      if (profileImage.startsWith('/uploads/') || 
          profileImage.startsWith('data:image') || 
          profileImage.startsWith('http')) {
        avatar = profileImage;
      }
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      profileImage: avatar,
    });

    console.log('✅ User created successfully:', user.email);

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return response
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ============================================
// LOGIN - FIXED
// ============================================
export const login = async (req, res) => {
  try {
    console.log('🔑 Login request received:', req.body.email);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    console.log('✅ Login successful for:', user.email);

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ============================================
// FORGOT PASSWORD - Send reset link
// ============================================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    console.log('📧 Forgot password request for:', email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email address",
      });
    }

    // Check if transporter is configured
    if (!transporter) {
      console.error('❌ Email transporter not configured');
      return res.status(500).json({
        success: false,
        message: "Email service is not configured. Please check server logs.",
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(404).json({
        success: false,
        message: "No account found with this email address",
      });
    }

    console.log('✅ User found:', user.username);

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('🔑 Reset token generated');
    
    // Hash the token before storing in database
    const hashedToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set token and expiry on user document
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 3600000; // 1 hour

    await user.save({ validateBeforeSave: false });
    console.log('✅ Reset token saved to database');

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`;
    console.log('🔗 Reset URL:', resetUrl);

    // Simple email HTML
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            background: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #ff7739, #ff5733);
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            color: white;
            margin: 0;
            font-size: 28px;
          }
          .content {
            padding: 40px 30px;
          }
          .content h2 {
            color: #1a1a1a;
            font-size: 22px;
          }
          .button-container {
            text-align: center;
            margin: 32px 0;
          }
          .reset-button {
            display: inline-block;
            padding: 14px 40px;
            background: linear-gradient(135deg, #ff7739, #ff5733);
            color: white !important;
            text-decoration: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
          }
          .link-container {
            background: #f4f4f4;
            padding: 16px;
            border-radius: 8px;
            margin: 16px 0;
            word-break: break-all;
          }
          .warning {
            background: #fef2f2;
            border-left: 4px solid #ef4444;
            padding: 12px 16px;
            border-radius: 4px;
            margin: 20px 0;
          }
          .warning p {
            margin: 0;
            color: #991b1b;
          }
          .footer {
            background: #fafafa;
            padding: 24px 30px;
            text-align: center;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 0;
            font-size: 14px;
            color: #6b7280;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🛍️ ShopSphere</h1>
            <p style="color: rgba(255,255,255,0.9);">Password Reset Request</p>
          </div>
          <div class="content">
            <h2>Hello ${user.username} 👋</h2>
            <p>We received a request to reset your password for your ShopSphere account. Click the button below to create a new password:</p>
            
            <div class="button-container">
              <a href="${resetUrl}" class="reset-button">Reset Password</a>
            </div>
            
            <p>Or copy and paste this link into your browser:</p>
            <div class="link-container">
              <a href="${resetUrl}">${resetUrl}</a>
            </div>
            
            <div class="warning">
              <p>⚠️ This link will expire in <strong>1 hour</strong> for security reasons.</p>
            </div>
            
            <p>If you didn't request this password reset, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: `"ShopSphere" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'Reset Your Password - ShopSphere',
      html: emailHTML,
    };

    console.log('📤 Attempting to send email to:', user.email);

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);

    res.status(200).json({
      success: true,
      message: "Password reset link sent to your email",
    });

  } catch (error) {
    console.error("❌ Forgot password error:", error);
    
    // If email fails, clear token fields
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        console.log('🧹 Reset token cleared from database');
      }
    } catch (err) {
      console.error("Error clearing token:", err);
    }

    res.status(500).json({
      success: false,
      message: "Error sending password reset email. Please try again.",
      error: error.message,
    });
  }
};

// ============================================
// RESET PASSWORD
// ============================================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    console.log('🔑 Reset password request');

    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide password and confirm password",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Password validation
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    if (!/[A-Z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain an uppercase letter",
      });
    }

    if (!/[a-z]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain a lowercase letter",
      });
    }

    if (!/[0-9]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain a number",
      });
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return res.status(400).json({
        success: false,
        message: "Password must contain a special character",
      });
    }

    // Hash the token from URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log('❌ Invalid or expired token');
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    console.log('✅ Token verified for user:', user.email);

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    console.log('✅ Password reset successful for:', user.email);

    // Generate new JWT for automatic login
    const newToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Password reset successful",
      token: newToken,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });

  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// ============================================
// VERIFY RESET TOKEN
// ============================================
export const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.params;

    console.log('🔍 Verifying token');

    if (!token) {
      console.log('❌ No token provided');
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    // Hash the token from URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      console.log('❌ Invalid or expired token');
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token",
      });
    }

    console.log('✅ Token verified for user:', user.email);

    res.status(200).json({
      success: true,
      message: "Token is valid",
      email: user.email,
    });

  } catch (error) {
    console.error("❌ Verify token error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};