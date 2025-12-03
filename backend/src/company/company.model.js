const mongoose = require("mongoose"); // <-- add this

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // add this for login
    phone: { type: String },
    website: { type: String },
    location: { type: String },
    foundingYear: { type: String },
    companySize: { type: String },
    industry: { type: String },
    bio: { type: String },
    mission: { type: String },
    values: [{ type: String }],
    benefits: [{ type: String }],
    logo: { type: String },
    role: { type: String, default: "company" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", companySchema);
