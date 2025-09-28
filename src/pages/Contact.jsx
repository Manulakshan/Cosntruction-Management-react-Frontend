import React from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail, MdAccessTime } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import "../components/Contact.css"; // <-- Fixed import path

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Contact Header */}
      <div className="contact-header">
        <h1>CONTACT</h1>
      </div>

      <div className="contact-section">
        {/* Left Side - Contact Info */}
        <div className="contact-info">
          <p>
            <FaMapMarkerAlt className="icon" /> No. 105, Highlevel Road,
            Maharagama, Sri Lanka
          </p>
          <p>
            <FaPhoneAlt className="icon" /> +94-77 123 4567
          </p>
          <p>
            <FaPhoneAlt className="icon" /> +94-115462334
          </p>
          <p>
            <MdEmail className="icon" />{" "}
            <a href="mailto:ruwan@solidcoreconstructions.com">
              ruwan@solidcoreconstructions.com
            </a>
          </p>
          <p>
            <MdAccessTime className="icon" /> Mon-Fri - 08:00-17:00
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="contact-form">
          <form>
            <div className="form-row">
              <input type="text" placeholder="Name" required />
              <input type="text" placeholder="Phone" required />
            </div>
            <input type="email" placeholder="Email address" required />
            <textarea placeholder="Message" rows="5" required></textarea>
            <button type="submit">CONTACT US</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;