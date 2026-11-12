// controllers/userController.js
import User from "../models/user.js";

export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    console.log("📊 getAllUsers →", users.length, "users");
    return res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.error("getAllUsers error:", err.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found" });
    return res.status(200).json({ success: true, data: user });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateMe = async (req, res) => {
  try {
    const { username, profileImage } = req.body;
    const updates = {};
    if (username) updates.username = username.trim();
    if (profileImage) updates.profileImage = profileImage;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");
    return res.status(200).json({ success: true, data: user });
  } catch {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};