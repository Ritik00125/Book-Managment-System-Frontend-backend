import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Contactus.css"; // for animations and custom styles
import axios from "axios";

const Contactus = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Ideally, send to backend here
    const res = await axios.post("http://localhost:4000/contact" , formData);
    console.log(res);


    //alert("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container my-5 contact-us-page" style={{ maxWidth: "700px" }}>
      <h2 className="text-center mb-4">Contact Us - Book Management System</h2>
      <p className="text-center text-muted">
        Have questions or need help managing books? Get in touch with us!
      </p>
      <form onSubmit={handleSubmit} className="p-4 shadow-lg bg-white rounded animation-fade-in">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="example@domain.com"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="4"
            required
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100 animate-button">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contactus;
