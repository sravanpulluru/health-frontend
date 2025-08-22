import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Resources from "./pages/Resources";
import Donors from "./pages/Donors";
import Feedback from "./pages/Feedback";
import Navbar from "./components/Navbar";
import "leaflet/dist/leaflet.css";

export default function App() {
  const location = useLocation();

  return (
    <>
      {/* ✅ Show Navbar only if NOT on login page */}
      {location.pathname !== "/" && <Navbar />}

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
