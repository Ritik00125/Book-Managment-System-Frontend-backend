import React, { useState } from "react";
import "./signup.css"; // Custom CSS for animation and theming
import axios from "axios";
import Swal from "sweetalert2";


const Signup = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    username : "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
const handleSubmit = async (e) => {
  e.preventDefault(); // Prevent page reload

  try {
    const response = await axios.post("http://localhost:4000/signup", form);
    console.log("Signup Success:", response.data);

    // Optional: show success alert or redirect
   
     Swal.fire({
      icon: "success",
      title: "Signup Successful 🎉",
      text: "Your account has been created successfully!",
      confirmButtonColor: "#3085d6",
    });
    setForm({ name: "", email: "", password: "" });
  } catch (error) {

    console.log(error);
       Swal.fire({
      icon: "error",
      title: "Signup Failed 😢",
      text:
        error.response?.data?.message || "Something went wrong during signup.",
      confirmButtonColor: "#d33",
    });
  }
    
};


  return (
    <div className="signup-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="signup-form animated-card p-4 rounded-4 shadow-lg bg-glass text-white">
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
             <label className="form-label">user name</label>
            <input
              type="text"
              className="form-control rounded-pill"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="sham@786"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control rounded-pill"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control rounded-pill"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              required
            />
          </div>

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn btn-gradient rounded-pill fw-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-warning text-decoration-underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
