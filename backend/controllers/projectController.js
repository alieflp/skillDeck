const { Project } = require("../models");

exports.getAll = async (req, res) => {
  try {
    const projects = await Project.findAll({
      where: { userId: req.user.id },
      order: [["createdAt", "DESC"]],
    });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      title,
      description,
      skills,
      progress,
      githubLink,
      category,
    } = req.body;

    // Ambil nama file dari multer
    const image = req.file ? req.file.filename : null;

    const project = await Project.create({
      title,
      description,
      image, // nama file, bukan path lengkap
      skills,
      progress,
      githubLink,
      category,
      userId: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("Error saat membuat proyek:", err);
    res.status(400).json({ error: err.message });
  }
};
