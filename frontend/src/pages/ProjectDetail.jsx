import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
  const [error, setError] = useState("");

  const fetchProject = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/api/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setForm(res.data);
    } catch (err) {
      console.error("Fetch project failed", err);
      setError("Gagal memuat data proyek.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.skills) {
      setError("Semua field wajib diisi.");
      return;
    }

    if (form.progress < 0 || form.progress > 100) {
      setError("Progress harus antara 0 hingga 100.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (image) formData.append("image", image);

    try {
      await axios.put(`http://localhost:3001/api/project/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Project berhasil diperbarui");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update gagal", err);
      setError("Terjadi kesalahan saat update proyek.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Yakin ingin menghapus project ini?")) return;
    try {
      await axios.delete(`http://localhost:3001/api/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Project berhasil dihapus");
      navigate("/dashboard");
    } catch (err) {
      console.error("Delete gagal", err);
      setError("Gagal menghapus proyek.");
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">✏️ Edit Proyek</h2>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleUpdate} className="space-y-4" encType="multipart/form-data">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Judul"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Deskripsi"
            rows="4"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 px-4 py-2 rounded bg-white"
          />
          <input
            type="text"
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="Skill (pisahkan dengan koma)"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="number"
            name="progress"
            value={form.progress}
            onChange={handleChange}
            min="0"
            max="100"
            required
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            name="githubLink"
            value={form.githubLink}
            onChange={handleChange}
            placeholder="Link GitHub"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Kategori"
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Hapus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectDetail;
