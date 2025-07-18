const { User } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

// REGISTER USER (dengan upload foto)
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    const file = req.file;

    // Cek apakah user dengan email tersebut sudah ada
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email sudah digunakan" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Path foto (jika ada)
    const profilePicture = file ? `/uploads/profiles/${file.filename}` : null;

    // Buat user baru
    const user = await User.create({
      name,
      email,
      password: hashed,
      phone,
      role: "user",
      isActive: true,
      profilePicture,
      lastLogin: null,
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        profilePicture: user.profilePicture,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN USER
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "name",
        "email",
        "password",
        "phone",
        "role",
        "isActive",
        "profilePicture",
        "lastLogin",
      ],
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Password salah" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || "skilldeck_secret",
      { expiresIn: "1d" }
    );

    user.lastLogin = new Date();
    await user.save();

    res.json({
      message: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        isActive: user.isActive,
        profilePicture: user.profilePicture,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
