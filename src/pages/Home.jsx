import React from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import { FaMapMarkerAlt, FaCalendarAlt, FaBuilding, FaRulerCombined } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const projects = [
    {
      title: 'Luxury Apartment Complex',
      location: 'Colombo 05, Sri Lanka',
      date: 'Jan 2023 - Dec 2025',
      size: '25,000 sq.ft',
      type: 'Residential',
      status: 'In Progress',
      image: 'https://via.placeholder.com/400x300?text=Luxury+Apartment'
    },
    {
      title: 'Commercial Office Tower',
      location: 'Colombo 03, Sri Lanka',
      date: 'Mar 2023 - Feb 2025',
      size: '45,000 sq.ft',
      type: 'Commercial',
      status: 'In Progress',
      image: 'https://via.placeholder.com/400x300?text=Office+Tower'
    },
    {
      title: 'Shopping Mall Renovation',
      location: 'Kandy, Sri Lanka',
      date: 'Completed: Nov 2022',
      size: '35,000 sq.ft',
      type: 'Commercial',
      status: 'Completed',
      image: 'https://via.placeholder.com/400x300?text=Shopping+Mall'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="text-box">
          <h1>SOLIDCORE constructions</h1>
          <p>building with strength building with confidence</p>
          <Link to="/contact" className="contact-button">Contact Us</Link>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section">
        <div className="container">
          <h2>Our Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div key={index} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-status">{project.status}</div>
                </div>
                <div className="project-details">
                  <h3>{project.title}</h3>
                  <div className="project-info">
                    <div className="info-item">
                      <FaMapMarkerAlt className="info-icon" />
                      <span>{project.location}</span>
                    </div>
                    <div className="info-item">
                      <FaCalendarAlt className="info-icon" />
                      <span>{project.date}</span>
                    </div>
                    <div className="info-item">
                      <FaRulerCombined className="info-icon" />
                      <span>{project.size}</span>
                    </div>
                    <div className="info-item">
                      <FaBuilding className="info-icon" />
                      <span>{project.type}</span>
                    </div>
                  </div>
                  <Link to="/overview" className="view-details-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
=======
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1><i>SOLIDCORE CONSTRUCTIONS</i></h1>
          <p><b>Building with strength,  Building with trust.</b></p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <div className="feature-card">
          </div>
          <div className="feature-card1">
          <h1><i>SOLIDCORE CONSTRUCTIONS</i></h1>
          <p><b>Pioneer For Innovative Construction Solutions.</b></p>
          <p>Welcome to Solidcore Construction (Pvt) Ltd -where strength meets reliability - Srilankas premier and most accredited construction Company</p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">Read More</Link>

        </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {/* <section className="cta">
        <h2>Ready to get started?</h2>
        <p>Join thousands of satisfied users today.</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </section> */}
>>>>>>> b7d9614e9a57a569706ac73a42e89358876780e7
    </div>
  );
};

export default Home;
