const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const upload = require("../middleware/uploadMiddleware");

const uploadProfile = upload("profiles");

router.post("/register", uploadProfile.single("profilePicture"), register);
router.post("/login", login);

module.exports = router;
