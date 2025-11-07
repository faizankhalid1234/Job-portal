import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const navigate = useNavigate();

  // ================= FETCH PROFILE =================
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      try {
        const res = await fetch("http://localhost:8000/api/v1/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok || data.success) {
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            email: data.user.email || "",
            phone: data.user.profile?.phone || "",
            location: data.user.profile?.location || "",
            skills: (data.user.profile?.skills || []).join(", "),
          });
        } else {
          alert(data.message || "Failed to fetch profile");
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      if (name === "profilePicture") setSelectedFile(files[0]);
      if (name === "resume") setResumeFile(files[0]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    const form = new FormData();
    form.append("firstName", formData.firstName);
    form.append("lastName", formData.lastName);
    form.append("email", formData.email);

    // ✅ Nested profile fields keys must match backend
    form.append("profile[phone]", formData.phone);
    form.append("profile[location]", formData.location);
    form.append(
      "profile[skills]",
      JSON.stringify(formData.skills.split(",").map((s) => s.trim()))
    );

    if (selectedFile) form.append("profilePicture", selectedFile);
    if (resumeFile) form.append("resume", resumeFile);

    try {
      const res = await fetch("http://localhost:8000/api/v1/user/update", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const data = await res.json();
      if (res.ok || data.success) {
        alert("✅ Profile updated successfully!");
        navigate("/profile");
      } else {
        alert(data.message || "❌ Update failed");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("❌ An error occurred while updating.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-4">
      <form
        onSubmit={handleUpdate}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Update Your Profile
        </h2>

        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full border rounded p-2"
        />

        <input
          type="file"
          name="profilePicture"
          onChange={handleChange}
          accept="image/*"
          className="w-full border rounded p-2"
        />
        <input
          type="file"
          name="resume"
          onChange={handleChange}
          accept=".pdf,.doc,.docx"
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
