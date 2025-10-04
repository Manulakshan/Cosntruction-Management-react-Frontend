import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        {/* About Us */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            SolidCore Constructions is a leading company in the construction
            industry, dedicated to providing high-quality services and
            innovative solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <a href="/" onClick={(e) => { e.preventDefault(); window.location.href = '/'; }}>Home</a>
            </li>
            <li>
              <a href="/about" onClick={(e) => { e.preventDefault(); window.location.href = '/about'; }}>About</a>
            </li>
            <li>
              <a href="/services" onClick={(e) => { e.preventDefault(); window.location.href = '/services'; }}>Services</a>
            </li>
            <li>
              <a href="/latest" onClick={(e) => { e.preventDefault(); window.location.href = '/latest'; }}>Projects</a>
            </li>
            <li>
              <a href="/contact" onClick={(e) => { e.preventDefault(); window.location.href = '/contact'; }}>Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>123 Construction Ave, Colombo, Sri Lanka</p>
          <p>+94 11 234 5678</p>
          <p>
            <a href="mailto:info@solidcore.com">info@solidcore.com</a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} SolidCore Constructions. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
