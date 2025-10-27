import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  status: { type: String, enum: ["Applied", "Reviewed", "Accepted", "Rejected"], default: "Applied" },
  resume: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Application", applicationSchema);
