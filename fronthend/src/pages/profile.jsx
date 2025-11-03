import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [profileData, setProfileData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/user/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfileData(data.user);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (!profileData)
    return <p className="text-center text-lg text-blue-600 mt-20">Loading...</p>;

  const {
    firstName,
    lastName,
    email,
    phone = '03029655325',
    location = 'lahore',
    skills = ['React', 'Node.js', 'Python', 'SQL'],
    profile = {}
  } = profileData;

  const profilePicture = profile.profilePicture
    ? `http://localhost:8000${profile.profilePicture}`
    : '/default-avatar.png';


  const companies = [
    { name: 'TechCorp', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbY-b_vPyemUa8xXInkAKH__I89wqw296iEQ&s' },
    { name: 'DataInsights', logo: 'https://afrisk-analytics.com/wp-content/uploads/2019/02/data-insight-action-logo.png' },
    { name: 'CreativeStudio', logo: 'https://as1.ftcdn.net/jpg/01/22/04/18/1000_F_122041889_YrOL0L7eNvx7GbRihloV9kXBWeQTxyBM.jpg' },
    { name: 'BrandBoost', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE9_-jCpHr7DOBsaPDozsjT0aca6x0U-k_6A&s' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="bg-white shadow flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-3">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbY-b_vPyemUa8xXInkAKH__I89wqw296iEQ&s"
            alt="Company Logo"
            className="w-12 h-12 object-contain rounded-md"
          />
          <span className="text-xl font-bold text-gray-800">JobPortal</span>
        </div>

        <div className="relative">
          <img
            src={profilePicture}
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer border-2 border-green-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
              <button
                onClick={() => navigate('/profile')}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Profile Section */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              src={profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{firstName} {lastName}</h1>
            <p className="text-gray-600 mt-1">{email}</p>
            <p className="text-gray-600">{phone}</p>
            <p className="text-gray-600">{location}</p>

            <div className="mt-4">
              <h3 className="font-semibold text-gray-800">Skills:</h3>
              <div className="flex flex-wrap mt-2 gap-2">
                {skills.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{skill}</span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                Download Resume
              </button>
              <div className="mt-6">
  <button
    onClick={() => navigate('/update-profile')} // yahan route rakhna
    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
  >
    Update Profile
  </button>
</div>

            </div>
          </div>
        </div>

        {/* Featured Companies */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          {companies.map((company, idx) => (
            <div key={idx} className="bg-white p-4 rounded-xl shadow flex flex-col items-center hover:shadow-lg transition">
              <img src={company.logo} alt={company.name} className="w-24 h-12 object-contain mb-2" />
              <p className="text-gray-700 font-medium">{company.name}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
