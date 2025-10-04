import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {  text: 'Dashboard', path: '/admin/dashboard' },
    {  text: 'Site Management', path: '/admin/sitemanagement' },
    {  text: 'Profile Management', path: '/admin/supervisors' },
    {  text: 'Supervisor Registration', path: '/admin/supervisor/registration' },
    {  text: 'Workforce Management', path: '/admin/analytics' },
    {  text: 'Material Management', path: '/admin/settings' },
    {  text: 'Project Reports', path: '/admin/settings' },
    {  text: 'Financial Reports', path: '/admin/settings' },

  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SOLIDCORE</h2>
      </div>
      <div className="sidebar-menu">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-text">{item.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
