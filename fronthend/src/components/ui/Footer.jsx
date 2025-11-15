import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <img
              src="https://media.wired.com/photos/5926ffe47034dc5f91bed4e8/master/pass/google-logo.jpg"
              alt="Logo"
              className="w-10 h-10 rounded-md"
            />
            <h2 className="text-xl font-bold text-white">JobPortal</h2>
          </div>
          <p className="text-sm">
            Find your dream job or the right candidate with <span className="text-green-400 font-medium">JobPortal</span>.
            We connect talent with opportunities.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/about" className="hover:text-green-400">About Us</a></li>
            <li><a href="/jobs" className="hover:text-green-400">Find Jobs</a></li>
            <li><a href="/contact" className="hover:text-green-400">Contact</a></li>
            <li><a href="/privacy" className="hover:text-green-400">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact Me</h3>
          <p className="text-sm">Name: <span className="text-green-400">Faizan Khalid</span></p>
          <p className="text-sm">Email: <a href="mailto:faizankhalid@gmail.com" className="text-green-400 hover:underline">faizankhalid@gmail.com</a></p>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6 hover:scale-110 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6 hover:scale-110 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-6 h-6 hover:scale-110 transition" />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733553.png" alt="GitHub" className="w-6 h-6 hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-green-400">Faizan Khalid</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
