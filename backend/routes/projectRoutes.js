const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { getAll, create } = require("../controllers/projectController");

router.get("/", auth, getAll);
router.post("/", auth, create);

module.exports = router;
