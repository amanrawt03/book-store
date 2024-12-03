import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginFn = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Fill all required fields" });
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValidPass = await bcrypt.compare(password, user.password);
    if (!isValidPass)
      return res.status(400).json({ message: "Incorrect password" });
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: false, // Makes the cookie accessible only to the server (prevents JS access)
      maxAge: 3600000, // Cookie expires after 1 hour
      sameSite: 'None', // Necessary for cross-origin requests
      secure: process.env.NODE_ENV === 'production', // Set to true for production (HTTPS required)
    });
    
    return res
      .status(200)
      .json({ user: user});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const signupFn = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (!username || !email || !password || !confirmPassword)
      return res.status(400).json({ message: "Fill all required fields" });
    const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User already have an account" });
    }
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Incorrect password" });
    const saltRounds = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
      sameSite: "None",
    });
    return res
      .status(200)
      .json({ message: "Successfully Created", user: newUser });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { loginFn, signupFn };
