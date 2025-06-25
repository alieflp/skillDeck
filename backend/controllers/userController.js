const { User } = require("../models");
const path = require("path");
const fs = require("fs");

// Ambil profil user yang sedang login
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ["id", "name", "email", "phone", "profilePicture", "role", "isActive", "lastLogin"],
    });

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil profil", error: err.message });
  }
};

// Update data profil (tanpa ganti foto)
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);

    if (!user) return res.status(404).json({ message: "User tidak ditemukan" });

    const { name, email, phone } = req.body;

    // Update field yang dikirim (email tidak wajib diupdate)
    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

        // Jika ada file dikirim, update foto juga
    if (req.file) {
      // Hapus foto lama jika ada
      if (user.profilePicture) {
        const oldPath = path.join(__dirname, "..", ".. ", user.profilePicture);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      user.profilePicture = `/uploads/${req.file.filename}`;
    }

    await user.save();

        res.json({
      message: "Profil berhasil diperbarui",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        profilePicture: user.profilePicture,
        role: user.role,
        isActive: user.isActive,
        lastLogin: user.lastLogin,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Gagal update profil", error: err.message });
  }
};