// routes/paymentRoutes.js
import express from "express";
import {
  initializePayment,
  verifyPayment,
  getAllPayments,
  getMyPayments,
  paystackWebhook
} from "../controllers/paymentController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/initialize", protect, initializePayment);
router.get("/verify/:reference", verifyPayment);
router.get("/all", protect, admin, getAllPayments);
router.get("/my-payments", protect, getMyPayments);
router.post("/webhook", paystackWebhook);

export default router;