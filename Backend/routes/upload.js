// routes/upload.js
import express from "express";
import upload from "../middleware/upload.js";
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.post("/upload", upload.single("profileImage"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ success: false, message: "No file" });

    const optimizedPath = req.file.path.replace(/\.[^/.]+$/, "_optimized.jpg");
    await sharp(req.file.path)
      .resize(300, 300, { fit: "cover", position: "center" })
      .jpeg({ quality: 80 })
      .toFile(optimizedPath);
    fs.unlinkSync(req.file.path);

    const imageUrl = `/uploads/profiles/${path.basename(optimizedPath)}`;
    res.status(200).json({ success: true, imageUrl });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;