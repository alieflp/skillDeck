import { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Proyek"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Skill (pisahkan dengan koma)"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi Proyek"
            rows={4}
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <input
            type="number"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            placeholder="Progress (%)"
            min="0"
            max="100"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <a
            href="/dashboard"
            className="text-sm text-gray-600 hover:underline"
          >
            ← Kembali ke Dashboard
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectForm;
