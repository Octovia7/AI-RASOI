const User = require("../models/userModel");
const sendEmailOTP = require("../utils/sendEmailOTP");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const newUser = await User.create({
      email,
      password: hashedPassword,
      otp: {
        code: otp,
        expiresAt: otpExpires,
        attempts: 0,
        verified: false,
      },
    });

    await sendEmailOTP(email, otp);
    return res.status(201).json({ message: "Signup successful. OTP sent to email." });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user || !user.otp.code)
      return res.status(400).json({ message: "OTP not requested or invalid user" });

    if (user.isVerified)
      return res.status(400).json({ message: "User already verified" });

    if (user.otp.attempts >= 5)
      return res.status(429).json({ message: "Too many incorrect attempts" });

    if (user.otp.expiresAt < new Date())
      return res.status(410).json({ message: "OTP expired" });

    if (user.otp.code !== otp) {
      user.otp.attempts += 1;
      await user.save();
      return res.status(400).json({ message: "Incorrect OTP" });
    }

    user.otp.verified = true;
    user.isVerified = true;
    await user.save();

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      message: "OTP verified. Account activated.",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    console.error("OTP verification error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.isVerified)
      return res.status(403).json({ message: "Please verify your email via OTP" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
