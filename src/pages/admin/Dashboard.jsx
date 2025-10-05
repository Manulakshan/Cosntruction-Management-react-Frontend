import React from "react";
import Sidebar from "../../components/Admin/Sidebar";
import "./Dashboard.css";
import { FaUsers, FaMapMarkerAlt, FaUserPlus, FaClipboardList } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div>
            <h1>SOLIDCORE Admin Dashboard</h1>
          </div>
          <div className="admin-header-right">
            <div className="admin-info">
              <div className="admin-text">
                <h4>Admin Name</h4>
                <p>Administrator</p>
              </div>
            </div>
            <button className="add-site-btn">+ Add New Site</button>
          </div>
        </header>

        {/* Welcome Section */}
        <section className="welcome-section">
          <div>
            <h2>Welcome back, Admin Name!</h2>
            <p>Here's what's happening with your projects today.</p>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="stat-box">
            <FaUsers className="stat-icon" />
            <div>
              <h3>50</h3>
              <p>Total Supervisors</p>
            </div>
          </div>
          <div className="stat-box">
            <FaMapMarkerAlt className="stat-icon" />
            <div>
              <h3>25</h3>
              <p>Current Sites</p>
            </div>
          </div>
          <div className="stat-box">
            <FaUsers className="stat-icon" />
            <div>
              <h3>550</h3>
              <p>Total Workers</p>
            </div>
          </div>
        </section>

        {/* Recent Activities */}
        <section className="activities-section">
          <h3>Recent Activities</h3>
          <div className="activity-card">
            <div>
              <h4>New Supervisor Registered</h4>
              <p>Kamal Perera has been added as a new supervisor</p>
            </div>
            <span>2 hours ago</span>
          </div>
          <div className="activity-card">
            <div>
              <h4>New Site Created</h4>
              <p>A new project site has been successfully established</p>
            </div>
            <span>Just now</span>
          </div>
        </section>

        {/* Quick Links */}
        <section className="quick-links">
          <div className="quick-card">
            <FaClipboardList className="quick-icon" />
            <h4>Site Management</h4>
            <p>Create, edit, and monitor project sites.</p>
          </div>
          <div className="quick-card">
            <FaUsers className="quick-icon" />
            <h4>Profile Management</h4>
            <p>Manage your profile settings and preferences.</p>
          </div>
          <div className="quick-card">
            <FaUserPlus className="quick-icon" />
            <h4>Supervisor Registration</h4>
            <p>Add supervisors and manage access.</p>
          </div>
          <div className="quick-card">
            <FaClipboardList className="quick-icon" />
            <h4>Project Reports</h4>
            <p>Generate insights and export PDFs.</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
