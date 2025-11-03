import { User } from "../MODELS/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ================= REGISTER USER =================
export const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, userType } = req.body;

    console.log("Body:", req.body);
    console.log("Files:", req.files || req.file);

    // Validate input
    if (!firstName || !lastName || !email || !password || !userType) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields", success: false });
    }

    // Check if user already exists
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ message: "User already exists", success: false });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      userType,
      profile: {}, // empty profile initially
    });

    res.status(201).json({
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
    res.status(500).json({ message: "Server error" });
  }
};

// ================= LOGIN USER =================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, email: user.email, userType: user.userType },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        profile: user.profile,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= UPDATE PROFILE =================
export const updateProfile = async (req, res) => {
  try {
    const userId = req.id; // from JWT via isAuthenticated middleware
    const { firstName, lastName, email } = req.body;

    // Handle nested profile fields and file uploads
    const profile = {
      phone: req.body["profile[phone]"] || "",
      location: req.body["profile[location]"] || "",
      skills: req.body["profile[skills]"]
        ? Array.isArray(req.body["profile[skills]"])
          ? req.body["profile[skills]"]
          : [req.body["profile[skills]"]]
        : [],
    };

    if (req.files) {
      req.files.forEach((file) => {
        if (file.fieldname === "profilePicture") profile.profilePicture = file.path;
        if (file.fieldname === "resume") profile.resume = file.path;
      });
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, email, profile },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Profile Update Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const userId = req.id; // set by isAuthenticated middleware

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({
      message: "Server error while fetching profile",
      error: error.message,
    });
  }
};
