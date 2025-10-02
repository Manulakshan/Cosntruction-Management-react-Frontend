import React from 'react';
import { Link } from 'react-router-dom';
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
    </div>
  );
};

export default Home;
