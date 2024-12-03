import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protectRoute = async (req, res) => {
  try {
    const token = req.cookies.token; // Get token from cookies
    
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Verify the JWT token
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }
    const user = await User.findById(decoded.id).select("-password"); // Find the user by ID from token

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Authenticated", user, token});
    
  } catch (error) {
    return res.status(401).json({ message: "Invalid token or expired", error: error.message });
  }
};

export { protectRoute };
