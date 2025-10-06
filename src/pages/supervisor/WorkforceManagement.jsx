import React, { useState } from "react";
import "./WorkforceManagement.css";

const WorkforceManagement = () => {
  const [workforce, setWorkforce] = useState({
    electrician: true,
    painter: true,
    tiler: false,
    welder: false,
    heavyMachine: true,
  });

  const handleToggle = (role) => {
    setWorkforce({ ...workforce, [role]: !workforce[role] });
  };

  const workforceRoles = [
    { key: "electrician", name: "Electrician", desc: "Electrical installation and repair" },
    { key: "painter", name: "Painter", desc: "Interior and exterior painting" },
    { key: "tiler", name: "Tiler", desc: "Floor and wall tiling with precision" },
    { key: "welder", name: "Welder", desc: "Metal joining and fabrication" },
    { key: "heavyMachine", name: "Heavy Machine Operators", desc: "Excavators, cranes, heavy equipment" },
  ];

  return (
    <div className="wm-main-container">
      {/* Sticky Header */}
      <div className="wm-header">
        <div className="header-left">
          <button className="tab active">
            <i className="fa fa-briefcase"></i> WORKFORCE MANAGEMENT
          </button>
        </div>
        <div className="header-right">
          <button className="tab">Site ID</button>
          <div className="select-box">
            <label>Select: </label>
            <select>
              <option>Select Site ID</option>
            </select>
          </div>
        </div>
      </div>

      <div className="wm-scrollable-content">
        {/* Workforce Management Cards */}
        <div className="wm-content">
          {/* Required Workforce */}
          <div className="workforce-section">
            <h3>REQUIRED WORKFORCE</h3>
            {workforceRoles.map((role) => (
              <div className="role-card" key={role.key}>
                <div className="role-info">
                  <strong>{role.name}</strong>
                  <p>{role.desc}</p>
                </div>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={workforce[role.key]}
                    onChange={() => handleToggle(role.key)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            ))}
          </div>

          {/* Worker Allocation */}
          <div className="allocation-section">
            <h3>WORKER ALLOCATION</h3>
            {workforceRoles.map((role) => (
              <div className="allocation-field" key={role.key}>
                <label>{role.name}</label>
                <input
                  type="text"
                  placeholder={`Enter number of ${role.name.toLowerCase()}s`}
                  disabled={!workforce[role.key]}
                />
              </div>
            ))}

            <button className="save-btn">
              <i className="fa fa-save"></i> Save Workforce Plan
            </button>
          </div>
        </div>

        {/* Estimated Cost Section */}
        <div className="cost-summary">
          <h3>Estimated Average Workforce Cost Generation</h3>
          <div className="cost-cards">
            <div className="cost-card">
              <h4>Total Estimated Cost</h4>
              <p className="cost-value">Rs. 9,37,50,000</p>
            </div>
            <div className="cost-card">
              <h4>Weekly Cost</h4>
              <p className="cost-value">Rs. 78,12,525</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkforceManagement;
