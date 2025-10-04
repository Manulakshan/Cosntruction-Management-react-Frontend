import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Admin/Sidebar';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <main className="admin-content">
        <header className="admin-header">
          <div className="header-left">
            <h1>SolidCore Admin Dashboard</h1>
          </div>
          <div className="header-left">
            <h1>SolidCore Admin Dashboard</h1>
          </div>
          <div className="header-right">
            {/* <div className="admin-search">
              <input type="text" placeholder="Search..." />
              <span className="search-icon">🔍</span>
            </div> */}
            <div className="admin-profile">
              <span className="notification-badge">3</span>
              <div className="profile-avatar">
                <img src="https://via.placeholder.com/40" alt="Admin" />
              </div>
            </div>
          </div>
        </header>
        <div className="content-wrapper">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
