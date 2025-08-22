import React, { useState } from "react";
import { loginUser } from "../api";

export default function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("🔄 Logging in...");
    try{
      const res = await loginUser(username, password);
      if(res?.token){
        localStorage.setItem("token", res.token);
        setMsg("✅ Login successful!");
      } else {
        setMsg("❌ Invalid credentials");
      }
    }catch(err){
      setMsg("❌ Login failed");
      console.error(err);
    }
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">🔐 Login</h4>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="form-control mb-3" type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="btn btn-primary w-100">Login</button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
