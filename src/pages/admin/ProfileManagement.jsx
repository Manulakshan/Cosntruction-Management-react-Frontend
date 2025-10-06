import React, { useState, useEffect } from "react";
import {
  FaIdBadge,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";
import Sidebar from "../../components/Admin/Sidebar";
import { toast } from "react-toastify";
import axios from "axios";
import "./ProfileManagement.css";
import "./Dashboard.css";
import API_URL from "../../config/api";

const ProfileManagement = () => {
  const API_BASE_URL = API_URL;
  const [formData, setFormData] = useState({
    supervisorId: "",
    siteId: "",
    allocatedPeriod: "",
    supervisorName: "",
    supervisorNIC: "",
    supervisorContact: "",
    supervisorEmail: ""
  });

  const [supervisors, setSupervisors] = useState([]);
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [registeredSupervisors, setRegisteredSupervisors] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProfileId, setCurrentProfileId] = useState(null);

  // Fetch data for Profile Management
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching registered supervisors...');
        const supervisorsRes = await axios.get(`${API_BASE_URL}/supRegister/supervisors`);
        const allSupervisors = supervisorsRes.data?.data || [];
        console.log('Registered supervisors:', allSupervisors);
        
        // Create a map of supervisors by ID for quick lookup
        const supervisorsMap = allSupervisors.reduce((map, supervisor) => {
          if (supervisor._id) {
            console.log(`Mapping supervisor _id: ${supervisor._id}`, supervisor);
            map[supervisor._id] = supervisor;
          }
          if (supervisor.supervisorId) {
            console.log(`Mapping supervisor supervisorId: ${supervisor.supervisorId}`, supervisor);
            map[supervisor.supervisorId] = supervisor;
          }
          return map;
        }, {});

        console.log('Fetching supervisor profiles...');
        const profilesRes = await axios.get(`${API_BASE_URL}/supervisor-profiles`);
        console.log('Raw profiles response:', profilesRes.data);
        
        if (profilesRes.data) {
          let profiles = Array.isArray(profilesRes.data)
            ? profilesRes.data
            : profilesRes.data.data || profilesRes.data.profiles || [];

          console.log('Processing profiles:', profiles);

          // Enhance profiles with registered supervisor data
          const enhancedProfiles = profiles.map(profile => {
            console.log('Processing profile:', profile);
            const supervisorId = profile.supervisorId || (profile.supervisor && profile.supervisor._id) || null;
            console.log('Looking up supervisor with ID:', supervisorId);
            const supervisorData = supervisorId ? supervisorsMap[supervisorId] : null;
            console.log('Found supervisor data:', supervisorData);
            
            const enhancedProfile = {
              ...profile,
              // Supervisor details from registration
              name: profile.supervisorName || supervisorData?.supervisorName || 'N/A',
              nic: profile.supervisorNIC || supervisorData?.nic || 'N/A',
              // Using username as contact if contact is not available
              contact: profile.supervisorContact || supervisorData?.username || 'N/A',
              // Using recoveryEmail as email if email is not available
              email: profile.supervisorEmail || supervisorData?.recoveryEmail || 'N/A',
              // Keep original IDs
              supervisorId: supervisorId,
              siteId: profile.siteId,
              // Format display values
              site: profile.siteId ? `Site ${profile.siteId}` : 'N/A',
              period: profile.allocatedPeriod || 'N/A',
              // Include additional supervisor data if available
              ...(supervisorData ? {
                username: supervisorData.username,
                recoveryEmail: supervisorData.recoveryEmail,
                isActive: supervisorData.isActive
              } : {})
            };
            
            console.log('Enhanced profile:', enhancedProfile);
            return enhancedProfile;
          });

          setSupervisors(enhancedProfiles);
          setRegisteredSupervisors(allSupervisors);

          // Extract unique sites for dropdown/filtering if needed
          const sitesData = [...new Set(profiles.map(p => p.siteId))]
            .filter(Boolean)
            .map(siteId => ({
              _id: siteId,
              siteId,
              name: `Site ${siteId}`
            }));

          setSites(sitesData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error loading profile data. Please try again later.");
        setSupervisors([]);
        setRegisteredSupervisors([]);
        setSites([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (formData.supervisorId) {
      const supervisor = registeredSupervisors.find(
        (s) => s._id === formData.supervisorId || s.supervisorId === formData.supervisorId
      );
      setSelectedSupervisor(supervisor || null);
    } else {
      setSelectedSupervisor(null);
    }

    if (formData.siteId) {
      const site = sites.find(
        (s) => s._id === formData.siteId || s.siteId === formData.siteId
      );
      setSelectedSite(site || null);
    } else {
      setSelectedSite(null);
    }
  }, [formData.supervisorId, formData.siteId, registeredSupervisors, sites]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(`Field ${name} changed to:`, value);
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setFormData({
      supervisorId: "",
      siteId: "",
      allocatedPeriod: "",
      supervisorName: "",
      supervisorNIC: "",
      supervisorContact: "",
      supervisorEmail: ""
    });
    setIsEditing(false);
    setCurrentProfileId(null);
  };

  const handleEditSupervisor = (profile) => {
    console.log('Editing profile:', profile);
    setFormData({
      supervisorId: profile.supervisorId || profile.id || "",
      siteId: profile.siteId || (profile.site ? profile.site.replace('Site ', '') : ""),
      allocatedPeriod: profile.period || profile.allocatedPeriod || "",
      supervisorName: profile.name || profile.supervisorName || "",
      supervisorNIC: profile.nic || profile.supervisorNIC || "",
      supervisorContact: profile.contact || profile.supervisorContact || "",
      supervisorEmail: profile.email || profile.supervisorEmail || ""
    });
    setIsEditing(true);
    setCurrentProfileId(profile._id || profile.id);
    // Scroll to the form
    document.querySelector('.profile-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    if (!formData.supervisorId) {
      toast.error('Supervisor ID is required');
      return;
    }

    setIsLoading(true);
    try {
      const profileData = {
        supervisorId: formData.supervisorId,
        siteId: formData.siteId,
        allocatedPeriod: formData.allocatedPeriod,
        supervisorName: formData.supervisorName,
        supervisorNIC: formData.supervisorNIC,
        supervisorContact: formData.supervisorContact,
        supervisorEmail: formData.supervisorEmail,
      };
      
      console.log('Sending data to API:', profileData);

      let response;
      if (isEditing && currentProfileId) {
        // Update existing profile
        response = await axios.put(
          `${API_BASE_URL}/supervisor-profiles/${currentProfileId}`,
          profileData
        );
        
        if (response.data.success) {
          const updatedProfile = response.data.data;
          
          // Update the local state with the complete updated profile from the server
          setSupervisors(prev => 
            prev.map(sup => {
              // Match by _id or id, whichever is available
              const isMatch = (sup._id === currentProfileId || sup.id === currentProfileId || 
                             (sup.supervisorId && sup.supervisorId === updatedProfile.supervisorId));
              
              if (isMatch) {
                // Merge the existing profile with the updated data
                return {
                  ...sup,
                  ...updatedProfile,
                  // Keep any additional fields that might be in the UI but not in the response
                  name: updatedProfile.supervisorName || sup.name,
                  nic: updatedProfile.supervisorNIC || sup.nic,
                  contact: updatedProfile.supervisorContact || sup.contact,
                  email: updatedProfile.supervisorEmail || sup.email,
                  site: updatedProfile.siteId ? `Site ${updatedProfile.siteId}` : sup.site,
                  period: updatedProfile.allocatedPeriod || sup.period
                };
              }
              return sup;
            })
          );
          toast.success('Profile updated successfully');
        }
      } else {
        // Create new profile
        response = await axios.post(
          `${API_BASE_URL}/supervisor-profiles`,
          profileData
        );
        
        // Add the new profile to the local state
        const newProfile = response.data.data || response.data;
        setSupervisors(prev => [newProfile, ...prev]);
        toast.success('Profile created successfully');
      }

      // Reset form
      handleCancel();
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error(error.response?.data?.message || 'Error saving profile');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSupervisor = async (supervisorId, index) => {
    if (!window.confirm('Are you sure you want to delete this supervisor profile?')) {
      return;
    }

    try {
      setIsLoading(true);
      // If using mock data, filter it out from the local state
      if (supervisors === mockSupervisors) {
        setSupervisors(prev => prev.filter((_, i) => i !== index));
        toast.success('Supervisor profile deleted successfully');
        return;
      }

      // If using real API, make the delete request
      const response = await axios.delete(`${API_BASE_URL}/supervisor-profiles/${supervisorId}`);
      
      if (response.data.success) {
        // Remove the deleted supervisor from the state
        setSupervisors(prev => prev.filter(sup => 
          sup._id !== supervisorId && sup.supervisorId !== supervisorId
        ));
        toast.success('Supervisor profile deleted successfully');
      } else {
        throw new Error(response.data.message || 'Failed to delete supervisor profile');
      }
    } catch (error) {
      console.error('Error deleting supervisor profile:', error);
      toast.error(error.response?.data?.message || 'Error deleting supervisor profile');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock data
  const mockSupervisors = [
    {
      initials: "KP",
      name: "Kamal Perera",
      id: "SP-001",
      nic: "901234567V",
      site: "ST-045",
      period: "8 months",
      contact: "0771234567",
      email: "kamal@solidcore.com",
    },
    {
      initials: "SN",
      name: "Samantha Niles",
      id: "SP-002",
      nic: "871234567V",
      site: "ST-028",
      period: "12 months",
      contact: "0772345678",
      email: "samantha@solidcore.com",
    },
    {
      initials: "RR",
      name: "Ravi Rajapaksa",
      id: "SP-003",
      nic: "851234567V",
      site: "ST-015",
      period: "24 months",
      contact: "0773456789",
      email: "ravi@solidcore.com",
    },
    {
      initials: "FD",
      name: "Fathima Deen",
      id: "SP-004",
      nic: "921234567V",
      site: "ST-033",
      period: "6 months",
      contact: "0774567890",
      email: "fathima@solidcore.com",
    },
    {
      initials: "MJ",
      name: "Michael Jayasuriya",
      id: "SP-005",
      nic: "881234567V",
      site: "ST-007",
      period: "18 months",
      contact: "0775678901",
      email: "michael@solidcore.com",
    },
    {
      initials: "AS",
      name: "Anusha Silva",
      id: "SP-006",
      nic: "951234567V",
      site: "ST-042",
      period: "3 months",
      contact: "0776789012",
      email: "anusha@solidcore.com",
    },
  ];

  const displayedSupervisors =
    supervisors.length > 0 ? supervisors : mockSupervisors;

  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">
        <header className="admin-header">
          <h1>Supervisor Profile Management</h1>
        </header>

        {/* === Supervisor Profile Form === */}
        <div className="card-container">
          <div className="profile-card">
            <h3 className="card-title">
              <FaIdBadge className="card-icon" /> Supervisor Profile
            </h3>
            <p className="card-subtitle">
              View and manage supervisor details below.
            </p>

            <form className="profile-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Supervisor ID</label>
                <div className="input-wrapper">
                  <FaIdBadge className="input-icon" />
                  <input
                    type="text"
                    name="supervisorId"
                    placeholder="Enter Supervisor ID"
                    value={formData.supervisorId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Assigned Site ID</label>
                <div className="input-wrapper">
                  <FaMapMarkerAlt className="input-icon" />
                  <input
                    type="text"
                    name="siteId"
                    placeholder="SITE-XYZ"
                    value={formData.siteId}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Allocated Period</label>
                <div className="input-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="text"
                    name="allocatedPeriod"
                    placeholder="e.g., 6 months"
                    value={formData.allocatedPeriod}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Cancel"}
                </button>
                <button
                  type="submit"
                  className="save-button"
                  disabled={isLoading}
                >
                  {isLoading ? (isEditing ? "Updating..." : "Saving...") : (isEditing ? "Update Profile" : "Add Profile")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* === Supervisor Profiles Cards === */}
        <div className="card-container" style={{ marginTop: "30px" }}>
          <div className="profile-card">
            <h3 className="card-title">
              <FaUserTie className="card-icon" /> Existing Supervisor Profiles
            </h3>

            <div className="supervisor-card-grid">
              {displayedSupervisors.length > 0 ? (
                displayedSupervisors.map((profile, index) => (
                  <div key={index} className="supervisor-card">
                    <div className="supervisor-avatar">
                      {(profile.name || 'NA')
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <h3>{profile.name || 'N/A'}</h3>
                    <p className="supervisor-id">
                      <strong>ID:</strong> {profile.supervisorId || 'N/A'}
                    </p>
                    <p>
                      <strong>NIC:</strong> {profile.nic || 'N/A'}
                    </p>
                    <p>
                      <strong>Site:</strong> {profile.site || (profile.siteId ? `Site ${profile.siteId}` : 'N/A')}
                    </p>
                    <p>
                      <strong>Period:</strong> {profile.period || 'N/A'}
                    </p>
                    <p>
                      <strong>Contact:</strong> {profile.contact || 'N/A'}
                    </p>
                    <p>
                      <strong>Email:</strong> {profile.email || 'N/A'}
                    </p>

                    {/* --- Edit & Delete Buttons --- */}
                    <div className="card-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEditSupervisor(profile)}
                        disabled={isLoading}
                      >
                        <i className="fas fa-edit"></i> {isLoading && currentProfileId === (profile._id || profile.id) ? 'Editing...' : 'Edit'}
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDeleteSupervisor(profile._id || profile.id, index)}
                        disabled={isLoading}
                      >
                        <i className="fas fa-trash-alt"></i> {isLoading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No supervisor profiles found. Add a new profile to get started.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileManagement;
