import express from "express";
import { applyJob, getApplicationsByUser, updateApplicationStatus } from "../controllers/application.controller.js";

const router = express.Router();

router.post("/", applyJob);
router.get("/user/:userId", getApplicationsByUser);
router.put("/:id/status", updateApplicationStatus);

export default router;
