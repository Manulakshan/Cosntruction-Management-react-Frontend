import React from 'react';
import { FaHome, FaBuilding, FaHammer, FaTruck, FaTools, FaHardHat } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: <FaHome className="service-icon" />,
      title: 'Residential Construction',
      description: 'Custom home building, renovations, and extensions with personalized designs that reflect your style and needs.'
    },
    {
      icon: <FaBuilding className="service-icon" />,
      title: 'Commercial Construction',
      description: 'Office buildings, retail spaces, and commercial complexes built to the highest standards.'
    },
    {
      icon: <FaHammer className="service-icon" />,
      title: 'Renovation Services',
      description: 'Transform your existing space with our expert renovation and remodeling services.'
    },
    {
      icon: <FaTruck className="service-icon" />,
      title: 'Project Management',
      description: 'End-to-end project management ensuring your project is delivered on time and within budget.'
    },
    {
      icon: <FaTools className="service-icon" />,
      title: 'Interior Design',
      description: 'Professional interior design services to create beautiful, functional spaces.'
    },
    {
      icon: <FaHardHat className="service-icon" />,
      title: 'Consultation',
      description: 'Expert advice and consultation for all your construction and design needs.'
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive construction solutions for residential and commercial projects</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-grid-section">
        <div className="container">
          <div className="section-header">
            <h2>What We Offer</h2>
            <p>We provide a wide range of construction services to meet all your building needs</p>
          </div>
          
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon-container">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/contact" className="learn-more">
                  Learn More <span>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today for a free consultation and quote</p>
          <Link to="/contact" className="cta-button">Get a Free Quote</Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
