import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ logo, navItems = [] }) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        {logo && (
          <NavLink to="/" className="navbar-logo">
            <img src={logo} alt="Logo" className="logo-img" />
          </NavLink>
        )}
        <nav>
          <ul className="navbar-nav">
            {navItems.map((item, index) => (
              <li key={index}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => 
                    `nav-link${isActive ? ' active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
