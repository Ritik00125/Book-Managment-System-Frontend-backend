import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Services.css";

const services = [
  {
    title: "Book Inventory Management",
    desc: "Effortlessly manage your book collection — add, update, and delete books as needed.",
    img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Digital Book Catalog",
    desc: "Provide readers with a searchable, categorized digital library they can browse anytime.",
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "User Account Management",
    desc: "Allow users to register, log in, and manage their personal reading preferences.",
    img: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Issue & Return Tracking",
    desc: "Track issued books and automate reminders for return dates, fines, and notifications.",
    img: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Analytics & Reports",
    desc: "Gain valuable insights with charts and reports on reading trends and stock.",
    img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Multi-user Access Control",
    desc: "Assign roles like Admin, Librarian, or Reader with fine-grained control.",
    img: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=800&q=80"
  }
];

const Services = () => {
  return (
    <section className="services-section text-white py-5">
      <div className="container">
        <h2 className="text-center display-5 fw-bold mb-5 animation-slide-in">
          Our Book Management Services
        </h2>
        <div className="row g-4">
          {services.map((service, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className="card service-card h-100 shadow-lg border-0 animation-zoom-in">
                <img
                  src={service.img}
                  alt={service.title}
                  className="card-img-top"
                />
                <div className="card-body bg-dark text-white rounded-bottom">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
