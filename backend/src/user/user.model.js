const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String },
  field: { type: String },
  startYear: { type: String },
  endYear: { type: String },
  gpa: { type: String },
  description: { type: String },
});

const certificateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String },
  issueDate: { type: Date },
  expiryDate: { type: Date },
  credentialId: { type: String },
  url: { type: String },
  description: { type: String },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true }, // student or company

    // Profile fields
    resume: { type: String }, // file path or URL

    // Nested arrays for education and certificates
    education: [educationSchema],
    certificates: [certificateSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
