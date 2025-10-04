import React, { useState } from "react";
import "./MaterialManagement.css";
import Sidebar from "../../components/Admin/Sidebar";
import "@fortawesome/fontawesome-free/css/all.min.css";

const MaterialManagement = () => {
  const [siteId, setSiteId] = useState("");
  const [cost, setCost] = useState(12500);

  // ===== TOP SECTION MATERIALS =====
  const requiredMaterials = [
    {
      id: 1,
      name: "Cement (1 Pack = 1U)",
      desc: "Building material for concrete and mortar",
      icon: "fa-cubes",
    },
    {
      id: 2,
      name: "Sand (1 Cube = 1U)",
      desc: "Fine aggregate for concrete and mortar",
      icon: "fa-mountain",
    },
    {
      id: 3,
      name: "Gravel (1 Cube = 1U)",
      desc: "Coarse aggregate for concrete",
      icon: "fa-triangle-exclamation",
    },
  ];

  const additionalMaterials = [
    {
      id: 4,
      name: "Paint (10 Liters = 1U)",
      desc: "Surface coating for protection and aesthetics",
      icon: "fa-paint-roller",
    },
    {
      id: 5,
      name: "Aluminium Door Units",
      desc: "Pre-fabricated door frames and panels",
      icon: "fa-door-closed",
    },
    {
      id: 6,
      name: "Glass Panel Units",
      desc: "Glass for windows and facades",
      icon: "fa-border-all",
    },
  ];

  // ===== MIDDLE MATERIAL GRID =====
  const midLeft = [
    { id: 1, icon: "fa-bolt", name: "Steel Bars (1 Stock = 1U)", desc: "Reinforcement for concrete structures" },
    { id: 2, icon: "fa-gift", name: "Bricks (1 Brick = 1U)", desc: "Building blocks for walls and structures" },
    { id: 3, icon: "fa-tree", name: "Timber (1 Stock = 1U)", desc: "Wood for formwork and structural elements" },
    { id: 4, icon: "fa-truck", name: "Readymix (1 Load = 1U)", desc: "Pre-mixed concrete delivered to site" },
  ];

  const midRight = [
    { id: 5, icon: "fa-border-all", name: "Tiles (100 pcs = 1U)", desc: "Floor and wall covering materials" },
    { id: 6, icon: "fa-wrench", name: "Nail/Screw (1 Stock = 1U)", desc: "Fasteners for joining materials" },
    { id: 7, icon: "fa-road", name: "Bitumen for Roads (1 Load = 1U)", desc: "Paving material for road construction" },
    { id: 8, icon: "fa-mountain", name: "Crushed Stone (1 Cube = 1U)", desc: "Aggregate for sub-base and drainage" },
  ];

  const generateCost = () => {
    const newCost = Math.floor(Math.random() * 40000) + 10000;
    setCost(newCost);
  };

  return (
    <div className="material-management">
      <Sidebar />
      <div className="material-container">
        {/* ===== HEADER ===== */}
        <div className="header-bar">
          <h2>Material Management</h2>
        </div>

        {/* ===== TOP SECTION ===== */}
        <div className="content-card">
          <h3 className="section-title">MATERIAL MANAGEMENT</h3>

          <div className="site-id-section">
            <label>SITE ID</label>
            <select value={siteId} onChange={(e) => setSiteId(e.target.value)}>
              <option value="">Select Site ID</option>
              <option value="S001">SITE-001</option>
              <option value="S002">SITE-002</option>
              <option value="S003">SITE-003</option>
            </select>
          </div>

          <div className="materials-section">
            {/* Required Materials */}
            <div className="materials-group">
              <h4>REQUIRED MATERIALS AND QUANTITY</h4>
              {requiredMaterials.map((item) => (
                <div key={item.id} className="material-item">
                  <div className="icon-circle">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="details">
                    <h5>{item.name}</h5>
                    <p>{item.desc}</p>
                  </div>
                  <input type="number" placeholder="Qty" />
                </div>
              ))}
            </div>

            {/* Additional Materials */}
            <div className="materials-group">
              <h4>ADDITIONAL MATERIALS</h4>
              {additionalMaterials.map((item) => (
                <div key={item.id} className="material-item">
                  <div className="icon-circle">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="details">
                    <h5>{item.name}</h5>
                    <p>{item.desc}</p>
                  </div>
                  <input type="number" placeholder="Qty" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== MIDDLE GRID SECTION ===== */}
        <div className="middle-section">
          <div className="middle-grid">
            <div className="material-group">
              {midLeft.map((item) => (
                <div className="material-card" key={item.id}>
                  <div className="icon-circle">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="material-info">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="qty-box">
                    <input type="number" placeholder="Qty" />
                    <span>U</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="material-group">
              {midRight.map((item) => (
                <div className="material-card" key={item.id}>
                  <div className="icon-circle">
                    <i className={`fa-solid ${item.icon}`}></i>
                  </div>
                  <div className="material-info">
                    <h4>{item.name}</h4>
                    <p>{item.desc}</p>
                  </div>
                  <div className="qty-box">
                    <input type="number" placeholder="Qty" />
                    <span>U</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== COST ESTIMATOR ===== */}
        <div className="cost-estimator">
          <h3>Material Cost Estimator</h3>
          <p>Select materials and enter quantities to generate an estimated cost.</p>

          <div className="cost-card">
            <div className="cost-info">
              <strong>Estimated Cost:</strong>
            </div>
            <div className="cost-display">
              <span className="cost-amount">
                ${cost.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
              <small>Last generated: 2023-10-27 10:30 AM</small>
            </div>
            <button className="generate-btn" onClick={generateCost}>
              <i className="fa-solid fa-calculator"></i> Generate Cost
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialManagement;
