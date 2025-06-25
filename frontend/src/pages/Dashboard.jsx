import { useEffect, useState } from "react";
import axios from "axios";
import { FaGithub, FaEdit, FaTrash } from "react-icons/fa";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3001/api/project", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (error) {
      console.error("Gagal mengambil data proyek", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">📋 Proyek Saya</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Tambah Proyek */}
      <div className="mb-6">
        <a
          href="/new-project"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium"
        >
          + Tambah Proyek
        </a>
      </div>

      {/* Grid Project */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p) => (
          <div
            key={p.id}
            className="border rounded-xl shadow-sm hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 bg-white overflow-hidden"
          >
            {/* Gambar */}
            {p.image ? (
              <img
                src={`http://localhost:3001/uploads/${p.image}`}
                alt={p.title}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                Tidak ada gambar
              </div>
            )}

            {/* Konten */}
            <div className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {p.title}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  {p.category}
                </span>
              </div>

              <p className="text-sm text-gray-600">Skill: {p.skills}</p>

              <div className="w-full bg-gray-200 rounded-full h-2.5 relative">
                <div
                  className="bg-blue-500 h-2.5 rounded-full transition-all"
                  style={{ width: `${p.progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">{p.progress}% selesai</p>

              {p.githubLink && (
                <a
                  href={p.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 text-sm hover:underline"
                >
                  <FaGithub /> Lihat di GitHub
                </a>
              )}

              <p className="text-xs text-gray-400">
                Diupdate: {new Date(p.updatedAt).toLocaleDateString("id-ID")}
              </p>

              {/* Aksi */}
              <div className="flex justify-end gap-3 mt-3 text-sm text-gray-500">
                <a
                  href={`/edit-project/${p.id}`}
                  className="flex items-center gap-1 hover:text-blue-600"
                >
                  <FaEdit /> Edit
                </a>
                <button
                  onClick={() => alert("Hapus belum diimplementasi")}
                  className="flex items-center gap-1 hover:text-red-600"
                >
                  <FaTrash /> Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
