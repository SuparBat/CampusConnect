const express = require("express");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Admin = require("./admin.model"); // Make sure this exists
const adminController = require("./admin.controller");

const router = express.Router();

// In-memory OTP store (⚠️ use DB/Redis in production)
let otpStore = {};

// --- Admin Login ---
router.post("/login", adminController.login);

// --- Dashboard Data ---
router.get("/dashboard", adminController.getDashboardData);

// --- Forgot Password - Step 1 ---
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore[email] = { otp, expiry };

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
      subject: "Admin Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Reset Password - Step 2 ---
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ message: "No OTP found. Request again." });
    if (record.expiry < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Admin.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email];
    res.json({ message: "Password reset successful. Please login again." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// --- Students ---
router.get("/students", adminController.getAllStudents);
router.delete("/students/:studentId", adminController.deleteStudent);

// --- Companies ---
router.get("/companies", adminController.getAllCompanies);
router.delete("/companies/:companyId", adminController.deleteCompany);

module.exports = router;
