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

exports.getOneProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!project) return res.status(404).json({ message: "Project tidak ditemukan" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!project) return res.status(404).json({ message: "Project tidak ditemukan" });

    const {
      title,
      description,
      skills,
      progress,
      githubLink,
      category,
    } = req.body;

    if (req.file) {
      project.image = req.file.filename;
    }

    await project.update({
      title,
      description,
      skills,
      progress,
      githubLink,
      category,
      image: project.image,
    });

    res.json({ message: "Project berhasil diperbarui", project });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.delete = async (req, res) => {
  try {
    const project = await Project.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });
    if (!project) return res.status(404).json({ message: "Project tidak ditemukan" });

    await project.destroy();
    res.json({ message: "Project berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

