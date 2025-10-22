import express from "express";
import { registerUser, getUsers } from "../controllers/user.controller.js";

const router = express.Router();

// Register new user
// POST → /api/users/register
router.post("/register", registerUser);

// Get all users
// GET → /api/users/
router.get("/", getUsers);

export default router;
