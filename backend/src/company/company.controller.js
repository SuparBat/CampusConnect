const Company = require('./company.model');
const Job = require('./job.model'); // make sure path is correct
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

// In-memory OTP store (⚠️ for production, use DB/Redis)
// Note: This is separate from the user and admin OTP stores.
let otpStore = {};


// --- COMPANY PROFILE ---

exports.getCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- FORGOT/RESET PASSWORD ---

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const company = await Company.findOne({ email });
    if (!company) return res.status(404).json({ message: "Company not found" });

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
      subject: "Company Password Reset OTP",
      text: `Your OTP is ${otp}. It expires in 5 minutes.`,
    });

    res.json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const record = otpStore[email];

    if (!record) return res.status(400).json({ message: "No OTP found. Request again." });
    if (record.expiry < Date.now()) return res.status(400).json({ message: "OTP expired" });
    if (record.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await Company.updateOne({ email }, { password: hashedPassword });

    delete otpStore[email];
    res.json({ message: "Password reset successful. Please login again." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateCompanyProfile = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.companyId, req.body, { new: true });
    if (!company) return res.status(404).json({ message: 'Company not found' });
    res.json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- JOBS ---

exports.addJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      requirements: req.body.requirements || [],
      skills: req.body.skills || [],
      company: req.params.companyId
    };
    const job = await Job.create(jobData);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.params.companyId });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// company.controller.js


exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: 'active' });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// --- APPLICANTS ---

exports.getApplicants = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId).populate('applicants');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job.applicants || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
