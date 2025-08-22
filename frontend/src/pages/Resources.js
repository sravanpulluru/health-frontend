import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { fetchResources } from "../api";

export default function Resources(){
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const mapRef = useRef(null);
  const markersLayerRef = useRef(null);

  useEffect(() => {
  fetch("https://health-backend-04x7.onrender.com/api/resources")
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch resources");
      }
      return res.json();
    })
    .then((data) => setResources(data))
    .catch((err) => {
      console.error("❌ Error fetching resources:", err);
      setError("Unable to fetch resources.");
    });
}, []);

  return (
    <div className="card p-4">
      <h4 className="mb-3">🏥 Search Health Resources</h4>
      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input name="location" className="form-control" placeholder="Enter city or area" required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Resource Type</label>
          <select name="type" className="form-select" required>
            <option value="">Select Type</option>
            <option value="Hospital">Hospital</option>
            <option value="Clinic">Clinic</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Ambulance">Ambulance</option>
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-outline-light w-100" type="submit">🔍 Find Resources</button>
        </div>
      </form>

      <div className="mt-4">{msg && <div className="alert alert-info">{msg}</div>}</div>

      {list.length > 0 && (
  <ul className="list-group mt-3">
    {list.map(item => (
      <li key={item._id || item.name} className="list-group-item">
        <strong>{item.name}</strong> ({item.type})<br/>
        {item.location} {item.contact ? ` | ☎ ${item.contact}` : ""}
      </li>
    ))}
  </ul>
)}


      <div id="map" style={{ height:'400px' }} className="mt-4 rounded"></div>
    </div>
  );
}
