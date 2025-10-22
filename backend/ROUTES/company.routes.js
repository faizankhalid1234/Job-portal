import express from "express";
import { registerCompany, getCompanies } from "../controllers/company.controller.js";

const router = express.Router();

// Register new company
// POST → /api/companies/register
router.post("/register", registerCompany);

// Get all companies
// GET → /api/companies/
router.get("/", getCompanies);

export default router;
