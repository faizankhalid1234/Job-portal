import { Job } from "../MODELS/job.model.js";

// ================= CREATE JOB =================
export const createJob = async (req, res) => {
  try {
    const recruiterId = req.id; // from isAuthenticated middleware
    const { title, description, location, skillsRequired, salary } = req.body;

    if (!title || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Title and Description required" });
    }

    const job = await Job.create({
      title,
      description,
      location,
      skillsRequired: skillsRequired || [],
      salary,
      recruiter: recruiterId,
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error("Create Job Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= GET RECRUITER JOBS =================
export const getMyJobs = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobs = await Job.find({ recruiter: recruiterId });
    res.status(200).json({ success: true, jobs });
  } catch (error) {
    console.error("Get Jobs Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= UPDATE JOB =================
export const updateJob = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobId = req.params.id;

    const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    const { title, description, location, skillsRequired, salary } = req.body;

    job.title = title || job.title;
    job.description = description || job.description;
    job.location = location || job.location;
    job.salary = salary || job.salary;
    if (skillsRequired) job.skillsRequired = skillsRequired;

    await job.save();
    res.status(200).json({ success: true, job });
  } catch (error) {
    console.error("Update Job Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// ================= DELETE JOB =================
export const deleteJob = async (req, res) => {
  try {
    const recruiterId = req.id;
    const jobId = req.params.id;

    const job = await Job.findOneAndDelete({ _id: jobId, recruiter: recruiterId });
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });

    res.status(200).json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Delete Job Error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};
