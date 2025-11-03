import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/shared/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse";
import Profile from "./pages/Profile";
import { AuthProvider } from "./contexts/AuthContext"; // ✅ Import AuthProvider
import UpdateProfile from "./pages/UpdateProfile";

// ✅ Layout component with Navbar
const Layout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

// ✅ Main App Component
function App() {
  return (
    <AuthProvider> {/* ✅ Wrap everything with AuthProvider */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/profile" element={<Profile />} /> {/* ✅ Fixed */}
         <Route path="/update-profile" element={<UpdateProfile />} />
<Route path="/update-profile" element={<UpdateProfile />} />

        </Routes>
      </Layout>
    </AuthProvider>
  );
}

export default App;
