import React, { useState } from "react";
import axios from "axios";
import API_URL from "../../config/api";
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
  const [sites, setSites] = useState([]);
  const [notification, setNotification] = useState("");
  const [averageCost, setAverageCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sitesLoading, setSitesLoading] = useState(true);

  // Fetch sites on component mount
  React.useEffect(() => {
    const fetchSites = async () => {
      try {
        console.log('Fetching sites from:', `${API_URL}/siteRegister`);
        const response = await axios.get(`${API_URL}/siteRegister`);
        console.log('Sites response:', response.data);
        if (response.data && Array.isArray(response.data)) {
          setSites(response.data);
        }
      } catch (error) {
        console.error('Error fetching sites:', error);
        setNotification('Failed to load sites. Please try again later.');
      } finally {
        setSitesLoading(false);
      }
    };

    fetchSites();
  }, []);

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
      const qty = parseInt(value) < 0 ? 0 : parseInt(value);
      setMaterials({
        ...materials,
        [name]: { ...materials[name], qty },
      });
    }
  };

  const handleSave = async () => {
    if (!siteID) {
      alert("Please select a site ID first!");
      return;
    }

    try {
      setLoading(true);
      
      // Format materials data for the backend
      const requiredMaterials = [
        { name: "Cement", quantity: materials["Cement"].qty },
        { name: "Sand", quantity: materials["Sand"].qty },
        { name: "Gravel", quantity: materials["Gravel"].qty },
        { name: "Bricks", quantity: materials["Bricks"].qty },
        { name: "Steel Bars", quantity: materials["Steel Bars"].qty },
        { name: "Timber", quantity: materials["Timber"].qty },
        { name: "Ready-mix Concrete", quantity: materials["Readymix"].qty },
      ].filter(item => item.quantity > 0);

      const additionalMaterials = [
        { name: "Paint", quantity: materials["Paint"].qty },
        { name: "Aluminium Door Unit", quantity: materials["Aluminium Door Units"].qty },
        { name: "Glass Panel Unit", quantity: materials["Glass Panel Units"].qty },
        { name: "Tiles", quantity: materials["Tiles"].qty },
        { name: "Nails / Screws", quantity: materials["Nails / Screws"].qty },
        { name: "Bitumen", quantity: materials["Bitumen (Roads)"].qty },
        { name: "Crushed Stone", quantity: materials["Crushed Stone"].qty },
      ].filter(item => item.quantity > 0);

      console.log('Sending request with siteID:', siteID);
      console.log('Required materials:', requiredMaterials);
      console.log('Additional materials:', additionalMaterials);
      
      const response = await axios.post(
        `${API_URL}/material/assign`,
        {
          siteId: siteID,
          requiredMaterials,
          additionalMaterials
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      // Update the average cost from the backend response
      if (response.data.material?.estimatedAverageCost) {
        setAverageCost(response.data.material.estimatedAverageCost);
      }

      alert("Materials saved successfully!");
    } catch (error) {
      console.error("Error saving materials:", error);
      alert(`Failed to save materials: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="material-container">
      {/* HEADER */}
      <div className="header-section">
        <h2 className="header-title">MATERIAL MANAGEMENT</h2>
      </div>

      {/* SITE SELECTION */}
      <div className="site-selection">
        <label htmlFor="site-id">SITE ID</label>
        <select
          id="site-id"
          value={siteID}
          onChange={(e) => setSiteID(e.target.value)}
          disabled={sitesLoading}
        >
          <option value="">Select Site ID</option>
          {sites.map((site) => (
            <option key={site['SITE ID']} value={site['SITE ID']}>
              {site['SITE ID']} - {site['SITE NAME']}
            </option>
          ))}
          {sites.length === 0 && !sitesLoading && (
            <option value="" disabled>No sites available</option>
          )}
          {sitesLoading && (
            <option value="" disabled>Loading sites...</option>
          )}
        </select>
      </div>

      {/* MATERIALS SECTION */}
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
        <button className="save-btn" onClick={handleSave} disabled={loading}>
          <FaCubes /> {loading ? 'Saving...' : 'Save Details'}
        </button>
      </div>

      {/* COST SECTION */}
      <div className="cost-section">
        <p>Material Cost Summary</p>
        <p className="subtext">
          The estimated cost is calculated based on the quantities you've entered.
        </p>
        <div className="cost-bar">
          Total Estimated Material Cost:{" "}
          <span>₹{averageCost.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default MaterialManagement;
