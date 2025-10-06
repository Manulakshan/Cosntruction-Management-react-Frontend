import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash, FaSpinner } from "react-icons/fa";
import { toast } from 'react-toastify';
import axios from 'axios';
import Sidebar from "../../components/Admin/Sidebar";
import "./SupervisorRegistration.css";

const API_URL = 'http://localhost:3000/api/supRegister';

const SupervisorRegistration = () => {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch supervisors on component mount
  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        const response = await axios.get(API_URL + '/supervisors');
        setSupervisors(response.data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching supervisors:', error);
        setError('Failed to load supervisors');
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formData, setFormData] = useState({
    id: "",
    supervisorName: "",
    username: "",
    nic: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Filter supervisors based on search
  const filteredSupervisors = supervisors.filter(
    (sup) =>
      (sup.username?.toLowerCase().includes(search.toLowerCase()) ||
      (sup.supervisorId || sup.id)?.toLowerCase().includes(search.toLowerCase()) ||
      (sup.recoveryEmail || sup.email)?.toLowerCase().includes(search.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredSupervisors.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSupervisors = filteredSupervisors.slice(indexOfFirstItem, indexOfLastItem);
  const showingTo = Math.min(indexOfLastItem, filteredSupervisors.length);
  const showingFrom = filteredSupervisors.length > 0 ? indexOfFirstItem + 1 : 0;

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  const validatePassword = (password) => {
    return {
      hasMinLength: password.length >= 8,
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasNumber: /\d/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasUppercase: /[A-Z]/.test(password)
    };
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'password' ? { passwordValidation: validatePassword(value) } : {})
    }));
  };

  const passwordValidations = formData.password ? validatePassword(formData.password) : {
    hasMinLength: false,
    hasSpecialChar: false,
    hasNumber: false,
    hasLowercase: false,
    hasUppercase: false
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = (supervisor) => {
    setFormData({
      id: supervisor.supervisorId || supervisor.id,
      supervisorName: supervisor.supervisorName || "",
      username: supervisor.username,
      nic: supervisor.nic || "",
      password: "",
      confirmPassword: "",
      email: supervisor.recoveryEmail || supervisor.email || ""
    });
    setEditingId(supervisor._id || supervisor.id);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleFormReset = () => {
    setFormData({
      id: "",
      supervisorName: "",
      username: "",
      nic: "",
      password: "",
      confirmPassword: "",
      email: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!isEditing && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.id || !formData.username || !formData.email || !formData.nic) {
      toast.error("Please fill all required fields");
      return;
    }
    // Only require password for new supervisor
    if (!isEditing && !formData.password) {
      toast.error("Password is required");
      return;
    }

    // Validate supervisor ID format (SP-XXX where XXX is a 3-digit number)
    const supervisorIdRegex = /^SP-\d{3}$/;
    if (!supervisorIdRegex.test(formData.id)) {
      toast.error('Supervisor ID must be in format SP-XXX (e.g., SP-001)');
      return;
    }

    setIsSubmitting(true);

    try {
      const supervisorData = {
        supervisorId: formData.id,
        supervisorName: formData.supervisorName,
        username: formData.username,
        nic: formData.nic,
        recoveryEmail: formData.email
      };

      // Only include password if it's a new supervisor or password is being changed
      if (!isEditing || formData.password) {
        supervisorData.password = formData.password;
      }

      let response;
      
      if (isEditing && editingId) {
        // Update existing supervisor - use the correct endpoint
        response = await axios.put(
          `${API_URL}/supervisors/${editingId}`,
          supervisorData
        );
        
        if (response.data.success) {
          // Update the supervisors list by mapping through and updating the edited supervisor
          setSupervisors(prevSupervisors => 
            prevSupervisors.map(supervisor => 
              supervisor._id === editingId 
                ? { ...supervisor, ...supervisorData, _id: editingId } 
                : supervisor
            )
          );
        }
      } else {
        // Create new supervisor
        response = await axios.post(
          `${API_URL}/register`,
          supervisorData
        );
        
        if (response.data.success) {
          // Add the new supervisor to the list
          setSupervisors(prevSupervisors => [
            response.data.data,
            ...prevSupervisors
          ]);
        }
      }
      
      if (response.data.success) {
        toast.success(
          isEditing 
            ? "Supervisor updated successfully!" 
            : "Supervisor registered successfully!"
        );
        // Reset form and state
        handleFormReset();
      } else {
        const errorMessage = response.data.error || 'Failed to register supervisor';
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error registering supervisor:', error);
      const errorMessage = error.response?.data?.error || 'Failed to register supervisor';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supervisor?")) {
      try {
        // Optimistically update the UI first
        setSupervisors(prevSupervisors => 
          prevSupervisors.filter(sup => sup._id !== id && sup.id !== id)
        );
        
        // Then make the API call
        await axios.delete(`${API_URL}/supervisors/${id}`);
        toast.success('Supervisor deleted successfully');
        
      } catch (error) {
        console.error('Error deleting supervisor:', error);
        
        // Revert the UI if the API call fails
        try {
          const supervisorsResponse = await axios.get(API_URL + '/supervisors');
          setSupervisors(supervisorsResponse.data.data || []);
        } catch (fetchError) {
          console.error('Error fetching supervisors:', fetchError);
        }
        
        const errorMessage = error.response?.data?.error || 'Failed to delete supervisor';
        toast.error(errorMessage);
      }
    }
  };

  return (
    <div className="solidcore-admin-container">
      <Sidebar />
      <main className="solidcore-main">
        {!showForm ? (
          <>
            <header className="solidcore-header">
              <div className="breadcrumb">
                <span className="crumb">SOLIDCORE</span>
                <span className="separator">›</span>
                <span className="crumb active">Supervisor Registration</span>
              </div>
              <div className="admin-profile">
                <div className="admin-info">
                  <h4>Admin Name</h4>
                  <p>Administrator</p>
                </div>
              </div>
            </header>

            <section className="supervisor-section">
              <div className="supervisor-card">
                <div className="supervisor-header">
                  <h2>Registered Supervisors Details</h2>
                  <button className="add-btn" onClick={() => setShowForm(true)}>
                    <FaPlus /> Add Supervisor
                  </button>
                </div>

                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search by name, username, or ID"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="table-wrapper">
                  <table className="supervisor-table">
                    <thead>
                      <tr>
                        <th>Supervisor ID</th>
                        <th>Username</th>
                        <th>NIC</th>
                        <th>Email</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentSupervisors.map((sup) => (
                        <tr key={sup._id || sup.id}>
                          <td>{sup.supervisorId || sup.id}</td>
                          <td>{sup.username}</td>
                          <td>{sup.nic || 'N/A'}</td>
                          <td>{sup.recoveryEmail || sup.email || 'N/A'}</td>
                          <td>
                            <div className="action-buttons">
                              <button 
                                className="edit-icon" 
                                onClick={() => handleEdit(sup)}
                              >
                                <FaEdit />
                              </button>
                              <button className="delete-icon" onClick={() => handleDelete(sup._id || sup.id)}>
                                <FaTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pagination">
                  <p>Showing {showingFrom} to {showingTo} of {filteredSupervisors.length} supervisors</p>
                  {totalPages > 1 && (
                    <div className="pagination-controls">
                      <button onClick={() => paginate(1)} disabled={currentPage === 1}>&laquo;</button>
                      <button onClick={prevPage} disabled={currentPage === 1}>&lsaquo;</button>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        // Show pages around current page
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button 
                            key={pageNum}
                            className={currentPage === pageNum ? 'active' : ''}
                            onClick={() => paginate(pageNum)}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      <button onClick={nextPage} disabled={currentPage === totalPages}>&rsaquo;</button>
                      <button onClick={() => paginate(totalPages)} disabled={currentPage === totalPages}>&raquo;</button>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="register-page">
            <header className="solidcore-header">
              <div className="breadcrumb">
                <span className="crumb">SOLIDCORE</span>
                <span className="separator">›</span>
                <span className="crumb active">Supervisor Registration</span>
              </div>
              <div className="admin-profile">
                <div className="admin-info">
                  <h4>Admin Name</h4>
                  <p>Administrator</p>
                </div>
              </div>
            </header>

            <div className="register-container">
              <div className="register-banner">
                <h2>Register New Supervisor</h2>
                <p>Create new supervisor accounts with secure credentials.</p>
              </div>

              <div className="register-content">
                <div className="register-left">
                  <h3>Supervisor Registration</h3>
                  <p>Fill in the details to create a new supervisor account.</p>

                  <form onSubmit={handleFormSubmit} className="register-form">
                    <label>SUPERVISOR ID *</label>
                    <input
                      type="text"
                      name="id"
                      placeholder="Enter unique supervisor ID (e.g., SP-001)"
                      value={formData.id}
                      onChange={handleFormChange}
                      required
                    />
                    <small>Format: SP-XXX (e.g., SP-001)</small>
                    
                    <label>SUPERVISOR NAME *</label>
                    <input
                      type="text"
                      name="supervisorName"
                      placeholder="Enter supervisor's full name"
                      value={formData.supervisorName}
                      onChange={handleFormChange}
                      required
                    />
                    <small>Enter the full name of the supervisor</small>

                    <label>USERNAME *</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleFormChange}
                      required
                    />
                    <small>Username must be 5–20 characters long</small>

                    <label>NIC *</label>
                    <input
                      type="text"
                      name="nic"
                      placeholder="Enter National Identity Card number"
                      value={formData.nic}
                      onChange={handleFormChange}
                      required
                    />
                    <small>This will be used for official identification</small>

                    <label>PASSWORD *</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleFormChange}
                      required
                    />

                    <div className="password-checklist">
                      <div className={passwordValidations.hasMinLength ? 'valid' : ''}>
                        <span>✓</span> At least 8 characters
                      </div>
                      <div className={passwordValidations.hasSpecialChar ? 'valid' : ''}>
                        <span>✓</span> One special character
                      </div>
                      <div className={passwordValidations.hasNumber ? 'valid' : ''}>
                        <span>✓</span> One number
                      </div>
                      <div className={passwordValidations.hasLowercase ? 'valid' : ''}>
                        <span>✓</span> One lowercase letter
                      </div>
                      <div className={passwordValidations.hasUppercase ? 'valid' : ''}>
                        <span>✓</span> One uppercase letter
                      </div>
                    </div>

                    <label>CONFIRM PASSWORD *</label>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                      required
                    />

                    <label>RECOVERY EMAIL *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter a valid recovery email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                    />

                    <button 
                      type="submit" 
                      className="create-btn" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <FaSpinner className="spinner" /> Processing...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </button>
                  </form>
                </div>

                <div className="register-right">
                  <div className="info-card">
                    <h4>Supervisor ID</h4>
                    <p>Use the official ID format: SP-XXX where XXX is a 3-digit number.</p>
                  </div>

                  <div className="info-card">
                    <h4>Password Security</h4>
                    <ul>
                      <li>At least 8 characters</li>
                      <li>One uppercase letter</li>
                      <li>One lowercase letter</li>
                      <li>One number</li>
                      <li>One special character (@, $, !, etc.)</li>
                    </ul>
                  </div>

                  <div className="info-card">
                    <h4>Recovery Email</h4>
                    <p>Ensure the recovery email is active and accessible to the supervisor.</p>
                  </div>

                  <div className="info-card important">
                    <h4>Important</h4>
                    <p>Account credentials will be sent to the recovery email upon successful registration.</p>
                  </div>

                  <button type="button" className="cancel-btn" onClick={handleFormReset}>
                    {isEditing ? 'Cancel Edit' : 'Back to List'}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default SupervisorRegistration;
