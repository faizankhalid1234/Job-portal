import { User } from "../MODELS/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    if (!firstName || !lastName || !email || !password || !userType) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Handle profile image (optional)
    const imageURL = req.file
  ? `${req.protocol}://${req.get("host")}/uploads/profile/${req.file.filename}`
  : null;

const user = await User.create({
  firstName,
  lastName,
  email,
  password: hashedPassword,
  userType,
  profile: { profilePicture: imageURL }, // 👈 Full URL save kar
});
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please enter email and password" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id; 
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Update email if changed
    const newEmail = req.body.email?.trim();
    if (newEmail && newEmail !== user.email) {
      const existingUser = await User.findOne({ email: newEmail });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "Email already exists",
        });
      }
      user.email = newEmail;
    }

    // Update basic fields
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;

    // Profile fields initialization
    if (!user.profile) user.profile = {};

    // Update profile image
    if (req.file) {
      // Delete old image (optional)
      if (user.profile.profilePicture && fs.existsSync(`.${user.profile.profilePicture}`)) {  // Updated
        fs.unlinkSync(`.${user.profile.profilePicture}`);
      }
      user.profile.profilePicture = `/uploads/profile/${req.file.filename}`;  // Updated
    }

    // Update other profile fields
    user.profile.phone = req.body["profile[phone]"] || user.profile.phone;
    user.profile.location = req.body["profile[location]"] || user.profile.location;

    // Skills
    const skills = req.body["profile[skills]"];
    if (skills) {
      try {
        user.profile.skills = JSON.parse(skills);
      } catch {
        user.profile.skills = skills.split(",").map((s) => s.trim());
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating profile",
      error: error.message,
    });
  }
};

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const userId = req.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // full URL for image
    const fullProfile = { ...user.toObject() };
    if (fullProfile.profile?.profilePicture) {  // Updated
      fullProfile.profile.profilePicture = `${req.protocol}://${req.get("host")}${fullProfile.profile.profilePicture}`;  // Updated
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user: fullProfile,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
      error: error.message,
    });
  }
};
