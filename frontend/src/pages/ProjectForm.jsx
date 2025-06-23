import { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post(
      "http://localhost:3001/api/projects",
      {
        title,
        description,
        skills,
        progress: parseInt(progress),
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert("Berhasil tambah proyek");
    window.location.href = "/dashboard";
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Tambah Proyek Baru</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Judul"
        />
        <br />
        <input
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          placeholder="Skill (pisahkan dengan koma)"
        />
        <br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Deskripsi"
        ></textarea>
        <br />
        <input
          type="number"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          placeholder="Progress %"
        />
        <br />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
};

export default ProjectForm;
