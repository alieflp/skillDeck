const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

const uploadProfile = upload("profiles");
// Proteksi semua route dengan auth
router.get("/profile", authMiddleware, userController.getProfile);
router.put("/profile",authMiddleware,
  uploadProfile.single("profilePicture"),
  userController.updateProfile
);
module.exports = router;
