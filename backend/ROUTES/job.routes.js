import express from "express";
import { createJob, getJobs } from "../controllers/job.controller.js";

const router = express.Router();

// Create new job
// POST → /api/jobs/create
router.post("/create", createJob);

// Get all jobs
// GET → /api/jobs/
router.get("/", getJobs);

export default router;
