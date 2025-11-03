import express from "express";
import {
  registerUser,
  loginUser,
  updateProfile,
  getProfile,
} from "../CONTROLLERS/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// ✅ Routes
router.post("/register", upload.any(), registerUser);
router.post("/login", loginUser);
router.put("/update", isAuthenticated, updateProfile); // ✅ FIXED HERE
router.get("/profile", isAuthenticated, getProfile);

export default router;
