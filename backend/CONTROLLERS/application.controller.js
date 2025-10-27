import Application from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const application = await Application.create({
      user: req.body.userId,
      job: req.body.jobId,
      resume: req.body.resume || ""
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getApplicationsByUser = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.params.userId }).populate("job");
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(app);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
