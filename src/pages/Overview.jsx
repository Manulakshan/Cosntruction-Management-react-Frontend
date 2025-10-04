import React from 'react';
import "../components/Overview.css";
import heroImg from "../assets/img1.jpg"; // use your actual hero image
import { FaUserCog, FaCalendarAlt, FaSmile, FaTasks } from "react-icons/fa";

const Overview = () => {
  return (
    <div className="overview-page">
      {/* Hero Section (unchanged) */}
      <div
        className="overview-hero"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="overview-hero-overlay">
          <h1>Company Overview</h1>
          <p>
            Home <span className="breadcrumb-arrow">›</span> Overview
          </p>
        </div>
      </div>

      {/* About Section (unchanged) */}
      <section className="about-overview">
        <div className="container">
          <h2>About SolidCore Constructions</h2>
          <p>
            Here you can add more details about the company. This section is a
            placeholder to show how the rest of the page might look with the new
            maroon red and white theme. You can include information about the
            company's history, mission, vision, and values.
          </p>
        </div>
      </section>

      {/* Achievements Section (matches screenshot) */}
      <section className="achievements-overview">
        <div className="container">
          <h2 className="achievements-title">Our Achievements</h2>
          <p className="achievements-subtitle">
            Years of excellence in the construction industry
          </p>
          <div className="achievements-grid">
            <div className="achievement-card">
              <FaUserCog className="achievement-icon" />
              <h3>500</h3>
              <p>Expert Workers</p>
            </div>
            <div className="achievement-card">
              <FaCalendarAlt className="achievement-icon" />
              <h3>25</h3>
              <p>Years of Experience</p>
            </div>
            <div className="achievement-card">
              <FaSmile className="achievement-icon" />
              <h3>3000</h3>
              <p>Happy Customers</p>
            </div>
            <div className="achievement-card">
              <FaTasks className="achievement-icon" />
              <h3>15</h3>
              <p>Ongoing Projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section (matches screenshot) */}
      <section className="journey-overview">
        <div className="container">
          <h2 className="journey-title">Our Journey</h2>
          <p className="journey-subtitle">
            Key milestones in our company's history
          </p>

          <div className="timeline">
            <div className="timeline-item right">
              <div className="timeline-content">
                <h3>2000</h3>
                <p>Company founded with a small team and a big vision for the future.</p>
              </div>
            </div>
            <div className="timeline-item left">
              <div className="timeline-content">
                <h3>2005</h3>
                <p>Opened our first international office, expanding our global reach.</p>
              </div>
            </div>
            <div className="timeline-item right">
              <div className="timeline-content">
                <h3>2010</h3>
                <p>Expanded our services to include civil engineering and large-scale infrastructure projects.</p>
              </div>
            </div>
            <div className="timeline-item left">
              <div className="timeline-content">
                <h3>2015</h3>
                <p>Received National Excellence Award for Construction Quality and Innovation.</p>
              </div>
            </div>
            <div className="timeline-item right">
              <div className="timeline-content">
                <h3>2020</h3>
                <p>Reached milestone of 500+ skilled workers and 3000+ satisfied clients.</p>
              </div>
            </div>
            <div className="timeline-item left">
              <div className="timeline-content">
                <h3>2025</h3>
                <p>Planning to launch new sustainable initiatives and expand into renewable energy projects.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;
