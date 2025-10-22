import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    location: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

const Company = mongoose.model("Company", companySchema);
export default Company;
