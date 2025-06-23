import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:3001/api/projects", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProjects(res.data);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📋 Proyek Saya</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      <div className="mb-4">
        <a
          href="/new-project"
          className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
        >
          + Tambah Proyek
        </a>
      </div>

      <ul className="space-y-4">
        {projects.map((p) => (
          <li
            key={p.id}
            className="border p-4 rounded-md shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{p.title}</h3>
            <p className="text-sm text-gray-600">{p.skills}</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${p.progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{p.progress}% selesai</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
