import { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    skills: "",
    progress: 0,
    githubLink: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("skills", form.skills);
    formData.append("progress", form.progress);
    formData.append("githubLink", form.githubLink);
    formData.append("category", form.category);
    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.post("http://localhost:3001/api/project", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Berhasil tambah proyek");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Gagal menambahkan proyek");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Tambah Proyek Baru
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul Proyek"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi Proyek"
            rows={4}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-4 py-2 rounded-md bg-white"
          />
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skill (pisahkan dengan koma)"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            placeholder="Progress (%)"
            min="0"
            max="100"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="Link GitHub Proyek"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Kategori (misal: Frontend, Backend, Fullstack)"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition duration-200 disabled:opacity-60"
          >
            {loading ? "Menyimpan..." : "Simpan Proyek"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/dashboard" className="text-sm text-gray-600 hover:underline">
            ← Kembali ke Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
