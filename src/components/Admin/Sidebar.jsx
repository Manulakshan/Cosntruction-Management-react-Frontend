import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUserCog,
  FaUserTie,
  FaUsersCog,
  FaBoxes,
  FaChartBar,
  FaFileInvoiceDollar,
} from "react-icons/fa";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: <FaTachometerAlt />, text: 'Dashboard', path: '/admin/dashboard' },
    { icon: <FaMapMarkedAlt />, text: 'Site Management', path: '/admin/sitemanagement' },
    { icon: <FaUserCog />, text: 'Profile Management', path: '/admin/supervisors' },
    { icon: <FaUserTie />, text: 'Supervisor Registration', path: '/admin/supervisor/registration' },
    { icon: <FaUsersCog />, text: 'Workforce Management', path: '/admin/workforce' },
    { icon: <FaBoxes />, text: 'Material Management', path: '/admin/materials' },
    { icon: <FaChartBar />, text: 'Project Reports', path: '/admin/project-reports' },
    { icon: <FaFileInvoiceDollar />, text: 'Financial Reports', path: '/admin/settings' },
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
