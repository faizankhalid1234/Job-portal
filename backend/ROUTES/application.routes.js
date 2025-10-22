import express from "express";
import { applyJob, getApplications } from "../controllers/application.controller.js";

const router = express.Router();

// Apply for a job
// POST → /api/applications/apply
router.post("/apply", applyJob);

// Get all job applications
// GET → /api/applications/
router.get("/", getApplications);

export default router;
