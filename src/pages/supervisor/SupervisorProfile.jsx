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
    <div className="profile-page">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">
        <div className="profile-left">
          <div className="profile-avatar">
            <FaUser className="avatar-icon" />
          </div>

          <h2 className="profile-name">{supervisor.name}</h2>
          <p className="profile-role">{supervisor.role}</p>

          <div className="status-bar">
            <span className="status-active">🟢 Active - SITE4503</span>
          </div>
        </div>

        <div className="profile-details">
          <h3 className="details-title">Personal Details</h3>
          <div className="detail-item">
            <label>Supervisor ID</label>
            <p>{supervisor.supervisorId}</p>
          </div>
          <div className="detail-item">
            <label>NIC</label>
            <p>{supervisor.nic}</p>
          </div>
          <div className="detail-item">
            <label>Email Address</label>
            <p>{supervisor.email}</p>
          </div>
          <div className="detail-item">
            <label>Contact Number</label>
            <p>{supervisor.contact}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisorProfile;
