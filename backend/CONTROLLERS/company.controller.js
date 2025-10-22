import Company from "../models/company.model.js";

export const registerCompany = async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json({ message: "Company registered", company });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
