import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/ui/shared/navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Jobs from "./pages/Jobs";
import Browse from "./pages/Browse"; // ✅ Capital "B"

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
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/browse" element={<Browse />} /> {/* ✅ Fixed */}
      </Routes>
    </Layout>
  );
}

export default App;
