const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const projectController = require("../controllers/projectController");

// Route untuk mengupload gambar proyek
router.post("/", authMiddleware, upload.single("image"), projectController.create);

module.exports = router;
