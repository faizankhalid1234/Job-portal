import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

// ----------------- User Context -----------------
const UserContext = React.createContext({
  name: "",
  email: "",
  profileImage: null,
});

// ----------------- Navbar -----------------
const Navbar = () => {
  const user = useContext(UserContext);

  return (
    <div className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Job Portal</h1>
      <div className="text-sm">
        {user.name && user.email ? (
          <span>
            Welcome, {user.name} ({user.email})
          </span>
        ) : (
          <span>Welcome, Guest</span>
        )}
      </div>
    </div>
  );
};

// ----------------- Filter Card -----------------
const FilterCard = ({ filters, setFilters }) => {
  const user = useContext(UserContext);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter Options</h3>
      <div className="text-sm text-gray-700 mb-4">
        {user.name && user.email ? (
          <p>
            User: {user.name} ({user.email})
          </p>
        ) : (
          <p>User: Guest</p>
        )}
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Job Title
        </label>
        <input
          type="text"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          placeholder="e.g. Developer"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          placeholder="e.g. Karachi"
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </div>
  );
};

// ----------------- Jobs Page -----------------
const Jobs = () => {
  const user = useContext(UserContext);

  const [filters, setFilters] = useState({ title: "", location: "" });
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Job form for Add/Edit
  const [jobForm, setJobForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
  });

  // ----------------- Fetch Jobs -----------------
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/job/all");
        setJobs(res.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // ----------------- Apply Job -----------------
  const handleApplyNow = (job) => {
    setAppliedJobs((prev) => new Set(prev).add(job._id));
    alert(`Application submitted for ${job.title}!`);
  };

  // ----------------- Add / Edit Job -----------------
  const openAddModal = () => {
    setIsEditing(false);
    setJobForm({
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
    });
    setShowModal(true);
  };

  const openEditModal = (job) => {
    setIsEditing(true);
    setSelectedJob(job);
    setJobForm({
      title: job.title || "",
      company: job.company?.name || job.company || "",
      location: job.location || "",
      salary: job.salary || "",
      description: job.description || "",
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/v1/job/${id}`);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      alert("Job deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete job");
    }
  };

  const handleSubmitJob = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing job
        const res = await axios.put(
          `http://localhost:8000/api/v1/job/${selectedJob._id}`,
          jobForm
        );
        setJobs((prev) =>
          prev.map((j) => (j._id === selectedJob._id ? res.data.job : j))
        );
        alert("Job updated successfully!");
      } else {
        // Add new job
       const res = await axios.post("http://localhost:8000/api/v1/job/create", jobForm);
        setJobs((prev) => [...prev, res.data.job]);
        alert("New job added!");
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save job");
    }
  };

  // ----------------- Filtered Jobs -----------------
  const filteredJobs = jobs.filter(
    (job) =>
      (job.title || "").toLowerCase().includes(filters.title.toLowerCase()) &&
      (job.location || "")
        .toLowerCase()
        .includes(filters.location.toLowerCase())
  );

  if (loading)
    return <p className="text-center mt-10 text-gray-700">Loading jobs...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filter and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <FilterCard filters={filters} setFilters={setFilters} />
          <button
            onClick={openAddModal}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div
                key={job._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {job.title || "Untitled Job"}
                  </h3>
                  <p className="text-green-600 font-medium mb-1">
                    {job.company?.name || job.company || "Unknown Company"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    📍 {job.location || "Unknown Location"}
                  </p>
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    {job.description || "No description available."}
                  </p>

                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-bold text-green-600">
                      {job.salary || "Negotiable"}
                    </span>
                    <button
                      onClick={() => handleApplyNow(job)}
                      disabled={appliedJobs.has(job._id)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        appliedJobs.has(job._id)
                          ? "bg-gray-400 text-gray-200"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {appliedJobs.has(job._id) ? "Applied" : "Apply"}
                    </button>
                  </div>

                  {/* New Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => openEditModal(job)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-center col-span-full">
              No jobs found with these filters.
            </p>
          )}
        </div>
      </div>

      {/* ----------------- Add/Edit Modal ----------------- */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">
              {isEditing ? "Edit Job" : "Add New Job"}
            </h2>
            <form onSubmit={handleSubmitJob}>
              <input
                type="text"
                value={jobForm.title}
                onChange={(e) =>
                  setJobForm({ ...jobForm, title: e.target.value })
                }
                placeholder="Job Title"
                className="w-full mb-3 px-3 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                value={jobForm.company}
                onChange={(e) =>
                  setJobForm({ ...jobForm, company: e.target.value })
                }
                placeholder="Company Name"
                className="w-full mb-3 px-3 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                value={jobForm.location}
                onChange={(e) =>
                  setJobForm({ ...jobForm, location: e.target.value })
                }
                placeholder="Location"
                className="w-full mb-3 px-3 py-2 border rounded-md"
                required
              />
              <input
                type="text"
                value={jobForm.salary}
                onChange={(e) =>
                  setJobForm({ ...jobForm, salary: e.target.value })
                }
                placeholder="Salary"
                className="w-full mb-3 px-3 py-2 border rounded-md"
              />
              <textarea
                value={jobForm.description}
                onChange={(e) =>
                  setJobForm({ ...jobForm, description: e.target.value })
                }
                placeholder="Job Description"
                className="w-full mb-4 px-3 py-2 border rounded-md"
              />

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                  {isEditing ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
