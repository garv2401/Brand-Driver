// controllers/userAuthController.js
import User from "../models/User.js";
import jwt from "jsonwebtoken";
//import sendEmail from "../utils/sendEmail.js";
import sendEmail from "../utils/sendEmail.js";

const createToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};



//on frontend
// POST to /api/auth/user/register
//await axios.post("/api/auth/user/register", { name, email, password });
//<Route path="/verify-email" element={<EmailVerificationPage />} />
// go on this link at frontend "http://localhost:5173/verify?token=${token}" and then 
// request for verify-email/:token



export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const token = jwt.sign({ name, email, password }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    //add frontend link later
    const verificationLink = `https://brand-driver-server.onrender.com/api/user/verify-email?token=${token}`;

    await sendEmail(email, "Verify your account", `Click here to verify: ${verificationLink}`);

    res.status(200).json({ message: "Verification email sent" });
  } catch (err) {
    res.status(500).json({ message: "Error sending verification", error: err.message });
  }
};


export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = createToken(user);
    res.cookie("userToken", token, { httpOnly: true, sameSite: "Lax" });
    res.status(200).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};




//GET REQUEST SENT HERE LIKE THIS
// https://brand-driver-server.onrender.com/api/user/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSm9obiBEb2UiLCJlbWFpbCI6ImpvaG53aWNrMzc2NjdAZ21haWwuY29tIiwicGFzc3dvcmQiOiJzZWNyZXQxMjMiLCJpYXQiOjE3NDkyNzg4NjMsImV4cCI6MTc0OTM2NTI2M30.rgkfB6WETdexfiB_2lArlz4VRrD8C7URKZyx85CH34c

export const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const { name, email, password } = jwt.verify(token, process.env.JWT_SECRET);
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "Email verified, account created", user });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token", error: err.message });
  }
};


export const logoutUser = (req, res) => {
  res.clearCookie("userToken");
  res.status(200).json({ message: "User logged out" });
};
