import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdAccessTime } from "react-icons/md";
import "../components/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* Left Side - Contact Info */}
      <div className="contact-card">
        <h2 className="contact-title">Contact Information</h2>

        <div className="contact-item">
          <div className="icon-circle"><FaMapMarkerAlt /></div>
          <div>
            <h4>Address</h4>
            <p>No. 105, Hyblevel Road, Maharagama, Sri Lanka</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="icon-circle"><FaPhoneAlt /></div>
          <div>
            <h4>Phone</h4>
            <p>+94-77 123 4567<br />+94-115442334</p>
          </div>
        </div>

        <div className="contact-item">
          <div className="icon-circle"><MdEmail /></div>
          <div>
            <h4>Email</h4>
            <p><a href="mailto:ruwan@solidcorreconstruction.com">ruwan@solidcorreconstruction.com</a></p>
          </div>
        </div>

        <div className="contact-item">
          <div className="icon-circle"><MdAccessTime /></div>
          <div>
            <h4>Business Hours</h4>
            <p>
              Mon-Fri: 08:00 - 17:00<br />
              Sat: 08:00 - 13:00<br />
              Sun: Closed
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Message Form */}
      <div className="contact-card">
        <h2 className="contact-title">Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" placeholder="Your full name" required />
          <input type="text" placeholder="Your phone number" required />
          <input type="email" placeholder="Your email address" required />
          <textarea rows="4" placeholder="How can we help you?" required></textarea>
          <button type="submit">Contact Us</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
