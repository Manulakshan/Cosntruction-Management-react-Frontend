import React, { useState } from "react";
import "./SiteManagement.css";
import Sidebar from '../../components/Admin/Sidebar';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // Add API call here
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
              <label>SITE NAME</label>
              <input
                type="text"
                name="siteName"
                placeholder="Enter site name"
                value={formData.siteName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>SITE ID</label>
              <input
                type="text"
                name="siteId"
                placeholder="Enter site ID"
                value={formData.siteId}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>LOCATION</label>
              <input
                type="text"
                name="location"
                placeholder="Enter site location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>SITE TYPE</label>
              <select
                name="siteType"
                value={formData.siteType}
                onChange={handleChange}
              >
                <option value="">Select site type</option>
                <option value="commercial">Commercial</option>
                <option value="residential">Residential</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>

            <div className="form-group">
              <label>ASSIGNED SUPERVISOR ID</label>
              <input
                type="text"
                name="supervisorId"
                placeholder="Enter supervisor ID"
                value={formData.supervisorId}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>PROJECT START DATE</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>PROJECT END DATE</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>CLIENT NAME</label>
              <input
                type="text"
                name="clientName"
                placeholder="Enter client name"
                value={formData.clientName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>CLIENT CONTACT NO</label>
              <input
                type="text"
                name="clientContact"
                placeholder="Enter client contact number"
                value={formData.clientContact}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>PROJECT SCALE</label>
              <select
                name="projectScale"
                value={formData.projectScale}
                onChange={handleChange}
              >
                <option value="">Select project scale</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label>SITE DESCRIPTION</label>
            <textarea
              name="description"
              rows="4"
              placeholder="Provide detailed site description."
              value={formData.description}
              onChange={handleChange}
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
