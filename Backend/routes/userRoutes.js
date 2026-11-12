// routes/userRoutes.js
import express from "express";
import { getAllUsers, getMe, updateMe } from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);
router.get("/all", protect, admin, getAllUsers);

export default router;