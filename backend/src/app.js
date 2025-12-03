const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const userRoutes = require("./user/user.routes");
const adminRoutes = require("./admin/admin.routes");
const companyRoutes = require("./company/company.routes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/company", companyRoutes);

module.exports = app;
