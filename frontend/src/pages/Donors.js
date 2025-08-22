import React, { useState } from "react";
import { fetchDonors } from "../api";

export default function Donors(){
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    const bloodGroup = e.target.bloodGroup.value;
    setMsg('🔄 Searching...');
    setList([]);

    try {
      const data = await fetchDonors(city, bloodGroup);
      if (!Array.isArray(data) || data.length === 0){
        setMsg('⚠ No donors found.');
        return;
      }
      setMsg('');
      setList(data);
    } catch (err){
      console.error(err);
      setMsg('❌ Unable to fetch donors.');
    }
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">🩸 Search Blood Donors</h4>
      <form onSubmit={onSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Blood Group</label>
          <select name="bloodGroup" className="form-select" required>
            <option value="">Select</option>
            <option value="A+">A+</option><option value="A-">A-</option>
            <option value="B+">B+</option><option value="B-">B-</option>
            <option value="AB+">AB+</option><option value="AB-">AB-</option>
            <option value="O+">O+</option><option value="O-">O-</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">City</label>
          <input name="city" className="form-control" placeholder="Enter city" required />
        </div>
        <div className="col-12">
          <button className="btn btn-danger w-100" type="submit">🔍 Find Donors</button>
        </div>
      </form>

      <div className="mt-4">{msg && <div className="alert alert-info">{msg}</div>}</div>

      {list.length > 0 && (
        <ul className="list-group mt-3">
          {list.map(d => (
            <li key={d._id || d.name} className="list-group-item">
              <strong>{d.name}</strong> - {d.bloodGroup}<br/>
              📍 {d.city || d.location} {d.contact ? ` | ☎ ${d.contact}` : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
