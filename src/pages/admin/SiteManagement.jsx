import React, { useState } from "react";
import "./SiteManagement.css";
import Sidebar from '../../components/Admin/Sidebar';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SiteManagement = () => {
  const [formData, setFormData] = useState({
    siteName: "",
    siteId: "",
    location: "",
    siteType: "",
    supervisorId: "",
    startDate: "",
    endDate: "",
    clientName: "",
    clientContact: "",
    projectScale: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.siteName.trim()) newErrors.siteName = 'Site name is required';
    if (!formData.siteId.trim()) newErrors.siteId = 'Site ID is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.siteType) newErrors.siteType = 'Site type is required';
    if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required';
    if (!formData.clientContact.trim()) {
      newErrors.clientContact = 'Contact number is required';
    } else if (!/^(?:\+?[1-9]\d{7,14}|0\d{9})$/.test(formData.clientContact)) {
      newErrors.clientContact = 'Invalid contact number format. Use either +94XXXXXXXXX or 0XXXXXXXXX';
    }
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    
    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) {
        newErrors.endDate = 'End date cannot be before start date';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Date validation
      if (formData.startDate && formData.endDate) {
        const startDate = new Date(formData.startDate);
        const endDate = new Date(formData.endDate);
        
        if (endDate < startDate) {
          toast.error('End date cannot be before start date');
          return;
        }
      }

      // Format phone number
      let formattedContact = formData.clientContact.trim();
      if (formattedContact.startsWith('0') && formattedContact.length === 10) {
        // Keep as is
      } else if (formattedContact.startsWith('+94') && formattedContact.length >= 12 && formattedContact.length <= 17) {
        // Keep as is
      } else if (formattedContact.length === 9) {
        formattedContact = `+94${formattedContact}`;
      } else if (formattedContact.startsWith('0') && formattedContact.length === 10) {
        formattedContact = `+94${formattedContact.substring(1)}`;
      } else {
        throw new Error('Invalid contact number format. Use either +94XXXXXXXXX or 0XXXXXXXXX (9-10 digits)');
      }

      const siteData = {
        'SITE NAME': formData.siteName,
        'SITE ID': formData.siteId,
        'SITE TYPE': formData.siteType.charAt(0).toUpperCase() + formData.siteType.slice(1).toLowerCase(),
        'LOCATION': formData.location,
        'SUPERVISOR ID': formData.supervisorId,
        'PROJECT START DATE': formData.startDate,
        'PROJECT END DATE': formData.endDate,
        'CLIENT NAME': formData.clientName,
        'CLIENT CONTACT NO': formattedContact,
        'PROJECT SCALE': Number(formData.projectScale) || 0,
        'SITE DESCRIPTION': formData.description
      };
      
      const response = await axios.post('http://localhost:3000/api/siteRegister', siteData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        toast.success('Site created successfully!');
        // Reset form
        setFormData({
          siteName: "",
          siteId: "",
          location: "",
          siteType: "",
          supervisorId: "",
          startDate: "",
          endDate: "",
          clientName: "",
          clientContact: "",
          projectScale: "",
          description: ""
        });
      } else {
        toast.error(response.data.message || 'Failed to create site');
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.data?.validationErrors) {
        const backendErrors = {};
        Object.entries(error.response.data.validationErrors).forEach(([field, errorObj]) => {
          const fieldName = field.toLowerCase().replace(/\s+/g, '');
          backendErrors[fieldName] = errorObj.message;
        });
        setErrors(prev => ({
          ...prev,
          ...backendErrors,
          form: 'Please fix the validation errors below.'
        }));
      } else {
        toast.error(error.response?.data?.message || 'An error occurred while creating the site');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-management">
      <Sidebar />
      <h2 className="title">Site Management</h2>
      <form className="site-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Site Details</legend>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="siteName">SITE NAME</label>
              <input
                id="siteName"
                type="text"
                name="siteName"
                placeholder="Enter site name"
                value={formData.siteName}
                onChange={handleChange}
                className={`form-control ${errors.siteName ? 'error' : ''}`}
                autoComplete="off"
              />
              {errors.siteName && <span className="error-message">{errors.siteName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="siteId">SITE ID</label>
              <input
                id="siteId"
                type="text"
                name="siteId"
                placeholder="Enter site ID"
                value={formData.siteId}
                onChange={handleChange}
                className={`form-control ${errors.siteId ? 'error' : ''}`}
                autoComplete="off"
              />
              {errors.siteId && <span className="error-message">{errors.siteId}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="location">LOCATION</label>
              <input
                id="location"
                type="text"
                name="location"
                placeholder="Enter site location"
                value={formData.location}
                onChange={handleChange}
                className={`form-control ${errors.location ? 'error' : ''}`}
                autoComplete="off"
              />
              {errors.location && <span className="error-message">{errors.location}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="siteType">SITE TYPE</label>
              <select
                id="siteType"
                name="siteType"
                value={formData.siteType}
                onChange={handleChange}
                className={`form-control ${errors.siteType ? 'error' : ''}`}
              >
                <option value="">Select site type</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
              </select>
              {errors.siteType && <span className="error-message">{errors.siteType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="supervisorId">ASSIGNED SUPERVISOR ID</label>
              <input
                id="supervisorId"
                type="text"
                name="supervisorId"
                placeholder="Enter supervisor ID"
                value={formData.supervisorId}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              />
            </div>

            <div className="form-group">
              <label htmlFor="startDate">PROJECT START DATE</label>
              <input
                id="startDate"
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={`form-control ${errors.startDate ? 'error' : ''}`}
              />
              {errors.startDate && <span className="error-message">{errors.startDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">PROJECT END DATE</label>
              <input
                id="endDate"
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={`form-control ${errors.endDate ? 'error' : ''}`}
              />
              {errors.endDate && <span className="error-message">{errors.endDate}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="clientName">CLIENT NAME</label>
              <input
                id="clientName"
                type="text"
                name="clientName"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={handleChange}
                className={`form-control ${errors.clientName ? 'error' : ''}`}
                autoComplete="off"
              />
              {errors.clientName && <span className="error-message">{errors.clientName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="clientContact">CLIENT CONTACT NO</label>
              <input
                id="clientContact"
                type="tel"
                name="clientContact"
                placeholder="Enter client contact number"
                value={formData.clientContact}
                onChange={handleChange}
                className={`form-control ${errors.clientContact ? 'error' : ''}`}
                autoComplete="tel"
              />
              {errors.clientContact && <span className="error-message">{errors.clientContact}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="projectScale">PROJECT SCALE</label>
              <select
                id="projectScale"
                name="projectScale"
                value={formData.projectScale}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select project scale</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

            <div className="form-group full-width">
              <label htmlFor="description">SITE DESCRIPTION</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                placeholder="Provide detailed site description."
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                autoComplete="off"
              ></textarea>
            </div>
        </fieldset>

        <div className="form-actions">
          <button type="button" className="btn-cancel">
            CANCEL
          </button>
          <button type="submit" className="btn-save">
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default SiteManagement;
