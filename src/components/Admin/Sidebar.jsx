import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import {
  FaHome,
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaUserCog,
  FaUserTie,
  FaUsersCog,
  FaBoxes,
  FaChartBar,
  FaFileInvoiceDollar,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Redirect to login page
    navigate('/login');
  };

  // Grouped menu items
  const menuGroups = [
    {
      title: "MAIN NAVIGATION",
      items: [
        { icon: <FaHome />, text: 'Home', path: '/' },
        { icon: <FaTachometerAlt />, text: 'Dashboard', path: '/admin/dashboard' },
      ],
    },
    {
      title: "MANAGEMENT",
      items: [
        { icon: <FaMapMarkedAlt />, text: 'Site Management', path: '/admin/sitemanagement' },
        { icon: <FaUserCog />, text: 'Profile Management', path: '/admin/profile' },
        { icon: <FaUserTie />, text: 'Supervisor Registration', path: '/admin/supervisor/registration' },
      ],
    },
    {
      title: "REPORTS",
      items: [
        { icon: <FaChartBar />, text: 'Project Reports', path: '/admin/project-reports' },
      ],
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>SOLIDCORE</h2>
      </div>

      <div className="sidebar-menu">
        {menuGroups.map((group, i) => (
          <div key={i} className="menu-group">
            <p className="menu-group-title">{group.title}</p>
            {group.items.map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.text}</span>
              </Link>
            ))}
          </div>
        ))}
      </div>
      
      {/* Logout Button */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="logout-button">
          <FaSignOutAlt className="menu-icon" />
          <span className="menu-text">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
