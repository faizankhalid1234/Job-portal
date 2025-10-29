import React, { useState, useEffect } from 'react';

// Placeholder components (you can replace with your actual components)
const Navbar = () => <div className="bg-green-600 text-white p-4">Navbar</div>;
const FilterCard = () => <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">Filter Options</div>;

const Jobs = () => {
  // Function to generate random jobs
  const generateRandomJobs = (startId) => {
    const jobTitles = [
      "Software Engineer", "Data Analyst", "UX Designer", "Marketing Specialist", 
      "Project Manager", "DevOps Engineer", "Content Writer", "Full Stack Developer",
      "Mobile App Developer", "AI Engineer", "Graphic Designer", "Sales Manager",
      "HR Specialist", "Product Manager", "Cybersecurity Analyst"
    ];
    const companies = [
      "TechCorp", "DataInsights Inc.", "CreativeStudio", "BrandBoost", 
      "Innovate Solutions", "CloudTech", "MediaHub", "StartupXYZ", 
      "GlobalTech", "DesignPro", "CodeMasters", "BizSolutions"
    ];
    const locations = [
      "Karachi, Sindh",
      "Lahore, Punjab",
      "Islamabad, Capital Territory",
      "Rawalpindi, Punjab",
      "Faisalabad, Punjab",
      "Multan, Punjab",
      "Peshawar, Khyber Pakhtunkhwa",
      "Quetta, Balochistan",
      "Hyderabad, Sindh",
      "Sialkot, Punjab",
      "Gujranwala, Punjab",
      "Bahawalpur, Punjab"
    ];

    const descriptions = [
      "Develop and maintain software applications using modern technologies.",
      "Analyze large datasets to provide insights and support business decisions.",
      "Design intuitive user interfaces and experiences for users.",
      "Develop and execute marketing campaigns across digital channels.",
      "Lead project teams to deliver projects on time and within budget.",
      "Manage infrastructure and deployment pipelines for applications.",
      "Create engaging content for blogs, websites, and social media.",
      "Build end-to-end web applications with front-end and back-end skills.",
      "Develop mobile applications for iOS and Android platforms.",
      "Work on artificial intelligence and machine learning projects.",
      "Create visual designs for websites, apps, and marketing materials.",
      "Manage sales teams and drive revenue growth for the company.",
      "Handle human resources functions including recruitment and employee relations.",
      "Oversee product development from ideation to launch.",
      "Protect systems and networks from cyber threats and vulnerabilities."
    ];

    const jobs = [];
    for (let i = 0; i < 7; i++) {
      jobs.push({
        id: startId + i,
        title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        company: companies[Math.floor(Math.random() * companies.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        salary: `$${(Math.floor(Math.random() * 50) + 50) * 1000} - $${(Math.floor(Math.random() * 50) + 100) * 1000}`,
        posted: `${Math.floor(Math.random() * 30) + 1} days ago`
      });
    }
    return jobs;
  };

  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // Track applied jobs
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [nextId, setNextId] = useState(1); // Track the next ID for unique job IDs

  useEffect(() => {
    const initialJobs = generateRandomJobs(nextId);
    setJobs(initialJobs);
    setNextId(prev => prev + 7);
  }, []);

  const handleApplyNow = (job) => {
    setSelectedJob(job);
    setShowModal(true);
  };

  const handleSubmitApplication = () => {
    // Simulate application submission
    setAppliedJobs(prev => new Set(prev).add(selectedJob.id));
    setShowModal(false);
    alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
  };

  const handleLoadMore = () => {
    const newJobs = generateRandomJobs(nextId);
    setJobs(prev => [...prev, ...newJobs]);
    setNextId(prev => prev + 7);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <FilterCard />
        
        {/* Jobs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{job.title}</h3>
                    <p className="text-green-600 font-medium">{job.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{job.posted}</span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {job.location}
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">{job.salary}</span>
                  <button 
                    onClick={() => handleApplyNow(job)}
                    disabled={appliedJobs.has(job.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      appliedJobs.has(job.id) 
                        ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="text-center mt-8">
          <button 
            onClick={handleLoadMore}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            Load More Jobs
          </button>
        </div>
      </div>

      {/* Application Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4">Apply for {selectedJob.title}</h2>
            <p className="text-gray-600 mb-4">at {selectedJob.company}</p>
            
            <form onSubmit={(e) => { e.preventDefault(); handleSubmitApplication(); }}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  required 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume</label>
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" 
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  Submit Application
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
