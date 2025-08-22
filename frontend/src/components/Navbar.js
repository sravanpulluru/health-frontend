import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar(){
  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Health Finder</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/resources">Resources</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/donors">Donors</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/feedback">Feedback</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
