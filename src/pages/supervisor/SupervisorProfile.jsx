import React from 'react';
import './Profile.css';
import { FaUser } from 'react-icons/fa';

const SupervisorProfile = () => {
  const supervisor = {
    name: 'RAVINDU ADHIKARI',
    role: 'Site Supervisor',
    status: 'Active - SITE4503',
    supervisorId: 'S0001',
    nic: '855420159V',
    email: 'ravindu.a@solidcore.com',
    contact: '+94 77 123 4567',
  };

  return (
    <div className="supervisor-profile-page">
      <h1 className="supervisor-profile-title">My Profile</h1>

      <div className="supervisor-profile-card">
        <div className="supervisor-profile-left">
          <div className="supervisor-profile-avatar">
            <FaUser className="supervisor-avatar-icon" />
          </div>

          <h2 className="supervisor-profile-name">{supervisor.name}</h2>
          <p className="supervisor-profile-role">{supervisor.role}</p>

          <div className="supervisor-status-bar">
            <span className="supervisor-status-active">🟢 Active - SITE4503</span>
          </div>
        </div>

        <div className="supervisor-profile-details">
          <h3 className="supervisor-details-title">Personal Details</h3>
          <div className="supervisor-detail-item">
            <label>Supervisor ID</label>
            <p>{supervisor.supervisorId}</p>
          </div>
          <div className="supervisor-detail-item">
            <label>NIC</label>
            <p>{supervisor.nic}</p>
          </div>
          <div className="supervisor-detail-item">
            <label>Email Address</label>
            <p>{supervisor.email}</p>
          </div>
          <div className="supervisor-detail-item">
            <label>Contact Number</label>
            <p>{supervisor.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorProfile;
