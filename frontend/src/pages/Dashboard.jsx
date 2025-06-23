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
    <div style={{ padding: "2rem" }}>
      <h2>Proyek Saya</h2>
      <a href="/new-project">+ Tambah Proyek</a>
      <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
        Logout
      </button>
      <ul>
        {projects.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong> - {p.skills} ({p.progress}%)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
