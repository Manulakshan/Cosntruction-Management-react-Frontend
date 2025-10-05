import React from 'react';
import { Link } from 'react-router-dom';
import { FaBoxes, FaUsers, FaClipboardCheck } from 'react-icons/fa';
import './Dashboard.css';

const SupervisorHome = () => {
  // Sample data for demonstration
  const stats = [
    {
      title: 'Materials',
      value: '24',
      change: '+5%',
      icon: <FaBoxes className="stat-icon" />,
      link: '/supervisor/materials',
      color: '#4caf50'
    },
    {
      title: 'Workforce',
      value: '15',
      change: '+2',
      icon: <FaUsers className="stat-icon" />,
      link: '/supervisor/workforce',
      color: '#2196f3'
    },
    {
      title: 'Tasks Completed',
      value: '87%',
      change: '+12%',
      icon: <FaClipboardCheck className="stat-icon" />,
      link: '#',
      color: '#ff9800'
    }
  ];

  return (
    <div className="supervisor-home">
      <div className="welcome-banner">
        <h1>Welcome back, <span>Supervisor</span></h1>
        <p>Here's what's happening with your site today</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderTop: `4px solid ${stat.color}` }}>
            <div className="stat-header">
              <h3>{stat.title}</h3>
              <div className="stat-change" style={{ color: stat.color }}>
                {stat.change}
              </div>
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-icon-container" style={{ backgroundColor: `${stat.color}15` }}>
                {React.cloneElement(stat.icon, { style: { color: stat.color } })}
              </div>
            </div>
            <Link to={stat.link} className="stat-link">
              View Details <span>→</span>
            </Link>
          </div>
        ))}
      </div>

      <div className="recent-activity">
        <h2>Recent Activity</h2>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon">📦</div>
            <div className="activity-details">
              <p>New material delivery received - 50 bags of cement</p>
              <span className="activity-time">2 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">👷</div>
            <div className="activity-details">
              <p>Workforce shift updated for tomorrow - 2 new workers added</p>
              <span className="activity-time">5 hours ago</span>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon">✅</div>
            <div className="activity-details">
              <p>Daily site inspection completed - No issues found</p>
              <span className="activity-time">Yesterday</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorHome;
