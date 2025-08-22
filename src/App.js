import React from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import Resources from "./pages/Resources";
import Donors from "./pages/Donors";
import Feedback from "./pages/Feedback";
import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbar = location.pathname === "/"; // hide navbar on login page

  // ✅ Simple logout → just redirect to login
  const handleLogout = () => {
    navigate("/"); 
  };

  return (
    <>
      {!hideNavbar && <Navbar onLogout={handleLogout} />}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/donors" element={<Donors />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </>
  );
}