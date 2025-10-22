import Application from "../models/application.model.js";

export const applyJob = async (req, res) => {
  try {
    const { jobId, userId } = req.body;
    const application = await Application.create({
      job: jobId,
      applicant: userId,
    });
    res.status(201).json({ message: "Applied successfully", application });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("job")
      .populate("applicant");
    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
