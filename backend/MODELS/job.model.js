import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  location: { type: String, default: "" },
  salary: { type: String, default: "" },
  type: { type: String, default: "Full-time" },
  requirements: { type: [String], default: [] }
}, { timestamps: true });

export default mongoose.model("Job", jobSchema);
