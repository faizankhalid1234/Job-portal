import React, { useState } from "react";

const Home = () => {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "TechCorp",
      location: "New York, NY",
      description: "Develop and maintain software applications using modern technologies. Collaborate with cross-functional teams to deliver high-quality products."
    },
    {
      id: 2,
      title: "Data Analyst",
      company: "DataInsights Inc.",
      location: "San Francisco, CA",
      description: "Analyze large datasets to provide insights and support business decisions. Proficiency in SQL, Python, and data visualization tools required."
    },
    {
      id: 3,
      title: "UX Designer",
      company: "CreativeStudio",
      location: "Austin, TX",
      description: "Design intuitive user interfaces and experiences. Work closely with product teams to create user-centered designs."
    },
    {
      id: 4,
      title: "Marketing Specialist",
      company: "BrandBoost",
      location: "Chicago, IL",
      description: "Develop and execute marketing campaigns across digital channels. Strong analytical skills and creativity are essential."
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Innovate Solutions",
      location: "Seattle, WA",
      description: "Lead project teams to deliver projects on time and within budget. Excellent communication and organizational skills required."
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "CloudTech",
      location: "Boston, MA",
      description: "Manage infrastructure and deployment pipelines. Experience with AWS, Docker, and CI/CD tools is a plus."
    },
    {
      id: 7,
      title: "Content Writer",
      company: "MediaHub",
      location: "Los Angeles, CA",
      description: "Create engaging content for blogs, websites, and social media. Strong writing skills and SEO knowledge preferred."
    }
  ];

  const [currentJobIndex, setCurrentJobIndex] = useState(0);
  const nextJob = () => setCurrentJobIndex((prev) => (prev + 1) % jobs.length);
  const prevJob = () => setCurrentJobIndex((prev) => (prev - 1 + jobs.length) % jobs.length);
  const currentJob = jobs[currentJobIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header Section */}
        <div className="text-center mb-8">
         

          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Find Your Dream Job
          </h1>
          <p className="text-xl text-gray-600">
            Discover thousands of job opportunities from top companies
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Job title, keywords, or company"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Location"
              className="w-48 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
              Search Jobs
            </button>
          </div>

          {/* Jobs Navigation */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevJob}
                className="p-1 bg-green-100 rounded-full hover:bg-green-200 transition transform hover:scale-105"
              >
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="text-center flex-1 mx-4">
                <h3 className="text-lg font-semibold text-gray-900">{currentJob.title}</h3>
                <p className="text-sm text-gray-600">{currentJob.company} - {currentJob.location}</p>
              </div>
              
              <button
                onClick={nextJob}
                className="p-1 bg-green-100 rounded-full hover:bg-green-200 transition transform hover:scale-105"
              >
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="text-gray-700 text-sm">
              <p>{currentJob.description}</p>
            </div>

            <div className="mt-4 text-center text-xs text-gray-500">
              Job {currentJobIndex + 1} of {jobs.length}
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Technology</h3>
            <p className="text-gray-600">Software, IT, and tech roles</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Marketing</h3>
            <p className="text-gray-600">Digital marketing and communications</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Finance</h3>
            <p className="text-gray-600">Banking, accounting, and finance</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md col-span-1 md:col-span-3">
            <h3 className="text-xl font-semibold mb-2">Software House Jobs</h3>
            <p className="text-gray-600">Software, web development, mobile development, AI development</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
