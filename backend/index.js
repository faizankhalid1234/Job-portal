import express from "express";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./ROUTES/user.routes.js";
import companyRoutes from "./ROUTES/company.routes.js";
import jobRoutes from "./ROUTES/job.routes.js";
import applicationRoutes from "./ROUTES/application.routes.js";

// Setup env and paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

// Connect to DB
connectDB();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5174", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use("/uploads", express.static(join(__dirname, "uploads")));

// ================= ROUTES =================
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/company", companyRoutes);
app.use("/api/v1/job", jobRoutes); // ✅ Corrected path
app.use("/api/v1/application", applicationRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Job Portal API is running successfully...");
});

// Public folder (optional)
app.use(express.static("public"));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
