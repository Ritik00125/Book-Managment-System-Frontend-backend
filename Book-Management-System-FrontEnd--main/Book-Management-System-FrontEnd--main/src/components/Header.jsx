import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const signup = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      style={{ position: "fixed", top: "0px", width: "100%", zIndex: 10 }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to="/"
          style={{ color: "orange", fontWeight: "bold" }}
        >
          Book management System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/services">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/book-list">
                Book List
              </Link>
            </li>
            <li className="nav-item ">
              <Link className="nav-link " to="/add-book">
                Add Book
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/issue-return">
                Issue & Return
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/contact-us">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/all-users">
                User Details
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <button className="btn btn-outline-warning me-2" type="button" onClick={signup}>
              Signup
            </button>
            <button className="btn btn-outline-light" type="button" onClick={login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
