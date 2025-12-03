const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String },
    location: { type: String },
    type: { type: String, enum: ["Full-time", "Part-time", "Internship", "Contract"], default: "Full-time" },
    salary: { type: String },
    experience: { type: String, enum: ["Entry Level", "1-3 years", "3-5 years", "5+ years"], default: "Entry Level" },
    description: { type: String },
    requirements: [{ type: String }],
    skills: [{ type: String }],
    postedDate: { type: Date, default: Date.now },
    deadline: { type: Date },
    status: { type: String, enum: ["active", "draft", "closed"], default: "active" },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // student IDs
    company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
