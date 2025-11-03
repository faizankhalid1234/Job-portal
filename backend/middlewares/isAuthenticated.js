import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Auth Token:", token);
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Invalid token", success: false });
    }

    // ✅ Typo fix: 'decode' → 'decoded'
    req.id = decoded.userId;
    console.log("decoded", decoded);

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res
      .status(401)
      .json({ message: "Authentication failed", success: false });
  }
};

export default isAuthenticated;
