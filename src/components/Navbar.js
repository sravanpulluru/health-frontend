import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // ✅ redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/resources">Health Resource Finder</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/resources">Resources</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/donors">Donors</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/feedback">Feedback</NavLink>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger ms-3" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
