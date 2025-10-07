import React, { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdAccessTime } from "react-icons/md";
import "../components/Contact.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Replace with your actual backend API URL
      const response = await axios.post('http://localhost:3000/api/contact/submit', formData);
      
      toast.success('Message sent successfully! We will get back to you soon.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error.response?.data?.message || 'Failed to send message. Please try again.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="name"
            placeholder="Your full name" 
            value={formData.name}
            onChange={handleChange}
            required 
          />
          <input 
            type="text" 
            name="phone"
            placeholder="Your phone number" 
            value={formData.phone}
            onChange={handleChange}
            required 
          />
          <input 
            type="email" 
            name="email"
            placeholder="Your email address" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
          <textarea 
            rows="4" 
            name="message"
            placeholder="How can we help you?" 
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Contact Us'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
