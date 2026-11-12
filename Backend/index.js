// index.js
import dotenv from "dotenv";
dotenv.config();

console.log("\n🔍 Environment:");
console.log("  MONGO_URI:", process.env.MONGO_URI ? "✅" : "❌");
console.log("  JWT_SECRET:", process.env.JWT_SECRET ? "✅" : "❌");
console.log("  FRONTEND_URL:", process.env.FRONTEND_URL || "❌");

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fs from "fs";
import crypto from "crypto";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/upload.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import Payment from "./models/Payment.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// WEBHOOK (must be before express.json)
app.post(
  "/api/payments/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const hash = crypto
        .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
        .update(req.body)
        .digest("hex");
      if (hash !== req.headers["x-paystack-signature"]) return res.sendStatus(401);

      const event = JSON.parse(req.body.toString());
      if (event.event === "charge.success") {
        await Payment.findOneAndUpdate(
          { reference: event.data.reference },
          { status: "success", paystackData: event.data }
        );
        console.log("✅ Webhook payment:", event.data.reference);
      }
      return res.sendStatus(200);
    } catch (err) {
      console.error("Webhook error:", err.message);
      return res.sendStatus(500);
    }
  }
);

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

const origins = [
  process.env.FRONTEND_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || origins.includes(origin)) return cb(null, true);
      console.warn("⚠️ CORS blocked:", origin);
      cb(new Error(`Origin ${origin} not allowed`));
    },
    credentials: true,
  })
);

// Uploads
const uploadDir = path.join(__dirname, "uploads/profiles");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    console.log("📀 Database:", mongoose.connection.name);
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

// Routes — mounted ONCE each
app.use("/api/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);

console.log("\n🛣️  Routes mounted: auth, upload, payments, bookings, users\n");

// Root
app.get("/", (_req, res) => {
  res.json({
    message: "Belkids API Running",
    routes: ["/api/auth", "/api/upload", "/api/payments", "/api/bookings", "/api/users"],
  });
});

app.get("/api/test", (_req, res) => {
  res.json({ success: true, message: "Backend working!", time: new Date() });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("❌ Error:", err.message);
  if (err.code === "LIMIT_FILE_SIZE")
    return res.status(400).json({ success: false, message: "File too large (5MB max)" });
  res.status(err.status || 500).json({ success: false, message: err.message || "Server Error" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Not found: ${req.method} ${req.originalUrl}` });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("==================================================");
  console.log(`🚀 Server: http://localhost:${PORT}/`);
  console.log(`❤️  Test:   http://localhost:${PORT}/api/test`);
  console.log("==================================================\n");
});