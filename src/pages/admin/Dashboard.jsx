import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../layouts/AdminLayout';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data for the dashboard
  const stats = [
    { title: 'Total Users', value: '2,456', icon: '👥', change: '+12%', trend: 'up' },
    { title: 'Total Revenue', value: '$12,345', icon: '💰', change: '+8%', trend: 'up' },
    { title: 'Total Orders', value: '1,234', icon: '🛒', change: '-3%', trend: 'down' },
    { title: 'Total Products', value: '567', icon: '📦', change: '+5%', trend: 'up' },
  ];

  return (
    <AdminLayout>
      <div className="dashboard">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p className="stat-value">{stat.value}</p>
                <span className={`stat-change ${stat.trend}`}>
                  {stat.change} {stat.trend === 'up' ? '↑' : '↓'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="dashboard-content">
          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-list">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-details">
                    <p>New order #100{item} has been placed</p>
                    <span className="activity-time">2 hours ago</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-buttons">
              <Link to="/admin/users/new" className="action-button">
                <span>👤</span> Add New User
              </Link>
              <Link to="/admin/posts/new" className="action-button">
                <span>✏️</span> Create Post
              </Link>
              <Link to="/admin/products/new" className="action-button">
                <span>📦</span> Add Product
              </Link>
              <Link to="/admin/settings" className="action-button">
                <span>⚙️</span> Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
