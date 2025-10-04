import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import { FaArrowRight, FaCheck } from 'react-icons/fa';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>BUILDING WITH STRENGTH, BUILDING WITH <span className="highlight">TRUST</span>.</h1>
          <p>Pioneers in innovative construction solutions, delivering excellence in every project we undertake.</p>
          <div className="hero-buttons">
            <Link to="/contact" className="btn btn-primary">
              GET IN TOUCH <FaArrowRight className="btn-icon" />
            </Link>
            <Link to="/about" className="btn btn-secondary">
              LEARN MORE <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>SOLIDCORE CONSTRUCTIONS</h2>
              <h3>Pioneer For Innovative Construction Solutions.</h3>
              <p>Welcome to Solidcore Construction (Pvt) Ltd - where strength meets reliability - Sri Lanka's premier and most accredited construction company.</p>
              <ul className="features-list">
                <li><FaCheck className="check-icon" /> 25+ Years of Experience</li>
                <li><FaCheck className="check-icon" /> 100+ Completed Projects</li>
                <li><FaCheck className="check-icon" /> Certified & Professional Team</li>
                <li><FaCheck className="check-icon" /> Quality Assured Services</li>
              </ul>
              <Link to="/about" className="read-more">
                Read More <FaArrowRight className="arrow-icon" />
              </Link>
            </div>
            <div className="about-image">
              {/* Image will be set in CSS */}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive construction solutions tailored to your needs</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🏗️</div>
              <h3>Commercial Construction</h3>
              <p>State-of-the-art commercial spaces designed for functionality and aesthetics.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3>Residential Projects</h3>
              <p>Beautiful, durable homes built with quality materials and craftsmanship.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🏢</div>
              <h3>Industrial Construction</h3>
              <p>Robust industrial facilities for all your business needs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Project?</h2>
            <p>Contact us today for a free consultation and quote.</p>
            <Link to="/contact" className="btn btn-primary">
              GET A FREE QUOTE <FaArrowRight className="btn-icon" />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;