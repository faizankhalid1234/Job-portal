import Job from "../models/job.model.js";

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({ message: "Job created", job });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("company");
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
