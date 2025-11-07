import jwt from "jsonwebtoken";
import { User } from "../MODELS/user.model.js"; // User model

const isAuthenticated = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false });
    }

    // Set req.id to user ID from token
    req.id = decoded.id || decoded.userId || decoded._id;

    // Fetch user from DB to confirm they exist
    const user = await User.findById(req.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized", success: false });
    }

    // Continue to next middleware or route
    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res
      .status(401)
      .json({ message: "Authentication failed", success: false });
  }
};

export default isAuthenticated;
