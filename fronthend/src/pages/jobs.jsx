import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";


// ----------------- User Context -----------------
const UserContext = React.createContext({
  name: "",
  email: "",
  profileImage: null,
  role: "user", // default to "user"
});

// ----------------- Navbar -----------------
const Navbar = ({ role, setRole }) => {
  return (
    <div className="bg-green-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">Job Portal</h1>

      <div className="flex items-center space-x-3">
        <label className="font-medium">Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="text-black px-2 py-1 rounded-md"
        >
          <option value="user">User</option>
          <option value="recruiter">Recruiter</option>
        </select>
      </div>
    </div>
  );
};

// ----------------- Filter Card -----------------
const FilterCard = ({ filters, setFilters }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
      <h3 className="text-lg font-semibold mb-2">Filter Options</h3>

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
  const [role, setRole] = useState("user"); // dropdown control
  const jobListRef = useRef(null);

  const [filters, setFilters] = useState({ title: "", location: "" });
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [applicantsData, setApplicantsData] = useState([]); // recruiter view

  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAppliedList, setShowAppliedList] = useState(false);
  const [showApplicantsList, setShowApplicantsList] = useState(false);

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [jobToApply, setJobToApply] = useState(null);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

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
    if (role !== "user") {
      alert("Only users can apply for jobs.");
      return;
    }
    setJobToApply(job);
    setShowApplyModal(true);
  };

  const confirmApply = () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms.");
      return;
    }
    setAppliedJobs((prev) => new Set(prev).add(jobToApply._id));

    // ✅ Recruiter can later see who applied (mock data for demo)
    setApplicantsData((prev) => [
      ...prev,
      { userName: "Demo User", jobTitle: jobToApply.title },
    ]);

    alert(`Application submitted for ${jobToApply.title}!`);
    setShowApplyModal(false);
    setAgreeToTerms(false);
    setJobToApply(null);
  };

  // ----------------- Recruiter: Add/Edit/Delete -----------------
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
        const res = await axios.put(
          `http://localhost:8000/api/v1/job/${selectedJob._id}`,
          jobForm
        );
        setJobs((prev) =>
          prev.map((j) => (j._id === selectedJob._id ? res.data.job : j))
        );
        alert("Job updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:8000/api/v1/job/create",
          jobForm
        );
        setJobs((prev) => [...prev, res.data.job]);
        alert("New job added!");
      }
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert("Failed to save job");
    }
  };

  // ----------------- Filters -----------------
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
      <Navbar role={role} setRole={setRole} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <FilterCard filters={filters} setFilters={setFilters} />
          <div className="flex space-x-2">
            {role === "user" && (
              <button
                onClick={() => setShowAppliedList(!showAppliedList)}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                👁️ View Applied Jobs
              </button>
            )}

            {role === "recruiter" && (
              <>
                <button
                  onClick={openAddModal}
                  className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
                >
                  ➕ Add Job
                </button>
                <button
                  onClick={() => setShowApplicantsList(!showApplicantsList)}
                  className="bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-purple-700"
                >
                  🧾 View Applicants
                </button>
              </>
            )}
          </div>
        </div>

        {/* Applicants for Recruiter */}
        {showApplicantsList && role === "recruiter" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Applicants</h3>
            {applicantsData.length > 0 ? (
              <ul className="list-disc pl-5">
                {applicantsData.map((a, i) => (
                  <li key={i}>
                    <strong>{a.userName}</strong> applied for{" "}
                    <span className="text-green-600">{a.jobTitle}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No applications yet.</p>
            )}
          </div>
        )}

        {/* User Applied Jobs */}
        {showAppliedList && role === "user" && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <h3 className="text-lg font-semibold mb-4">Jobs You Applied For</h3>
            {Array.from(appliedJobs).length > 0 ? (
              <ul className="list-disc pl-5">
                {jobs
                  .filter((job) => appliedJobs.has(job._id))
                  .map((job) => (
                    <li key={job._id}>
                      {job.title} at {job.company?.name || job.company} (
                      {job.location})
                    </li>
                  ))}
              </ul>
            ) : (
              <p>No jobs applied yet.</p>
            )}
          </div>
        )}

        {/* Jobs List */}
        <div
          ref={jobListRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const isApplied = appliedJobs.has(job._id);
              return (
                <div
                  key={job._id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                >
                  <h3 className="text-xl font-semibold mb-1">
                    {job.title || "Untitled Job"}
                  </h3>
                  <p className="text-green-600 font-medium mb-1">
                    {job.company?.name || job.company || "Unknown Company"}
                  </p>
                  <p className="text-gray-600 mb-2">
                    📍 {job.location || "Unknown"}
                  </p>
                  <p className="text-gray-700 mb-3 line-clamp-3">
                    {job.description || "No description."}
                  </p>

                  {role === "user" && (
                    <button
                      onClick={() => handleApplyNow(job)}
                      disabled={isApplied}
                      className={`px-4 py-2 rounded-lg w-full ${
                        isApplied
                          ? "bg-gray-400 text-gray-200"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {isApplied ? "Applied" : "Apply"}
                    </button>
                  )}

                  {role === "recruiter" && (
                    <div className="flex justify-between mt-3">
                      <button
                        onClick={() => openEditModal(job)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No jobs found.
            </p>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && jobToApply && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              Apply for {jobToApply.title}
            </h2>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="mr-2"
              />
              I agree to the terms and conditions.
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowApplyModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={confirmApply}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Confirm Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
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
