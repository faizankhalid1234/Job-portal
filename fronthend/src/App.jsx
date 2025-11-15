import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/shared/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import { AuthProvider } from "./contexts/AuthContext";
import Footer from "./components/ui/Footer"; // ✅ Footer import

// ✅ Layout component with Navbar and Footer
const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <div className="flex-grow">{children}</div> {/* Page content */}
    <Footer /> {/* Footer hamesha niche */}
  </div>
);

// ✅ Main App Component
function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/update-profile" element={<UpdateProfile />} />
        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
