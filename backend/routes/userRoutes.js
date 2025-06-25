const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const uploadMiddleware = require("../middleware/uploadMiddleware");

// Proteksi semua route dengan auth
router.get("/profile", authMiddleware, userController.getProfile);
router.put(
  "/profile",
  authMiddleware,
  uploadMiddleware.single("profilePicture"),
  userController.updateProfile
);
module.exports = router;
