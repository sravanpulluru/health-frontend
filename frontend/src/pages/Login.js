import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("🔄 Logging in...");

    try {
      const res = await axios.post("https://health-backend-04x7.onrender.com/api/auth/login", {
        email,
        password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("✅ Login successful!");
        onLogin && onLogin(res.data.user);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Login failed. Please check your email & password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4 shadow" style={{ backgroundColor: "#222", color: "white", width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">🔐 Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control bg-dark text-white"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control bg-dark text-white"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-outline-light w-100" type="submit">
            Login
          </button>
        </form>
        {message && <div className="alert alert-info mt-3">{message}</div>}
        <div className="mt-3 small text-center">
          <strong>Default Admin:</strong><br />
          Email: <code>admin@health.com</code><br />
          Password: <code>admin123</code>
        </div>
      </div>
    </div>
  );
}
