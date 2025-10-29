import express from "express";
import { registerUser, loginUser, updateProfile } from "../CONTROLLERS/user.controller.js";
import isAuthenticated from "../middlewears/is Authenticated.js";
import upload from "../middlewears/multer.js"; 

const router = express.Router();

// ✅ Routes
router.post("/register", upload.any(), registerUser);
router.post("/login", loginUser);
router.post("/profile/update", isAuthenticated,updateProfile);


export default router;
