import Job from "../models/job.model.js";
import Company from "../models/company.model.js"; // ✅ Import Company model

// GET all jobs
export const getJobs = async (req, res) => {
  console.log("✅ getJobs hit"); // debug
  try {
    const jobs = await Job.find().populate("company"); // populate company details
    res.status(200).json({ success: true, jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Create job
export const createJob = async (req, res) => {
  console.log("📩 Received job data:", req.body); // debug line
  try {
    let companyId = req.body.company;

    // Agar company string (name) hai, ObjectId find karo ya create karo
    if (isNaN(companyId) && typeof companyId === "string") {
      let company = await Company.findOne({ name: companyId });
      if (!company) {
        company = await Company.create({ name: companyId });
      }
      companyId = company._id;
    }

    const job = await Job.create({ ...req.body, company: companyId });
    const populatedJob = await Job.findById(job._id).populate("company");
    res.status(201).json({ success: true, job: populatedJob });
  } catch (err) {
    console.error("❌ Job creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("company");
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });
    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update job
export const updateJob = async (req, res) => {
  try {
    let companyId = req.body.company;

    // Agar company name hai, ObjectId find karo ya create karo
    if (companyId && typeof companyId === "string") {
      let company = await Company.findOne({ name: companyId });
      if (!company) {
        company = await Company.create({ name: companyId });
      }
      companyId = company._id;
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { ...req.body, company: companyId },
      { new: true }
    ).populate("company");

    res.status(200).json({ success: true, job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete job
export const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
