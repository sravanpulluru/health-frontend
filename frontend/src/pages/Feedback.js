import React, { useState } from "react";
import { submitFeedback } from "../api";

export default function Feedback(){
  const [msg, setMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const message = e.target.message.value.trim();
    setMsg("🔄 Sending...");
    try{
      await submitFeedback(name, email, message);
      setMsg("✅ Feedback submitted!");
      e.target.reset();
    }catch(err){
      console.error(err);
      setMsg("❌ Failed to submit feedback.");
    }
  };

  return (
    <div className="card p-4">
      <h4 className="mb-3">💬 Feedback</h4>
      <form onSubmit={onSubmit}>
        <input name="name" className="form-control mb-2" placeholder="Your Name" required />
        <input name="email" type="email" className="form-control mb-2" placeholder="Your Email" required />
        <textarea name="message" className="form-control mb-3" placeholder="Your Feedback" rows="4" required></textarea>
        <button className="btn btn-primary w-100">Submit</button>
      </form>
      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
}
