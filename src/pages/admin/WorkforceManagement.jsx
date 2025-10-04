import React, { useState } from "react";
import "./WorkforceManagement.css";
import Sidebar from "../../components/Admin/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";
const WorkforceManagement = () => {
  const [siteId, setSiteId] = useState("");

  return (
    <div className="workforce-management">
      <Sidebar />

      <div className="content">
        {/* ================= HEADER ================= */}
        <div className="header">
          <h2>WORKFORCE MANAGEMENT</h2>
          <div className="site-select">
            <label>Site ID</label>
            <select
              value={siteId}
              onChange={(e) => setSiteId(e.target.value)}
              className="site-dropdown"
            >
              <option value="">Select Site ID</option>
              <option value="S001">S001</option>
              <option value="S002">S002</option>
              <option value="S003">S003</option>
            </select>
          </div>
        </div>

        {/* ================= REQUIRED & ALLOCATION ================= */}
        <div className="workforce-content">
          {/* Required Workforce */}
          <div className="workforce-card">
            <h3>REQUIRED WORKFORCE</h3>

            <div className="role-item">
              <div className="role-icon light-bg">
                <i className="fa-solid fa-screwdriver-wrench"></i>
              </div>
              <div>
                <h4>Steel Fixer</h4>
                <p>Reinforcement steel tasks</p>
              </div>
            </div>

            <div className="role-item">
              <div className="role-icon light-bg">
                <i className="fa-solid fa-faucet"></i>
              </div>
              <div>
                <h4>Plumber</h4>
                <p>Pipe and water systems</p>
              </div>
            </div>

            <div className="role-item">
              <div className="role-icon light-bg">
                <i className="fa-solid fa-bolt-lightning"></i>
              </div>
              <div>
                <h4>Electrician</h4>
                <p>Electrical wiring and fixtures</p>
              </div>
            </div>

            <div className="role-item">
              <div className="role-icon light-bg">
                <i className="fa-solid fa-paint-roller"></i>
              </div>
              <div>
                <h4>Painter</h4>
                <p>Surface preparation and painting</p>
              </div>
            </div>
          </div>

          {/* Worker Allocation */}
          <div className="workforce-card">
            <h3>WORKER ALLOCATION</h3>

            <div className="input-group">
              <label>Steel Fixer</label>
              <input type="number" placeholder="Enter number of steel fixers" />
            </div>

            <div className="input-group">
              <label>Plumber</label>
              <input type="number" placeholder="Enter number of plumbers" />
            </div>

            <div className="input-group">
              <label>Electrician</label>
              <input
                type="number"
                placeholder="Enter number of electricians"
              />
            </div>

            <div className="input-group">
              <label>Painter</label>
              <input type="number" placeholder="Enter number of painters" />
            </div>
          </div>
        </div>

        {/* ================= ADDITIONAL WORKFORCE ================= */}
        <div className="workforce-content section-two">
          {/* Left Column */}
          <div className="workforce-card">
            <div className="role-item red-item">
              <div className="role-icon red-bg">
                <i className="fa-solid fa-border-all"></i>
              </div>
              <div>
                <h4>Tiler</h4>
                <p>Floor and wall tiling with precision and accuracy</p>
              </div>
            </div>

            <div className="role-item red-item">
              <div className="role-icon red-bg">
                <i className="fa-solid fa-wrench"></i>
              </div>
              <div>
                <h4>Welder</h4>
                <p>Metal joining, fabrication, and structural welding</p>
              </div>
            </div>

            <div className="role-item red-item">
              <div className="role-icon red-bg">
                <i className="fa-solid fa-truck-monster"></i>
              </div>
              <div>
                <h4>Heavy Machine Operators</h4>
                <p>Excavators, bulldozers, cranes, and heavy equipment</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="workforce-card">
            <div className="input-group">
              <label>Painter</label>
              <input type="number" placeholder="Enter number of painters" />
            </div>

            <div className="input-group">
              <label>Tiler</label>
              <input type="number" placeholder="Enter number of tilers" />
            </div>

            <div className="input-group">
              <label>Welder</label>
              <input type="number" placeholder="Enter number of welders" />
            </div>

            <div className="input-group">
              <label>Heavy Machine Operators</label>
              <input type="number" placeholder="Enter number of operators" />
            </div>

            <div className="input-group">
              <label className="duration-label">DURATION (WEEKS)</label>
              <div className="duration-field">
                <input type="number" value="12" readOnly />
                <span>WEEKS</span>
              </div>
            </div>

            <button className="save-btn">
              <i className="fa-solid fa-floppy-disk"></i> Save Workforce Plan
            </button>
          </div>
        </div>

        {/* ================= COST SECTION ================= */}
        <div className="cost-section">
          <h3>Estimated Average Workforce Cost Generation</h3>
          <div className="cost-grid">
            <div className="cost-card">
              <h4>Total Estimated Cost</h4>
              <p className="cost-value">Rs. 9,37,50,000</p>
            </div>
            <div className="cost-card">
              <h4>Cost Per Worker</h4>
              <p className="cost-value">Rs. 22,32,075</p>
            </div>
            <div className="cost-card">
              <h4>Weekly Cost</h4>
              <p className="cost-value">Rs. 78,12,525</p>
            </div>
          </div>

          <button className="generate-btn">
            <i className="fa-solid fa-sack-dollar"></i> Generate Cost Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkforceManagement;
