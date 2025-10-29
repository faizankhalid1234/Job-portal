import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [isResume, setIsResume] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [openSections, setOpenSections] = useState({
    contact: true, // Default open
    skills: true,  // Default open
    resume: true,  // Default open
  });

  // Toggle section visibility
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/user/profile');
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const {
    name = 'John Doe',
    bio = 'Hi, I\'m John, a software developer passionate about React and building cool apps. I love coding, hiking, and coffee!',
    email = 'john.doe@example.com',
    phone = '+1 (123) 456-7890',
    location = 'New York, USA',
    skills = ['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
    profileImage = 'https://via.placeholder.com/150',
    resumeUrl = '/path/to/resume.pdf'
  } = profileData || {};

  return (
    <div
      style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <h1>Profile</h1>

      {/* Profile Picture */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src={profileImage}
          alt="Profile"
          style={{ borderRadius: '50%', width: '150px', height: '150px' }}
        />
      </div>

      {/* Name */}
      <h2 style={{ textAlign: 'center' }}>{name}</h2>

      {/* Bio */}
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>{bio}</p>

      {/* Resume Section */}
      <div style={{ marginBottom: '20px' }}>
        <h3 onClick={() => toggleSection('resume')} style={{ cursor: 'pointer' }}>
          Resume {openSections.resume ? '▼' : '▶'}
        </h3>
        {openSections.resume && (
          <div style={{ textAlign: 'center' }}>
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <img
                src="https://via.placeholder.com/100x100?text=PDF"
                alt="Download Resume"
                style={{ width: '100px', height: '100px', cursor: 'pointer' }}
              />
            </a>
            <p>Click the image to download/view resume</p>
          </div>
        )}
      </div>

      {/* Contact Info */}
      <div style={{ marginBottom: '20px' }}>
        <h3 onClick={() => toggleSection('contact')} style={{ cursor: 'pointer' }}>
          Contact {openSections.contact ? '▼' : '▶'}
        </h3>
        {openSections.contact && (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Phone:</strong> {phone}</li>
            <li><strong>Location:</strong> {location}</li>
          </ul>
        )}
      </div>

      {/* Skills */}
      <div style={{ marginBottom: '20px' }}>
        <h3 onClick={() => toggleSection('skills')} style={{ cursor: 'pointer' }}>
          Skills {openSections.skills ? '▼' : '▶'}
        </h3>
        {openSections.skills && (
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
