const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const userRoutes = require("./routes/userRoutes");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());

// Middleware untuk menangani file statis (misal gambar profile)
app.use(express.json()); // ini aman untuk JSON
app.use(express.urlencoded({ extended: true })); // juga aman untuk form-urlencoded
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // tampilkan gambar

//routes
app.use("/api/auth", authRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
