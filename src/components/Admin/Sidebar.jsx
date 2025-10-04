import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: '📊', text: 'Dashboard', path: '/admin/dashboard' },
    { icon: '👥', text: 'Users', path: '/admin/users' },
    { icon: '📝', text: 'Posts', path: '/admin/posts' },
    { icon: '📂', text: 'Categories', path: '/admin/categories' },
    { icon: '📊', text: 'Analytics', path: '/admin/analytics' },
    { icon: '⚙️', text: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Admin Panel</h2>
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
