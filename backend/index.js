// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";

// Routes
import userRoutes from "./ROUTES/user.routes.js";
import jobRoutes from "./ROUTES/job.routes.js";

// ------------------- Setup -------------------
dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

// Fix __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ------------------- Middleware -------------------
app.use(
  cors({
    origin: "http://localhost:5174", // 👈 your frontend port (Vite usually)
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files from uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ------------------- Routes -------------------
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/job", jobRoutes);
app.use("/uploads", express.static("uploads"));


// Test route
app.get("/", (req, res) => {
  res.send("✅ Job Portal API is running successfully...");
});

// ------------------- Connect DB & Start Server -------------------
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
