const Admin = require('../admin/admin.model');
const User = require("../user/user.model");
const Company = require('../company/company.model'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    const companies = await Company.find();
    res.json({
      studentsCount: students.length,
      companiesCount: companies.length,
      students,
      companies,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findByIdAndDelete(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findByIdAndDelete(companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });
    res.json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
