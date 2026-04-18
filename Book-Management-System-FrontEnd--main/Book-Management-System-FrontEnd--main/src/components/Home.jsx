import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";

const Home = () => {
  return (
    <section className="home-section text-center text-white">
      <div className="container py-5">
        <h1 className="display-4 fw-bold animation-slide-down">
          Book Management System
        </h1>
        <p className="lead mb-4 animation-fade-in">
          Easily manage your online book catalog, update listings, and organize
          your personal or institutional library with ease.
        </p>

        <div className="row g-4 justify-content-center mt-4">
          <div className="col-md-4 animation-zoom-in">
            <div className="card border-0 shadow-lg h-100">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80"
                alt="Manage books"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Organize Your Books</h5>
                <p className="card-text">
                  Add, edit, and delete books with just a few clicks. Keep your
                  collection up-to-date.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 animation-zoom-in delay-1">
            <div className="card border-0 shadow-lg h-100">
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80"
                alt="Digital Book Catalog"
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">Digital Catalog</h5>
                <p className="card-text">
                  Browse your digital collection anytime, anywhere from any
                  device.
                </p>
              </div>
            </div>
          </div>

          <div className="col-md-4 animation-zoom-in delay-2">
            <div className="card border-0 shadow-lg h-100">
   <img
  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"
  alt="School Library System"
  className="card-img-top"
/>
              <div className="card-body">
                <h5 className="card-title">Perfect for Institutions</h5>
                <p className="card-text">
                  An ideal solution for schools, colleges, and public libraries
                  to manage books online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
