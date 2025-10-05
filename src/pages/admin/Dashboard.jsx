// src/pages/Admin/Dashboard.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Admin/Sidebar";
import "./Dashboard.css";
import {
  FaUsers,
  FaMapMarkerAlt,
  FaLayerGroup,
  FaClipboardList,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add any logout logic here (e.g., clear tokens, etc.)
    navigate('/login');
  };
  return (
    <div className="dashboard">
      <Sidebar />

      {/* Header */}
      <header className="dashboard-header">
        <h2>
          SOLIDCORE <span>Admin Dashboard</span>
        </h2>
        <div className="admin-info">
          <div>
            <h4>Admin Name</h4>
            <p>Administrator</p>
          </div>
          <div className="admin-avatar-container" ref={dropdownRef}>
            <div 
              className="admin-avatar" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              AN
              <FaChevronDown className="dropdown-arrow" />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-item" onClick={handleLogout}>
                  <FaSignOutAlt className="dropdown-icon" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <section className="welcome-card">
        <div>
          <h3>Welcome back, Admin Name!</h3>
          <p>Here's what's happening with your projects today.</p>
        </div>
        <div className="welcome-actions">
          <button className="btn-outline">🏠 View Home</button>
          <button className="btn-solid">+ Add New Project</button>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>50</h3>
          <p>Total Supervisors</p>
        </div>
        <div className="stat-card">
          <FaMapMarkerAlt className="stat-icon" />
          <h3>25</h3>
          <p>Current Sites</p>
        </div>
        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <h3>550</h3>
          <p>Total Workers</p>
        </div>
        <div className="stat-card">
          <FaLayerGroup className="stat-icon" />
          <h3>18</h3>
          <p>Ongoing Projects</p>
        </div>
      </section>

      {/* Recent Activities */}
      <section className="activities">
        <div className="activities-header">
          <h3>Recent Activities</h3>
          <a href="#">View All</a>
        </div>
        <div className="activity">
          <p>
            <b>New Supervisor Registered</b>
          </p>
          <p>Kamal Perera has been added as a new supervisor</p>
          <span>2 hours ago</span>
        </div>
        <div className="activity">
          <p>
            <b>New Site Created</b>
          </p>
          <p>A new project site has been successfully established</p>
          <span>Just now</span>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="quick-card">
          <FaClipboardList className="quick-icon" />
          <h4>Site Management</h4>
          <p>Create, edit, and monitor project sites.</p>
        </div>
        <div className="quick-card">
          <FaUsers className="quick-icon" />
          <h4>Supervisor Registration</h4>
          <p>Add supervisors and manage access.</p>
        </div>
        <div className="quick-card">
          <FaLayerGroup className="quick-icon" />
          <h4>Project Report</h4>
          <p>Generate insights and export PDFs.</p>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
