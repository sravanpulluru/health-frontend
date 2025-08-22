import React, { useState } from "react";
import axios from "axios";

export default function Feedback() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://health-backend-04x7.onrender.com/api/feedback", { name, feedback });
      setMessage("✅ Feedback submitted successfully!");
      setName("");
      setFeedback("");
    } catch (err) {
      setMessage("❌ Failed to submit feedback.");
    }
  };

  return (
    <div className="container text-white">
      <h2 className="mb-3">💬 Feedback</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          className="form-control mb-2"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <textarea
          className="form-control mb-2"
          placeholder="Enter feedback"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          required
        />
        <button className="btn btn-primary">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
