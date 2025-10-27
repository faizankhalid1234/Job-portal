import React from 'react';

const Profile = () => {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Profile</h1>
      
      {/* Profile Picture */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img 
          src="https://via.placeholder.com/150"  // Replace with actual image URL
          alt="Profile Picture" 
          style={{ borderRadius: '50%', width: '150px', height: '150px' }}
        />
      </div>
      
      {/* Name */}
      <h2 style={{ textAlign: 'center' }}>John Doe</h2>  // Replace with actual name
      
      {/* Bio */}
      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Hi, I'm John, a software developer passionate about React and building cool apps. 
        I love coding, hiking, and coffee!
      </p>  // Replace with actual bio
      
      {/* Contact Info */}
      <div style={{ marginTop: '20px' }}>
        <h3>Contact</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><strong>Email:</strong> john.doe@example.com</li>  // Replace with actual email
          <li><strong>Phone:</strong> +1 (123) 456-7890</li>  // Replace with actual phone
          <li><strong>Location:</strong> New York, USA</li>  // Replace with actual location
        </ul>
      </div>
      
      {/* Optional: Skills or Interests */}
      <div style={{ marginTop: '20px' }}>
        <h3>Skills</h3>
        <ul>
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
