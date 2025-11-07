import express from "express";
import {
  getJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/job.controller.js";

const router = express.Router();

// ✅ Test route
router.get("/test", (req, res) => {
  console.log("✅ /test route hit");
  res.send("Job route is working!");
});

// ✅ All jobs
router.get("/all", getJobs);

// ✅ CRUD routes
router.post("/create", createJob);        // <-- Add "/create" to match frontend
router.get("/:id", getJobById);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;
