import React from "react";
import "./About.css";
import aboutImage from "../assets/img2.jpg"; 
import aboutImage2 from "../assets/img1.jpg"; 

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="about-hero" style={{ backgroundImage: `url(${aboutImage2})` }}>
        <div className="about-hero-overlay">
          <h1>About Us</h1>
          <p>
            Home <span className="breadcrumb-arrow">›</span> About
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="about-story">
        <div className="about-story-text">
          <h2>Our Story</h2>
          <p>
            Founded in 2000, Solidcore Construction (Pvt) Ltd is a privately-owned
            construction and civil engineering company based in Maharagama, Sri Lanka.
            We specialise in delivering end-to-end construction solutions, from
            residential buildings to commercial projects and large-scale civil
            engineering works.
          </p>
          <p>
            Our mission is to create durable, sustainable, and cost-effective structures
            that meet client expectations while upholding safety and quality standards.
            We are committed to using innovative technologies and best practices to
            ensure every project is a success.
          </p>
        </div>

        <div className="about-story-image">
          <img src={aboutImage} alt="Construction workers" />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="why-choose">
        <div className="why-header">
          <h2>Why Choose Us?</h2>
          <p>We are committed to excellence in every project we undertake, delivering unparalleled quality and value.</p>
        </div>

        <div className="why-grid">
          {/* Card 1 */}
          <div className="why-card">
            <div className="why-icon" aria-hidden="true">
              {/* user icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12c2.761 0 5-2.686 5-6s-2.239-6-5-6-5 2.686-5 6 2.239 6 5 6zm0 2c-4.418 0-8 2.239-8 5v3h16v-3c0-2.761-3.582-5-8-5z"/>
              </svg>
            </div>
            <h3>Experienced Leadership</h3>
            <p>Under the guidance of Mr. Ruwan Jayasuriya (Managing Director), we bring years of industry expertise to every project.</p>
          </div>

          {/* Card 2 */}
          <div className="why-card">
            <div className="why-icon" aria-hidden="true">
              {/* medal icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l2 4 4 .6-3 3 .7 4.4L12 12l-3.7 2 .7-4.4-3-3L10 6l2-4z"/>
                <circle cx="12" cy="17" r="4"/>
              </svg>
            </div>
            <h3>Strong Track Record</h3>
            <p>We have a proven history of successful projects completed on time and within budget, exceeding client expectations.</p>
          </div>

          {/* Card 3 */}
          <div className="why-card">
            <div className="why-icon" aria-hidden="true">
              {/* shield icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2l8 3v6c0 5-3.4 9.7-8 11-4.6-1.3-8-6-8-11V5l8-3z"/>
              </svg>
            </div>
            <h3>Commitment to Quality</h3>
            <p>We never compromise on quality, safety, or deadlines, ensuring client satisfaction every time.</p>
          </div>

          {/* Card 4 - centered on second row */}
          <div className="why-card why-card-wide">
            <div className="why-icon" aria-hidden="true">
              {/* handshake icon */}
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12l4-4 4 4 4-4 4 4-6 6-4-4-4 4-2-2 4-4-4-4z"/>
              </svg>
            </div>
            <h3>Personalized Service</h3>
            <p>We tailor our services to meet the unique needs of each client, providing customized solutions and dedicated support.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
