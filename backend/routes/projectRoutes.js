const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const projectController = require("../controllers/projectController");

const uploadProject = upload("projects");
// Route untuk mengupload gambar proyek
router.post("/", authMiddleware, uploadProject.single("image"), projectController.create);
router.get("/", authMiddleware, projectController.getAll);
router.get("/:id", authMiddleware, projectController.getOneProject);
router.put("/:id", authMiddleware, uploadProject.single("image"), projectController.update);
router.delete("/:id", authMiddleware, projectController.delete);

module.exports = router;