const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Fungsi untuk membuat folder jika belum ada
const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Fungsi generator middleware upload
const upload = (type = "projects") => {
  const folderMap = {
    projects: "uploads/projects",
    profiles: "uploads/profiles",
  };

  const destination = folderMap[type] || "uploads/others";
  ensureDir(destination);

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + "-" + file.originalname;
      cb(null, uniqueName);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (allowed.includes(file.mimetype)) cb(null, true);
    else cb(new Error("Hanya file gambar yang diperbolehkan"), false);
  };

  return multer({ storage, fileFilter });
};

module.exports = upload;
