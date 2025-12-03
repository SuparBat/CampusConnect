const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendEmail");
const multer = require("multer");
const path = require("path");
const Company = require("../company/company.model"); 
const Admin = require("../admin/admin.model"); // make sure path is correct
// adjust path if needed


// Temporary memory OTP store (use Redis/DB for production)
let otpStore = {};

// ------------------ OTP ------------------
// Step 1: Request OTP
const requestOtp = async (req, res) => {
  const { email } = req.body;
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = otp;
    await sendEmail(email, "Your OTP for Campus Connect", `Your OTP is: ${otp}`);
    res.json({ message: "OTP sent to email" });
  } catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

// Step 2: Verify OTP & Register
const registerUser = async (req, res) => {
  const { name, email, password, role, otp } = req.body;
  try {
    // Verify OTP
    if (!otpStore[email] || otpStore[email] !== otp) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    let userExists;

    if (role === "student") {
      userExists = await User.findOne({ email });
    } else if (role === "company") {
      userExists = await Company.findOne({ email });
    } else if (role === "admin") {
      userExists = await Admin.findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === "student") {
      newUser = await User.create({ name, email, password: hashedPassword, role });
    } else if (role === "company") {
      newUser = await Company.create({ name, email, password: hashedPassword, role });
    } else if (role === "admin") {
      newUser = await Admin.create({ name, email, password: hashedPassword, role });
    }

    delete otpStore[email]; // clear OTP after success

    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: role,
      token: jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "30d" }),
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

// ------------------ Login ------------------

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    let user;

    if (role === "student") {
      user = await User.findOne({ email });
    } else if (role === "company") {
      user = await Company.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.password) return res.status(400).json({ message: "No password set for this account" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role, // explicitly return the requested role
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------ Forgot/Reset Password ------------------

// Forgot Password - Step 1: Request OTP
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore[email] = { otp, expiry };

    // Configure mail transporter (use Gmail app password or SMTP)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Forgot Password - Step 2: Reset password with OTP
const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ message: "No OTP found. Request again." });
    if (record.expiry < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email];
    res.json({ message: "Password reset successful. Please login again." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ------------------ Resume Upload ------------------

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Resume upload handler
const uploadResume = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    user.resume = req.file.path;
    await user.save();

    res.status(200).json({ message: "Resume uploaded successfully", path: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  requestOtp,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  uploadResume,
  upload, // export multer middleware
};
