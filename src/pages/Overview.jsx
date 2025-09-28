import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { FaRulerCombined, FaBuilding } from 'react-icons/fa';
import "../components/Overview.css";


const Overview = () => {
  return (
    <div className="overview-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>OVERVIEW</h1>
        </div>
      </div>

      {/* Project Info */}
      <div className="project-info">
        <div className="container">
          <div className="project-header">
            <h2>Project Information</h2>
            <p>Luxury Apartment Complex Development</p>
          </div>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="info-icon"><FaMapMarkerAlt /></span>
              <div>
                <h4>Location</h4>
                <p>Colombo, Sri Lanka</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><FaCalendarAlt /></span>
              <div>
                <h4>Timeline</h4>
                <p>2023 - 2024</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><FaRulerCombined /></span>
              <div>
                <h4>Size</h4>
                <p>25,000 sq.ft</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon"><FaBuilding /></span>
              <div>
                <h4>Status</h4>
                <p>In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
