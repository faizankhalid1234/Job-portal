import express from 'express';
import { registerUser, loginUser, updateProfile, getProfile } from '../CONTROLLERS/user.controller.js';
import upload from '../middlewares/upload.js';  // ✅ only once
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

// Register route with image upload
router.post("/register", upload.single("profileImage"), registerUser);

// Update profile with image upload
router.put("/update", isAuthenticated, upload.single("profileImage"), updateProfile);

// Login route
router.post("/login", loginUser);

// Get current user profile
router.get("/me", isAuthenticated, getProfile);

export default router;
