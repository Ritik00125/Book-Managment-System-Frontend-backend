import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 footer-gradient">
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* Company Info */}
          <div className="col-md-4 col-lg-4 col-xl-4 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">BookStack</h5>
            <p>
              BookStack is a smart book management system for organizing, tracking, and maintaining book records digitally across institutions and individuals.
            </p>
          </div>

          {/* Services */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Services</h5>
            <p><Link to="/" className="text-white text-decoration-none">Inventory</Link></p>
            <p><Link to="/" className="text-white text-decoration-none">Issue & Return</Link></p>
            <p><Link to="/" className="text-white text-decoration-none">Analytics</Link></p>
            <p><Link to="/" className="text-white text-decoration-none">Multi-User Access</Link></p>
          </div>

          {/* Useful Links */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Quick Links</h5>
            <p><Link to="/" className="text-white text-decoration-none">Home</Link></p>
            <p><Link to="/add-book" className="text-white text-decoration-none">Add Book</Link></p>
            <p><Link to="/contact-us" className="text-white text-decoration-none">Contact</Link></p>
            <p><Link to="/services" className="text-white text-decoration-none">Services</Link></p>
          </div>

          {/* Contact Info */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold text-warning">Contact</h5>
            <p><i className="bi bi-house-fill me-2"></i>New Delhi, India</p>
            <p><i className="bi bi-envelope-fill me-2"></i>info@bookstack.com</p>
            <p><i className="bi bi-phone-fill me-2"></i>+91 9876543210</p>
          </div>
        </div>

        <hr className="mb-4" />

        {/* Social Media Icons */}
        <div className="row align-items-center">
          <div className="col-md-7 col-lg-8">
            <p className="text-center text-md-start">© 2025 BookStack. All Rights Reserved.</p>
          </div>

          <div className="col-md-5 col-lg-4">
            <div className="text-center text-md-end">
              <Link to="/" className="text-white me-3"><i className="bi bi-facebook"></i></Link>
              <Link to="/" className="text-white me-3"><i className="bi bi-instagram"></i></Link>
              <Link to="/" className="text-white me-3"><i className="bi bi-twitter"></i></Link>
              <Link to="/" className="text-white"><i className="bi bi-github"></i></Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
