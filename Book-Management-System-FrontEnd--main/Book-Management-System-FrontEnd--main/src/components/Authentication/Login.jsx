import React, { useState } from "react";
import "./login.css"; // Reuse `signup.css` if same styles are used
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>{

    ///object destructuring 
    const { name , value} = e.target;
    setForm({ ...form, [name]: value });
  }
 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post("http://localhost:4000/login", form);

    console.log("Login Success:", response.data);

  if(response.data.success){
      Swal.fire({
      icon: "success",
      title: "Login Successful 🎉",
      text: "You have been logged in!",
      confirmButtonColor: "#3085d6",
    });
  }
  else if(response.data.error){
 Swal.fire({
      icon: "error",
      title: "Login Failed ❌",
      text:
        response.data.message ||
        "Invalid email or password. Please try again.",
      confirmButtonColor: "#d33",
    });
  }

    // Optionally: store token or redirect
    // localStorage.setItem("token", response.data.token);
    // navigate("/dashboard");

  } catch (error) {
    console.error("Login Error:", error);

    Swal.fire({
      icon: "error",
      title: "Login Failed ❌",
      text:
        error.response?.data?.message ||
        "Invalid email or password. Please try again.",
      confirmButtonColor: "#d33",
    });
  }
};


  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center vh-100">
      <div className="login-form animated-card p-4 rounded-4 shadow-lg bg-glass text-white">
        <h2 className="text-center mb-4 fw-bold">Login</h2>
        <form onSubmit={handleSubmit}>
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
              Login
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-warning text-decoration-underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
