import mongoose from "mongoose";

const recruiterSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    companyWebsite: { type: String },
    role: { type: String, enum: ["recruiter"], default: "recruiter" },
  },
  { timestamps: true }
);

// ✅ Correct Named Export
export const Recruiter = mongoose.model("Recruiter", recruiterSchema);
