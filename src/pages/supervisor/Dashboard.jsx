import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaHome, FaBoxes, FaUsers, FaChevronDown, FaUser, FaTasks, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';
import './Dashboard.css';

const SupervisorDashboard = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
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


  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>SOLIDCORE</h2>
         
        </div>
        <nav className="sidebar-nav">
          <div className="menu-group">
            <div className="menu-group-title">MAIN NAVIGATION</div>
            <ul>
              <li 
                className={`nav-item ${window.location.pathname === '/supervisor/home' ? 'active' : ''}`}
                onClick={() => navigate('/supervisor/home')}
              >
                <FaHome className="nav-icon" />
                <span>Home</span>
              </li>
              <li 
                className={`nav-item ${window.location.pathname === '/supervisor/dashboard' ? 'active' : ''}`} 
                onClick={() => navigate('/supervisor/dashboard')}
              >
                <FaTachometerAlt className="nav-icon" />
                <span>Dashboard</span>
              </li>
            </ul>
          </div>
          
          <div className="menu-group">
            <div className="menu-group-title">PROFILE</div>
            <ul>
              <li 
                className={`nav-item ${window.location.pathname === '/supervisor/profile' ? 'active' : ''}`}
                onClick={() => navigate('/supervisor/profile')}
              >
                <FaUser className="nav-icon" />
                <span>My Profile</span>
              </li>
            </ul>
          </div>
          
          <div className="menu-group">
            <div className="menu-group-title">MANAGEMENT</div>
            <ul>
              <li 
                className={`nav-item ${window.location.pathname === '/supervisor/materials' ? 'active' : ''}`}
                onClick={() => navigate('/supervisor/materials')}
              >
                <FaBoxes className="nav-icon" />
                <span>Material Management</span>
              </li>
              <li 
                className={`nav-item ${window.location.pathname === '/supervisor/workflow' ? 'active' : ''}`}
                onClick={() => navigate('/supervisor/workflow')}
              >
                <FaTasks className="nav-icon" />
                <span>Workflow Management</span>
              </li>
              <li 
                className="nav-item"
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('userRole');
                  navigate('/login');
                }}
              >
                <FaSignOutAlt className="nav-icon" />
                <span>Logout</span>
              </li>
            </ul>
          </div>
        </nav>
        
      </aside>

      {/* Main Content */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h2>Supervisor <span>Dashboard</span></h2>
          <div className="user-dropdown" ref={dropdownRef}>
            <div 
              className="user-display" 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>Supervisor</span>
              <FaChevronDown className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`} />
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <button onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            )}
          </div>
        </header>
        
        <div className="dashboard-main">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SupervisorDashboard;
