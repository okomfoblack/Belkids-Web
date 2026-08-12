// server.js
// ✅ MUST BE THE VERY FIRST THING
import dotenv from 'dotenv';
dotenv.config();

// ✅ Debug - Check if .env loaded
console.log('🔍 Environment Variables:');
console.log('  EMAIL_USER:', process.env.EMAIL_USER || '❌ NOT SET');
console.log('  EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? '✅ SET' : '❌ NOT SET');
console.log('  EMAIL_SERVICE:', process.env.EMAIL_SERVICE || '❌ NOT SET');
console.log('  PORT:', process.env.PORT || '❌ NOT SET');
console.log('  JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET' : '❌ NOT SET');
console.log('  MONGO_URI:', process.env.MONGO_URI ? '✅ SET' : '❌ NOT SET');
console.log('  FRONTEND_URL:', process.env.FRONTEND_URL || '❌ NOT SET');

// ✅ THEN import everything else
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/upload.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, "uploads"),
  path.join(__dirname, "uploads/profiles")
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`Created directory: ${dir}`);
  }
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "ShopSphere API Running",
    version: "1.0.0",
    endpoints: {
      auth: {
        signup: "/api/auth/signup [POST]",
        login: "/api/auth/login [POST]",
        forgotPassword: "/api/auth/forgot-password [POST]",
        resetPassword: "/api/auth/reset-password/:token [POST]",
        verifyResetToken: "/api/auth/verify-reset-token/:token [GET]",
      },
      upload: "/api/upload [POST]"
    }
  });
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ 
    success: true, 
    message: "Backend is working!",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      success: false,
      message: "File too large. Maximum size is 5MB"
    });
  }
  
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Upload directory: ${path.join(__dirname, "uploads/profiles")}`);
  console.log(`API endpoints:`);
  console.log(`  POST /api/auth/signup - Create new account`);
  console.log(`  POST /api/auth/login - Login user`);
  console.log(`  POST /api/auth/forgot-password - Request password reset`);
  console.log(`  POST /api/auth/reset-password/:token - Reset password`);
  console.log(`  GET /api/auth/verify-reset-token/:token - Verify reset token`);
});