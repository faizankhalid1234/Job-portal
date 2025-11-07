import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  location: { type: String, default: "" },
  salary: { type: String, default: "" },
  description: { type: String, default: "" },
  skills: { type: [String], default: [] }
}, { timestamps: true });

// ✅ Check if model exists before defining
export default mongoose.models.Job || mongoose.model("Job", jobSchema);
