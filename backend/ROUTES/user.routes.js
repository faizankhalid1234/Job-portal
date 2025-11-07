import express from "express";
import { registerUser, loginUser, updateProfile, getProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js"; // agar files upload karte ho

const router = express.Router();

// ✅ Register user
router.post("/register", upload.any(), registerUser);

// ✅ Login user
router.post("/login", loginUser);

// ✅ Get & Update profile (protected)
router.get("/profile", isAuthenticated, getProfile);
router.put("/update", isAuthenticated, upload.any(), updateProfile);

export default router;
