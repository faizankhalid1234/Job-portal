import React, { useState, useEffect } from "react";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    skillsRequired: "",
    salary: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);

  const token = localStorage.getItem("token");

  // ================= FETCH JOBS =================
  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/jobs/myjobs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setJobs(data.jobs || []);
      else alert(data.message || "Failed to fetch jobs");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ================= ADD / UPDATE JOB =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingJobId
        ? `http://localhost:8000/api/jobs/${editingJobId}`
        : "http://localhost:8000/api/jobs";
      const method = editingJobId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          skillsRequired: formData.skillsRequired
            .split(",")
            .map((s) => s.trim()),
        }),
      });

      const data = await res.json();
      if (res.ok || data.success) {
        alert(editingJobId ? "Job updated!" : "Job created!");
        setFormData({ title: "", description: "", location: "", skillsRequired: "", salary: "" });
        setEditingJobId(null);
        fetchJobs();
      } else {
        alert(data.message || "Error");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  // ================= EDIT JOB =================
  const handleEdit = (job) => {
    setEditingJobId(job._id);
    setFormData({
      title: job.title || "",
      description: job.description || "",
      location: job.location || "",
      skillsRequired: (job.skillsRequired || []).join(", "),
      salary: job.salary || "",
    });
  };

  // ================= DELETE JOB =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      const res = await fetch(`http://localhost:8000/api/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok || data.success) {
        alert("Job deleted!");
        fetchJobs();
      } else {
        alert(data.message || "Error deleting job");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {editingJobId ? "Edit Job" : "Add Job"}
      </h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-4 mb-6 max-w-lg mx-auto space-y-2"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border rounded p-2"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          className="w-full border rounded p-2"
          required
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
          name="skillsRequired"
          value={formData.skillsRequired}
          onChange={handleChange}
          placeholder="Skills (comma separated)"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Salary"
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editingJobId ? "Update Job" : "Add Job"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-2 text-center">Your Jobs</h2>
      <div className="space-y-2 max-w-lg mx-auto">
        {jobs.map((job) => (
          <div
            key={job._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p className="text-sm text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-600">
                Skills: {job.skillsRequired.join(", ")}
              </p>
              <p className="text-sm text-gray-600">Salary: {job.salary}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(job)}
                className="bg-yellow-400 px-3 py-1 rounded hover:bg-yellow-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(job._id)}
                className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;
