import React, { useState } from "react";
import "./MaterialManagement.css";
import {
  FaCubes,
  FaPaintRoller,
  FaDoorClosed,
  FaThLarge,
  FaBars,
  FaGift,
  FaTree,
  FaTruck,
  FaHammer,
  FaRoad,
  FaMountain,
} from "react-icons/fa";

const MaterialManagement = () => {
  const [siteID, setSiteID] = useState("");
  const [notification, setNotification] = useState("");
  const [averageCost, setAverageCost] = useState(10850);

  const [materials, setMaterials] = useState({
    Cement: { qty: 0, active: false },
    Sand: { qty: 0, active: false },
    Gravel: { qty: 0, active: false },
    Paint: { qty: 0, active: false },
    "Aluminium Door Units": { qty: 0, active: false },
    "Glass Panel Units": { qty: 0, active: false },

    "Steel Bars": { qty: 0, active: false },
    Bricks: { qty: 0, active: false },
    Timber: { qty: 0, active: false },
    Readymix: { qty: 0, active: false },
    Tiles: { qty: 0, active: false },
    "Nails / Screws": { qty: 0, active: false },
    "Bitumen (Roads)": { qty: 0, active: false },
    "Crushed Stone": { qty: 0, active: false },
  });

  const handleToggle = (name) => {
    setMaterials({
      ...materials,
      [name]: { ...materials[name], active: !materials[name].active },
    });
  };

  const handleQtyChange = (name, value) => {
    if (!isNaN(value)) {
      setMaterials({
        ...materials,
        [name]: { ...materials[name], qty: parseInt(value) },
      });
    }
  };

  return (
    <div className="material-container">
      {/* HEADER */}
      <div className="header-section">
        <h2 className="header-title">MATERIAL MANAGEMENT</h2>
      </div>

      {/* SITE SELECTION */}
      <div className="site-section">
        <label htmlFor="site-id">SITE ID</label>
        <select
          id="site-id"
          value={siteID}
          onChange={(e) => setSiteID(e.target.value)}
        >
          <option value="">Select Site ID</option>
          <option value="S001">S001</option>
          <option value="S002">S002</option>
        </select>
      </div>

      {/* REQUIRED AND ADDITIONAL MATERIALS */}
      <div className="materials-section">
        <div className="materials-column">
          <h3 className="column-title">REQUIRED MATERIALS</h3>
          {[
            {
              name: "Cement",
              desc: "Building material for concrete and mortar",
              icon: <FaCubes />,
            },
            {
              name: "Sand",
              desc: "Fine aggregate for concrete and mortar",
              icon: <FaCubes />,
            },
            {
              name: "Gravel",
              desc: "Coarse aggregate for concrete",
              icon: <FaCubes />,
            },
          ].map((item) => (
            <div key={item.name} className="material-card">
              <div className="material-icon">{item.icon}</div>
              <div className="material-info">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="material-controls">
                <label>Qty</label>
                <input
                  type="number"
                  min="0"
                  value={materials[item.name].qty}
                  onChange={(e) => handleQtyChange(item.name, e.target.value)}
                />
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={materials[item.name].active}
                    onChange={() => handleToggle(item.name)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="materials-column">
          <h3 className="column-title">ADDITIONAL MATERIALS</h3>
          {[
            {
              name: "Paint",
              desc: "Surface coating for protection and aesthetics",
              icon: <FaPaintRoller />,
            },
            {
              name: "Aluminium Door Units",
              desc: "Pre-fabricated door frames and panels",
              icon: <FaDoorClosed />,
            },
            {
              name: "Glass Panel Units",
              desc: "Glass for windows and facades",
              icon: <FaThLarge />,
            },
          ].map((item) => (
            <div key={item.name} className="material-card">
              <div className="material-icon">{item.icon}</div>
              <div className="material-info">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="material-controls">
                <label>Qty</label>
                <input
                  type="number"
                  min="0"
                  value={materials[item.name].qty}
                  onChange={(e) => handleQtyChange(item.name, e.target.value)}
                />
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={materials[item.name].active}
                    onChange={() => handleToggle(item.name)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECOND CARD SECTION */}
      <div className="materials-section">
        <div className="materials-column">
          {[
            {
              name: "Steel Bars",
              desc: "Reinforcement for concrete structures",
              icon: <FaBars />,
            },
            {
              name: "Bricks",
              desc: "Building blocks for walls and structures",
              icon: <FaGift />,
            },
            {
              name: "Timber",
              desc: "Wood for formwork and structural elements",
              icon: <FaTree />,
            },
            {
              name: "Readymix",
              desc: "Pre-mixed concrete delivered to site",
              icon: <FaTruck />,
            },
          ].map((item) => (
            <div key={item.name} className="material-card">
              <div className="material-icon">{item.icon}</div>
              <div className="material-info">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="material-controls">
                <label>Qty</label>
                <input
                  type="number"
                  min="0"
                  value={materials[item.name].qty}
                  onChange={(e) => handleQtyChange(item.name, e.target.value)}
                />
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={materials[item.name].active}
                    onChange={() => handleToggle(item.name)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="materials-column">
          {[
            {
              name: "Tiles",
              desc: "Floor and wall covering materials",
              icon: <FaThLarge />,
            },
            {
              name: "Nails / Screws",
              desc: "Fasteners for joining materials",
              icon: <FaHammer />,
            },
            {
              name: "Bitumen (Roads)",
              desc: "Paving material for road construction",
              icon: <FaRoad />,
            },
            {
              name: "Crushed Stone",
              desc: "Aggregate for sub-base and drainage",
              icon: <FaMountain />,
            },
          ].map((item) => (
            <div key={item.name} className="material-card">
              <div className="material-icon">{item.icon}</div>
              <div className="material-info">
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="material-controls">
                <label>Qty</label>
                <input
                  type="number"
                  min="0"
                  value={materials[item.name].qty}
                  onChange={(e) => handleQtyChange(item.name, e.target.value)}
                />
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={materials[item.name].active}
                    onChange={() => handleToggle(item.name)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NOTIFICATION SECTION */}
      <div className="notification-section">
        <h3>Send Low Material Notification</h3>
        <p>
          Supervisors can alert administrators when materials are running low.
          Type details below and save.
        </p>
        <textarea
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          placeholder="Enter notification message..."
        />
        <button className="save-btn">
          <FaCubes /> Save Details
        </button>
      </div>

      {/* COST SECTION */}
      <div className="cost-section">
        <p>Select materials to generate an estimated cost.</p>
        <p className="subtext">
          Quantity box appears only when a material is toggled on. Values shown
          are placeholders.
        </p>
        <div className="cost-bar">
          Average material cost generated:{" "}
          <span>${averageCost.toLocaleString()}.00</span>
        </div>
        <input type="text" value="$ 12,500.00" readOnly className="cost-input" />
      </div>
    </div>
  );
};

export default MaterialManagement;
