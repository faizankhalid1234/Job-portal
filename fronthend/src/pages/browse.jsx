import React, { useState } from 'react';

// Placeholder components (you can replace with your actual components)
const Navbar = () => <div className="bg-green-600 text-white p-4">Navbar</div>;

const Browse = () => {
  // Sample data for browsing
  const categories = [
    { id: 1, name: "Technology", icon: "💻", jobs: 245 },
    { id: 2, name: "Marketing", icon: "📈", jobs: 189 },
    { id: 3, name: "Finance", icon: "💰", jobs: 156 },
    { id: 4, name: "Healthcare", icon: "🏥", jobs: 134 },
    { id: 5, name: "Education", icon: "📚", jobs: 98 },
    { id: 6, name: "Design", icon: "🎨", jobs: 87 },
    { id: 7, name: "Sales", icon: "📞", jobs: 112 },
    { id: 8, name: "Engineering", icon: "⚙️", jobs: 203 }
  ];

  const companies = [
    { id: 1, name: "TechCorp", logo: "🏢", jobs: 45, location: "New York, NY" },
    { id: 2, name: "DataInsights Inc.", logo: "📊", jobs: 32, location: "San Francisco, CA" },
    { id: 3, name: "CreativeStudio", logo: "🎨", jobs: 28, location: "Austin, TX" },
    { id: 4, name: "BrandBoost", logo: "🚀", jobs: 41, location: "Chicago, IL" },
    { id: 5, name: "Innovate Solutions", logo: "💡", jobs: 37, location: "Seattle, WA" },
    { id: 6, name: "CloudTech", logo: "☁️", jobs: 29, location: "Boston, MA" }
  ];

  const [activeTab, setActiveTab] = useState('categories');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Jobs</h1>
          <p className="text-xl text-gray-600">Explore opportunities by category or company</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg shadow-md p-1">
            <button
              onClick={() => setActiveTab('categories')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'categories' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Categories
            </button>
            <button
              onClick={() => setActiveTab('companies')}
              className={`px-6 py-2 rounded-md transition-colors ${
                activeTab === 'companies' 
                  ? 'bg-green-500 text-white' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Companies
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'categories' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => (
                <div key={category.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 text-center">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.jobs} jobs available</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Explore
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'companies' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse by Company</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-4">{company.logo}</div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{company.name}</h3>
                      <p className="text-gray-600">{company.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">{company.jobs} open positions</p>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors w-full">
                    View Jobs
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-12 bg-green-50 rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">Can't find what you're looking for?</h3>
          <p className="text-gray-600 mb-6">Try our advanced search or create a job alert to get notified of new opportunities.</p>
          <div className="space-x-4">
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors">
              Advanced Search
            </button>
            <button className="bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors">
              Create Alert
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
