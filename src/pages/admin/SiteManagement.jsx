import React, { useState, useEffect } from "react";
import "./SiteManagement.css";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const SiteManagement = () => {
  const [sites, setSites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sitesPerPage] = useState(5);
  const [showForm, setShowForm] = useState(false);
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
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editingSite, setEditingSite] = useState(null);

  // Fetch existing sites
  useEffect(() => {
    fetchSites();
  }, []);

  const fetchSites = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/siteRegister");
      setSites(res.data || []);
    } catch (error) {
      console.error("Error fetching sites:", error);
      toast.error("Failed to load sites");
    }
  };

  const handleAddNew = () => {
    setShowForm(true);
  };

  const handleDelete = async (siteId) => {
    try {
      setIsDeleting(true);
      
      // First, make the API call to delete
      const response = await axios.delete(`http://localhost:3000/api/siteRegister/${siteId}`);
      
      if (response.data.success) {
        // If deletion is successful, update the UI by filtering out the deleted site
        setSites(prevSites => prevSites.filter(site => {
          // Check both _id and siteId to ensure we find the correct site
          const siteIdentifier = site._id || site.siteId || site['SITE ID'];
          return siteIdentifier !== siteId;
        }));
        
        toast.success("Site deleted successfully!");
      } else {
        throw new Error(response.data.message || "Failed to delete site");
      }
    } catch (error) {
      console.error("Error deleting site:", error);
      toast.error(error.response?.data?.message || "An error occurred while deleting the site");
      // Refresh the list to ensure UI matches the server state
      fetchSites();
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = (site) => {
    if (window.confirm(`Are you sure you want to delete ${site.siteName || site["SITE NAME"]}?`)) {
      handleDelete(site._id || site.siteId);
    }
  };

  const handleEdit = (site) => {
    console.log('Editing site data:', site); // Debug log
    setEditingSite(site);
    
    // Determine project scale based on the numeric value
    let projectScale = '';
    if (site["PROJECT SCALE"] !== undefined) {
      const scale = parseInt(site["PROJECT SCALE"]);
      if (scale <= 1000) projectScale = 'small';
      else if (scale <= 5000) projectScale = 'medium';
      else projectScale = 'large';
    }

    // Format dates to YYYY-MM-DD format for date inputs
    const formatDateForInput = (dateString) => {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toISOString().split('T')[0];
    };

    setFormData({
      siteName: site.siteName || site["SITE NAME"] || "",
      siteId: site.siteId || site["SITE ID"] || "",
      location: site.location || site.LOCATION || "",
      siteType: (site.siteType || site["SITE TYPE"] || "").toLowerCase(),
      supervisorId: site.supervisorId || site["SUPERVISOR ID"] || "N/A",
      startDate: formatDateForInput(site.startDate || site["PROJECT START DATE"] || ""),
      endDate: formatDateForInput(site.endDate || site["PROJECT END DATE"] || ""),
      clientName: site.clientName || site["CLIENT NAME"] || "",
      clientContact: (site.clientContact || site["CLIENT CONTACT NO"] || "").replace(/^\+94/, '0'),
      projectScale: projectScale,
      description: site.description || site["SITE DESCRIPTION"] || "",
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSite(null);
    setErrors({});
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
      description: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateSiteIdFormat = (siteId) => {
    const siteIdRegex = /^SITE-\d{3}$/;
    return siteIdRegex.test(siteId);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.siteName.trim()) newErrors.siteName = "Site name is required";
    if (!formData.siteId.trim()) {
      newErrors.siteId = "Site ID is required";
    } else if (!validateSiteIdFormat(formData.siteId)) {
      newErrors.siteId = "Site ID must be in the format SITE-XXX (e.g., SITE-123)";
    }
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.siteType) newErrors.siteType = "Site type is required";
    if (!formData.clientName.trim()) {
      newErrors.clientName = "Client name is required";
    }
    if (!formData.clientContact.trim()) {
      newErrors.clientContact = "Contact number is required";
    } else if (!/^(?:\+?[1-9]\d{7,14}|0\d{9})$/.test(formData.clientContact)) {
      newErrors.clientContact =
        "Invalid contact number format. Use +94XXXXXXXXX or 0XXXXXXXXX";
    }
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";

    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      if (endDate < startDate) newErrors.endDate = "End date cannot be before start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Format phone number
      const formattedContact = formData.clientContact.startsWith("+")
        ? formData.clientContact
        : formData.clientContact.startsWith("0")
        ? `+94${formData.clientContact.slice(1)}`
        : `+94${formData.clientContact}`;

      // Format dates to ISO string
      const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString();
      };

      // Prepare data for backend - using exact field names from the backend model
      const siteData = {
        "SITE NAME": formData.siteName.trim(),
        "SITE ID": formData.siteId.trim(),
        "SITE TYPE": formData.siteType.charAt(0).toUpperCase() + 
                    formData.siteType.slice(1).toLowerCase(),
        "LOCATION": formData.location.trim(),
        "SUPERVISOR ID": formData.supervisorId?.trim() || 'N/A',
        "PROJECT START DATE": new Date(formData.startDate),
        "PROJECT END DATE": new Date(formData.endDate),
        "CLIENT NAME": formData.clientName.trim(),
        "CLIENT CONTACT NO": formattedContact,
        "PROJECT SCALE": formData.projectScale === 'small' ? 1000 : 
                         formData.projectScale === 'medium' ? 5000 : 10000,
        "SITE DESCRIPTION": formData.description?.trim() || ''
      };

      console.log('Submitting site data:', siteData);

      let response;
      if (editingSite) {
        // Update existing site
        response = await axios.put(
          `http://localhost:3000/api/siteRegister/${editingSite._id || editingSite.siteId}`,
          siteData,
          { 
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            } 
          }
        );
      } else {
        // Create new site
        response = await axios.post(
          "http://localhost:3000/api/siteRegister",
          siteData,
          { 
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            } 
          }
        );
      }

      // Check for success in both response.data.success and response.data.message
      const isSuccess = response.data && (response.data.success || 
                         (response.data.message && response.data.message.includes('successfully')));
      
      if (isSuccess) {
        toast.success(response.data.message || `Site ${editingSite ? 'updated' : 'created'} successfully!`);
        fetchSites();
        handleCancel();
        return; // Exit the function after successful update
      } 
      // Only throw error if the response indicates failure
      throw new Error(response.data?.message || `Failed to ${editingSite ? 'update' : 'create'} site`);
    } catch (error) {
      console.error("Error creating site:", error);
      const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         error.message || 
                         "An error occurred while creating the site";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="site-management-container">
      <Sidebar />
      <div className="site-management-content">
        {!showForm ? (
          <>
            {/* TABLE VIEW */}
            <div className="header-row">
              <h2 className="page-title">Registered Sites</h2>
              <button className="btn-add" onClick={handleAddNew}>
                <FaPlus /> Add New Site
              </button>
            </div>

            <div className="table-container">
              <table className="site-table">
                <thead>
                  <tr>
                    <th>Site Name</th>
                    <th>Site ID</th>
                    <th>Location</th>
                    <th>Project Start Date</th>
                    <th>Project End Date</th>
                    <th>Client Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sites.length > 0 ? (
                    [...sites].reverse().slice((currentPage - 1) * sitesPerPage, currentPage * sitesPerPage).map((site, index) => (
                      <tr key={index}>
                        <td>{site.siteName || site["SITE NAME"]}</td>
                        <td>{site.siteId || site["SITE ID"]}</td>
                        <td>{site.location || site.LOCATION}</td>
                        <td>{site.projectStartDate || site["PROJECT START DATE"]}</td>
                        <td>{site.projectEndDate || site["PROJECT END DATE"]}</td>
                        <td>{site.clientName || site["CLIENT NAME"]}</td>
                        <td className="action-buttons">
                          <button 
                            className="btn-edit" 
                            onClick={() => handleEdit(site)}
                            title="Edit site"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            className="btn-delete" 
                            onClick={() => confirmDelete(site)}
                            disabled={isDeleting}
                            title="Delete site"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No sites registered yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              {/* Pagination */}
              {sites.length > sitesPerPage && (
                <div className="pagination-container">
                  <div className="pagination">
                    <button 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="pagination-button"
                    >
                      Previous
                    </button>
                    <span className="pagination-info">
                      Page {currentPage} of {Math.ceil(sites.length / sitesPerPage)}
                    </span>
                    <button 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(sites.length / sitesPerPage)))}
                      disabled={currentPage === Math.ceil(sites.length / sitesPerPage)}
                      className="pagination-button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* FORM VIEW */}
            <h2 className="page-title">Site Management</h2>
            <form className="site-form" onSubmit={handleSubmit}>
              <fieldset>
                <legend>Site Details</legend>
                <div className="form-grid">
                  <div className="form-group">
                    <label>SITE NAME</label>
                    <input
                      type="text"
                      name="siteName"
                      value={formData.siteName}
                      onChange={handleChange}
                      placeholder="Enter site name"
                      className={errors.siteName ? "error" : ""}
                    />
                    {errors.siteName && (
                      <span className="error-message">{errors.siteName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>SITE ID</label>
                    <input
                      type="text"
                      name="siteId"
                      value={formData.siteId}
                      onChange={handleChange}
                      placeholder="Enter site ID"
                      className={errors.siteId ? "error" : ""}
                    />
                    {errors.siteId && (
                      <span className="error-message">{errors.siteId}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>LOCATION</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter site location"
                      className={errors.location ? "error" : ""}
                    />
                    {errors.location && (
                      <span className="error-message">{errors.location}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>SITE TYPE</label>
                    <select
                      name="siteType"
                      value={formData.siteType}
                      onChange={handleChange}
                      className={errors.siteType ? "error" : ""}
                    >
                      <option value="">Select site type</option>
                      <option value="commercial">Commercial</option>
                      <option value="residential">Residential</option>
                      <option value="industrial">Industrial</option>
                    </select>
                    {errors.siteType && (
                      <span className="error-message">{errors.siteType}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>ASSIGNED SUPERVISOR ID</label>
                    <input
                      type="text"
                      name="supervisorId"
                      value={formData.supervisorId}
                      onChange={handleChange}
                      placeholder="Enter supervisor ID"
                    />
                  </div>

                  <div className="form-group">
                    <label>PROJECT START DATE</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className={errors.startDate ? "error" : ""}
                    />
                    {errors.startDate && (
                      <span className="error-message">{errors.startDate}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>PROJECT END DATE</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className={errors.endDate ? "error" : ""}
                    />
                    {errors.endDate && (
                      <span className="error-message">{errors.endDate}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>CLIENT NAME</label>
                    <input
                      type="text"
                      name="clientName"
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="Enter client name"
                      className={errors.clientName ? "error" : ""}
                    />
                    {errors.clientName && (
                      <span className="error-message">{errors.clientName}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label>CLIENT CONTACT NO</label>
                    <input
                      type="tel"
                      name="clientContact"
                      value={formData.clientContact}
                      onChange={handleChange}
                      placeholder="Enter client contact number"
                      className={errors.clientContact ? "error" : ""}
                    />
                    {errors.clientContact && (
                      <span className="error-message">
                        {errors.clientContact}
                      </span>
                    )}
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
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide detailed site description."
                  ></textarea>
                </div>
              </fieldset>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={handleCancel}
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="btn-save"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "SAVING..." : "SAVE"}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SiteManagement;
