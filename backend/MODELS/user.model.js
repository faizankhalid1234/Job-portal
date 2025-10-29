import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ["user", "recruiter"], default: "user" },
    profile: {
      type: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        profilePicture: { type: String },
      },
      default: {}, // ✅ Default empty profile object
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
