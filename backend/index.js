import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import cors from "cors";
import connectDB from "./config/db.js";

// ================== Routes ==================
import userRoutes from "./ROUTES/user.routes.js";
import companyRoutes from "./routes/company.routes.js";
import jobRoutes from "./routes/job.routes.js";
import applicationRoutes from "./routes/application.routes.js";

// ================== Environment Setup ==================
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: `${__dirname}/.env` });

// ================== Database Connection ==================
connectDB();

// ================== Express App ==================
const app = express();

// ================== Middlewares ==================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve Uploaded Images (very important)
import path from "path";
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================== API Routes ==================
app.use("/api/v1/user", userRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

// ================== Public Folder ==================
app.use(express.static("public"));

// ================== Start Server ==================
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
