import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  FaHome,
  FaBoxes,
  FaUsers,
  FaClipboardList,
  FaHammer,
  FaUser,
  FaSignOutAlt,
  FaTachometerAlt,
  FaCheckCircle,
  FaBars,
  FaTimes
} from "react-icons/fa";
import "./Dashboard.css";

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="supervisor-dashboard">
      {/* Mobile Menu Toggle Button */}
      <button className="mobile-menu-btn" onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Sidebar */}
      <aside className={`sidebar ${isMenuOpen ? 'active' : ''}`}>
        <div className="logo-section">
          <h2>SOLIDCORE</h2>
        </div>

        <nav className="nav-section">
          <div className="nav-group">
            <p className="nav-group-title">MAIN NAVIGATION</p>
            <ul>
              <li
                className={`nav-item ${
                  window.location.pathname === "/home" ? "active" : ""
                }`}
                onClick={() => navigate("/home")}
              >
                <FaHome className="nav-icon" />
                Home
              </li>
              <li
                className={`nav-item ${
                  window.location.pathname === "/supervisor/dashboard" ? "active" : ""
                }`}
                onClick={() => navigate("/supervisor/dashboard")}
              >
                <FaTachometerAlt className="nav-icon" />
                Dashboard
              </li>
            </ul>
          </div>

          <div className="nav-group">
            <p className="nav-group-title">PROFILE</p>
            <ul>
              <li
                className={`nav-item ${
                  window.location.pathname === "/supervisor/profile" ? "active" : ""
                }`}
                onClick={() => navigate("/supervisor/profile")}
              >
                <FaUser className="nav-icon" />
                My Profile
              </li>
            </ul>
          </div>

          <div className="nav-group">
            <p className="nav-group-title">MANAGEMENT</p>
            <ul>
              <li
                className={`nav-item ${
                  window.location.pathname === "/supervisor/materials" ? "active" : ""
                }`}
                onClick={() => navigate("/supervisor/materials")}
              >
                <FaBoxes className="nav-icon" />
                Material Management
              </li>
              <li
                className={`nav-item ${
                  window.location.pathname === "/workforce" ? "active" : ""
                }`}
                onClick={() => navigate("/workforce")}
              >
                <FaUsers className="nav-icon" />
                Workforce Management
              </li>
              <li
                className="nav-item logout"
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                <FaSignOutAlt className="nav-icon" />
                Logout
              </li>
            </ul>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {location.pathname === '/supervisor' || location.pathname === '/supervisor/dashboard' ? (
          <>
            <header className="dashboard-header">
              <h1>Dashboard</h1>
              <div className="user-info">
                <div className="user-details">
                  <p className="user-name">Kamal Perera</p>
                  <span className="user-role">Site Supervisor</span>
                </div>
                <div className="user-avatar">KP</div>
              </div>
            </header>

            <p className="dashboard-subtitle">
              Monitor and manage all construction activities from a centralized dashboard
            </p>

            <div className="top-cards">
              <div className="card">
                <div className="card-icon red">
                  <FaUsers />
                </div>
                <h3>WORKFORCE MANAGEMENT</h3>
                <p>Manage workers, teams, schedules and attendance tracking</p>
              </div>
              <div className="card">
                <div className="card-icon red">
                  <FaClipboardList />
                </div>
                <h3>MATERIAL MANAGEMENT</h3>
                <p>Track materials, inventory, deliveries and usage reports</p>
              </div>
            </div>

            <div className="bottom-cards">
              <div className="stat-card">
                <div className="stat-icon red">
                  <FaHammer />
                </div>
                <h2>15</h2>
                <p>ON GOING PROJECTS</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon green">
                  <FaCheckCircle />
                </div>
                <h2>2000+</h2>
                <p>COMPLETED PROJECTS</p>
              </div>

              <div className="stat-card">
                <div className="stat-icon red">
                  <FaUser />
                </div>
                <h2>150</h2>
                <p>WORKERS</p>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default SupervisorDashboard;
