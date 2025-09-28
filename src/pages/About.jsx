import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';
// Use a placeholder image for now - replace with your actual image
const aboutImage = 'https://via.placeholder.com/600x800';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* Left Side Content */}
        <div className="about-text">
          <h1>About Us</h1>
          <p>
            Founded in 2000, Solidcore Construction (Pvt) Ltd is a privately-owned
            construction and civil engineering company based in Maharagama, Sri Lanka.
            We specialize in delivering end-to-end construction solutions, from
            residential buildings to commercial projects and large-scale civil
            engineering works. Our mission is to create durable, sustainable, and
            cost-effective structures that meet client expectations while upholding
            safety and quality standards. We are a trusted name in construction and
            civil engineering, delivering high-quality projects with professionalism
            and innovation. With a skilled team, modern technology, and a commitment
            to excellence, we build spaces that last a lifetime.
          </p>

          <h3>Why Choose Us?</h3>
          <ul>
            <li>Experienced leadership under Mr. Ruwan Jayasooriya (Managing Director)</li>
            <li>Strong track record of successful projects</li>
            <li>Commitment to quality, safety, and deadlines</li>
            <li>Personalized service tailored to client needs</li>
          </ul>

          <Link to="/team" className="about-btn">OUR TEAM</Link>
        </div>

        {/* Right Side Image */}
        <div className="about-image">
          <img src={aboutImage} alt="Construction work" />
        </div>
      </div>
    </div>
  );
};

export default About;
