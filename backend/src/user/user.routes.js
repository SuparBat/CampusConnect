const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  requestOtp,
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  uploadResume
} = require("./user.controller");

const router = express.Router();

// ✅ Multer setup for resume uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/resumes"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Forgot Password - Step 1: Request OTP
router.post("/forgot-password", forgotPassword);

// ✅ Forgot Password - Step 2: Reset password with OTP
router.post("/reset-password", resetPassword);

// ✅ Other existing routes
router.post("/request-otp", requestOtp);
router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Upload resume route
router.post("/:userId/resume", upload.single("resume"), uploadResume);

module.exports = router;
