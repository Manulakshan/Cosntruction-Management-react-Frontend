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

const ProfileManagement = () => {
  const [formData, setFormData] = useState({
    supervisorId: "",
    siteId: "",
    allocatedPeriod: "",
  });

  const [supervisors, setSupervisors] = useState([]);
  const [registeredSupervisors, setRegisteredSupervisors] = useState([]);
  const [sites, setSites] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  // Fetch data for Profile Management
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Base URL for API requests
        const API_BASE_URL = 'http://localhost:3000/api';

        // Fetch supervisor profiles (only those created through Profile Management)
        const profilesRes = await axios.get(`${API_BASE_URL}/supervisor-profiles`);
        if (profilesRes.data) {
          const profiles = Array.isArray(profilesRes.data) ? profilesRes.data : 
                         (profilesRes.data.data || profilesRes.data.profiles || []);
          
          setSupervisors(profiles);
          
          // Extract unique supervisor and site data from profiles
          const uniqueSupervisorIds = [...new Set(profiles.map(p => p.supervisorId))];
          const uniqueSiteIds = [...new Set(profiles.map(p => p.siteId).filter(Boolean))];
          
          // Set supervisors and sites from profile data
          const supervisorsData = profiles
            .filter(profile => profile.supervisorId)
            .map(profile => ({
              _id: profile.supervisorId,
              name: profile.supervisorName,
              contact: profile.supervisorContact,
              email: profile.supervisorEmail,
              nic: profile.supervisorNIC
            }));
            
          const sitesData = profiles
            .filter(profile => profile.siteId)
            .map(profile => ({
              _id: profile.siteId,
              siteId: profile.siteId,
              name: profile.siteName || `Site ${profile.siteId}`
            }));
            
          setRegisteredSupervisors(supervisorsData);
          setSites(sitesData);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
        toast.error("Error loading profile data. Please try again later.");
        
        // Set empty arrays to prevent showing any data
        setSupervisors([]);
        setRegisteredSupervisors([]);
        setSites([]);
      }
    };

    fetchData();
  }, []);

  // Update selected supervisor and site when form data changes
  useEffect(() => {
    if (formData.supervisorId) {
      const supervisor = registeredSupervisors.find(
        s => s._id === formData.supervisorId || s.supervisorId === formData.supervisorId
      );
      setSelectedSupervisor(supervisor || null);
    } else {
      setSelectedSupervisor(null);
    }

    if (formData.siteId) {
      const site = sites.find(
        s => s._id === formData.siteId || s.siteId === formData.siteId
      );
      setSelectedSite(site || null);
    } else {
      setSelectedSite(null);
    }
  }, [formData.supervisorId, formData.siteId, registeredSupervisors, sites]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateSiteId = (siteId) => {
    const siteIdRegex = /^SITE-\d{3}$/;
    return siteIdRegex.test(siteId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supervisorId || !formData.siteId || !formData.allocatedPeriod) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!selectedSupervisor) {
      toast.error("Please select a valid supervisor");
      return;
    }

    // Validate site ID format
    if (!validateSiteId(formData.siteId)) {
      toast.error("Please enter a valid site ID in the format SITE-XXX (e.g., SITE-123)");
      return;
    }

    setIsLoading(true);

    try {
      const profileData = {
        ...formData,
        supervisorName: selectedSupervisor.name,
        supervisorContact: selectedSupervisor.contact,
        supervisorEmail: selectedSupervisor.email,
        supervisorNIC: selectedSupervisor.nic,
        siteName: selectedSite?.name || formData.siteId
      };

      const API_BASE_URL = 'http://localhost:3000/api';
      const response = await axios.post(
        `${API_BASE_URL}/supervisor-profiles`,
        profileData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        toast.success("Profile saved successfully!");
        // Refresh the profiles list
        const profilesRes = await axios.get("http://localhost:3000/api/supervisor-profiles");
        if (profilesRes.data.success) {
          setSupervisors(profilesRes.data.profiles || []);
        }
        
        setFormData({
          supervisorId: "",
          siteId: "",
          allocatedPeriod: "",
        });
        setSelectedSupervisor(null);
        setSelectedSite(null);
      } else {
        throw new Error(response.data.message || "Failed to save profile");
      }
    } catch (error) {
      console.error("Error details:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to save profile. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      supervisorId: "",
      siteId: "",
      allocatedPeriod: "",
    });
  };

  // Mock data (fallback if API not connected)
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
                  {isLoading ? "Saving..." : "Save Changes"}
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
              {supervisors.length > 0 ? (
                supervisors.map((profile, index) => {
                  // Get supervisor details
                  const supervisor = registeredSupervisors.find(
                    s => s._id === profile.supervisorId || s.supervisorId === profile.supervisorId
                  );
                  
                  // Get site details
                  const site = sites.find(
                    s => s._id === profile.siteId || s.siteId === profile.siteId
                  );

                  return (
                    <div key={index} className="supervisor-card">
                      <div className="supervisor-avatar">
                        {supervisor?.name?.split(" ").map(n => n[0]).join("") || 'NA'}
                      </div>
                      <h3>{supervisor?.name || 'N/A'}</h3>
                      <p className="supervisor-id">Supervisor ID: {profile.supervisorId}</p>
                      <p><strong>NIC:</strong> {supervisor?.nic || 'N/A'}</p>
                      <p><strong>Site ID:</strong> {site?.siteId || profile.siteId || 'N/A'}</p>
                      <p><strong>Site Name:</strong> {site?.name || 'N/A'}</p>
                      <p><strong>Period:</strong> {profile.allocatedPeriod}</p>
                      <p><strong>Contact:</strong> {supervisor?.contact || 'N/A'}</p>
                      <p><strong>Email:</strong> {supervisor?.email || 'N/A'}</p>
                    </div>
                  );
                })
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
