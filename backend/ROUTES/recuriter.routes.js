import express from "express";
import {
  createJob,
  getMyJobs,
  updateJob,
  deleteJob,
} from "../CONTROLLERS/recruiter.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ Recruiter can only manage their own jobs
router.post("/", isAuthenticated, createJob);
router.get("/myjobs", isAuthenticated, getMyJobs);
router.put("/:id", isAuthenticated, updateJob);
router.delete("/:id", isAuthenticated, deleteJob);

export default router;
