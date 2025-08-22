import React, { useState } from "react";
import axios from "axios";
import L from "leaflet";
import { useEffect, useRef } from "react";

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState("");
  const mapRef = useRef(null);
  const markersRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://health-backend-04x7.onrender.com/api/resources", {
        params: { location, type }
      });
      setResources(res.data);
      setError("");
    } catch (err) {
      setError("❌ Unable to fetch resources.");
    }
  };

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([17.385, 78.4867], 10); // Hyderabad by default
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapRef.current);
      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }

    markersRef.current.clearLayers();
    resources.forEach((r) => {
      if (r.lat && r.lng) {
        L.marker([r.lat, r.lng], { icon: L.icon({
          iconUrl: "https://cdn-icons-png.flaticon.com/512/1673/1673221.png",
          iconSize: [30, 30],
        }) }).addTo(markersRef.current).bindPopup(`<b>${r.name}</b><br/>${r.type}<br/>📞 ${r.contact}`);
      }
    });
  }, [resources]);

  return (
    <div className="container text-white">
      <h2 className="mb-3">🏥 Search Resources</h2>
      <form onSubmit={handleSubmit} className="row g-2 mb-3">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">Select Type</option>
            <option value="Hospital">Hospital</option>
            <option value="Clinic">Clinic</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Ambulance">Ambulance</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">Search</button>
        </div>
      </form>

      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group mb-3">
        {resources.map((r) => (
          <li key={r._id} className="list-group-item bg-dark text-white">
            <strong>{r.name}</strong> ({r.type}) – {r.location}<br />
            📞 {r.contact}
          </li>
        ))}
      </ul>

      <div id="map" style={{ height: "400px" }} className="rounded"></div>
    </div>
  );
}
