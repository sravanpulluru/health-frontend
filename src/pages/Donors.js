import React, { useState } from "react";
import axios from "axios";

export default function Donors() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("https://health-backend-04x7.onrender.com/api/donors", {
        params: { bloodGroup, location },
      });
      setDonors(res.data);
      setError("");
    } catch (err) {
      setError("❌ Unable to fetch donors.");
    }
  };

  return (
    <div className="container text-white">
      <h2 className="mb-3">🩸 Find Donors</h2>
      <form onSubmit={handleSearch} className="row g-2 mb-3">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="col-md-5">
          <select className="form-select" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)}>
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="AB+">AB+</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="O-">O-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">Search</button>
        </div>
      </form>

      {error && <p className="text-danger">{error}</p>}

      <ul className="list-group">
        {donors.map((d) => (
          <li key={d._id} className="list-group-item bg-dark text-white">
            <strong>{d.name}</strong> ({d.bloodGroup}) – {d.location}<br />
            📞 {d.contact}
          </li>
        ))}
      </ul>
    </div>
  );
}
