const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  getCompanyProfile,
  updateCompanyProfile,
  addJob,
  getJobs,
  deleteJob,
  getApplicants,
  forgotPassword,
  resetPassword
} = require("./company.controller");

const router = express.Router();

// ✅ Multer setup for job-related uploads if needed (optional)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/company"); // Make sure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// --- FORGOT PASSWORD - Step 1: Request OTP ---
router.post("/forgot-password", forgotPassword);

// --- RESET PASSWORD - Step 2 ---
router.post("/reset-password", resetPassword);

// --- COMPANY PROFILE ROUTES ---
router.get("/:companyId/profile", getCompanyProfile);
router.put("/:companyId/profile", updateCompanyProfile);

// --- JOB ROUTES ---
router.post("/:companyId/jobs", addJob);
router.get("/:companyId/jobs", getJobs);
router.delete("/:companyId/jobs/:jobId", deleteJob);

// --- APPLICANTS ---
router.get("/:companyId/jobs/:jobId/applicants", getApplicants);

module.exports = router;
