import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(""); // Untuk preview foto baru ATAU lama
    const [originalPreview, setOriginalPreview] = useState(""); // Untuk fallback ke foto lama
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const { name, email, phone, profilePicture } = response.data;
            setForm({ name, email, phone });

            if (profilePicture) {
                const cleanedPath = profilePicture.startsWith("./") ? profilePicture.slice(1) : profilePicture;
                const fullUrl = `http://localhost:3001${cleanedPath}`;
                setOriginalPreview(fullUrl);
                setPreview(fullUrl); // tampilkan foto lama di awal
            }
        } catch (err) {
            console.error("Gagal memuat profil", err);
            console.log("Profile Picture:", profilePicture);

        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const newPreview = URL.createObjectURL(file);
            setPreview(newPreview); // tampilkan preview gambar baru
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append('name', form.name);
        formData.append('email', form.email);
        formData.append('phone', form.phone);
        if (imageFile) formData.append('profilePicture', imageFile);

        try {
            await axios.put("http://localhost:3001/api/user/profile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert("Profil berhasil diperbarui");
            navigate("/dashboard");
        } catch (err) {
            setError("Gagal memperbarui profil");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-md p-6 rounded-lg w-full max-w-xl">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">👤 Profil Saya</h2>

                {error && (
                    <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                    <div className="text-center">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Foto Profil"
                                className="w-32 h-32 object-cover rounded-full mx-auto border"
                            />
                        ) : (
                            <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto" />
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full border px-4 py-2 rounded bg-white"
                    />

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Nama"
                        required
                        className="w-full border px-4 py-2 rounded"
                    />

                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                        className="w-full border px-4 py-2 rounded"
                    />

                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Nomor HP"
                        className="w-full border px-4 py-2 rounded"
                    />

                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
                        >
                            Batal
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
                        >
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;
