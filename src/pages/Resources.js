// src/pages/Resources.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Custom Red Icon
const redIcon = new L.Icon({
  iconUrl:
    "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=location|FF0000",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
  popupAnchor: [0, -50],
});

export default function Resources() {
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");

  const mapRef = useRef(null);
  const markersRef = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        "https://health-backend-04x7.onrender.com/api/resources",
        { params: { location, type } }
      );
      if (res.data.length === 0) {
        setMsg("⚠ No resources found for the given search.");
        setList([]);
        clearMarkers();
      } else {
        setList(res.data);
        setMsg("");
        plotMarkers(res.data);
      }
    } catch (err) {
      console.error("❌ Error fetching resources:", err);
      setMsg("Unable to fetch resources. Please try again.");
      setList([]);
      clearMarkers();
    }
  };

  // initialize map once
  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([17.385, 78.4867], 12); // Hyderabad default

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(mapRef.current);

      markersRef.current = L.layerGroup().addTo(mapRef.current);
    }
  }, []);

  const clearMarkers = () => {
    if (markersRef.current) {
      markersRef.current.clearLayers();
    }
  };

  const plotMarkers = (resources) => {
    clearMarkers();
    resources.forEach((res) => {
      if (res.lat && res.lng) {
        L.marker([res.lat, res.lng], { icon: redIcon }) // ✅ red marker here
          .addTo(markersRef.current)
          .bindPopup(`<b>${res.name}</b><br/>${res.type}<br/>📞 ${res.contact}`);
      }
    });
    if (resources.length > 0 && resources[0].lat && resources[0].lng) {
      mapRef.current.setView([resources[0].lat, resources[0].lng], 13);
    }
  };

  return (
    <div className="card p-4 text-white bg-dark">
      <h4 className="mb-3">🏥 Search Health Resources</h4>

      {/* Form */}
      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            placeholder="Enter city or area"
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Resource Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-select"
            required
          >
            <option value="">Select Type</option>
            <option value="Hospital">Hospital</option>
            <option value="Clinic">Clinic</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Ambulance">Ambulance</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-outline-light w-100" type="submit">
            🔍 Find Resources
          </button>
        </div>
      </form>

      {/* Message */}
      {msg && <div className="alert alert-info mt-3">{msg}</div>}

      {/* Results List */}
      {list.length > 0 && (
        <ul className="list-group mt-3">
          {list.map((item) => (
            <li
              key={item._id || item.name}
              className="list-group-item bg-dark text-white"
            >
              <strong>{item.name}</strong> ({item.type}) <br />
              {item.location} {item.contact ? ` | ☎ ${item.contact}` : ""}
            </li>
          ))}
        </ul>
      )}

      {/* Map */}
      <div
        id="map"
        style={{ height: "400px" }}
        className="mt-4 rounded"
      ></div>
    </div>
  );
}