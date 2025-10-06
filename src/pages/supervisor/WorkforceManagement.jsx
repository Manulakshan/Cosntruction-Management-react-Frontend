import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../config/api";
import "./WorkforceManagement.css";

const WorkforceManagement = () => {
  const [workforce, setWorkforce] = useState({
    mason: false,
    helper: false,
    carpenter: false,
    steelFixer: false,
    plumber: false,
    electrician: true,
    painter: true,
    tiler: false,
    welder: false,
    heavyMachine: true,
  });

  const [workerCount, setWorkerCount] = useState({});
  const [siteId, setSiteId] = useState("");
  const [sites, setSites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [costData, setCostData] = useState({
    totalEstimatedCost: 0,
    costPerWeek: 0
  });

  // Use the API URL from config
  const API_BASE_URL = API_URL;

  // Fetch sites when component mounts
  useEffect(() => {
    const fetchSites = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/siteRegister`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        setSites(response.data);
      } catch (err) {
        console.error('Error fetching sites:', err);
        setError('Failed to load sites. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchSites();
  }, [API_BASE_URL]);

  const handleToggle = (role) => {
    setWorkforce({ ...workforce, [role]: !workforce[role] });
  };

  const workforceRoles = [
    { key: "mason", name: "Mason (Bricklayer)", desc: "Building construction using bricks and stones" },
    { key: "helper", name: "Helper / Labourer", desc: "General labor and support roles" },
    { key: "carpenter", name: "Carpenter", desc: "Woodworking and construction of wooden structures" },
    { key: "steelFixer", name: "Steel Fixer", desc: "Fixing and assembling steel structures" },
    { key: "plumber", name: "Plumber", desc: "Installation and maintenance of plumbing systems" },
  ];
  const workforceRoles2 = [
    { key: "electrician", name: "Electrician", desc: "Electrical installation and repair" },
    { key: "painter", name: "Painter", desc: "Interior and exterior painting" },
    { key: "tiler", name: "Tiler", desc: "Floor and wall tiling with precision" },
    { key: "welder", name: "Welder", desc: "Metal joining and fabrication" },
    { key: "heavyMachine", name: "Heavy Machine Operators", desc: "Excavators, cranes, heavy equipment" },
  ];

  const roleMap = {
    mason: "Mason (Bricklayer)",
    helper: "Helper / Labourer",
    carpenter: "Carpenter",
    steelFixer: "Steel Fixer",
    plumber: "Plumber",
    electrician: "Electrician",
    painter: "Painter",
    tiler: "Tiler",
    welder: "Welder",
  };

  const handleSave = async () => {
    if (!siteId) {
      alert("⚠️ Please select a site first!");
      return;
    }

    // Ensure all selected roles have a valid worker amount (at least 1)
    const selectedRoles = Object.entries(workforce)
      .filter(([_, selected]) => selected)
      .map(([key]) => {
        // Ensure workerAmount is a positive number, default to 1 if invalid
        const amount = parseInt(workerCount[key], 10);
        const workerAmount = isNaN(amount) || amount < 1 ? 1 : amount;
        
        // Map the role key to the full role name that matches the backend
        const roleName = roleMap[key] || key;
        
        return {
          role: roleName, // Use the mapped role name
          workerAmount,
          selected: true,
          durationWeeks: 4 // Adding default duration as required by the backend
        };
      });

    if (selectedRoles.length === 0) {
      alert("⚠️ Please select at least one workforce role!");
      return;
    }

    try {
      console.log('Sending request with:', { siteId, selectedRoles });
      const res = await axios.post(
        `${API_BASE_URL}/workforce/assign`,
        {
          siteId,
          workforce: selectedRoles
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      console.log(res.data);
      // Update cost data from backend response
      if (res.data.workforce) {
        setCostData({
          totalEstimatedCost: res.data.workforce.totalEstimatedCost || 0,
          costPerWeek: res.data.workforce.costPerWeek || 0
        });
      }
      alert("✅ Workforce plan saved successfully!");
    } catch (error) {
      console.error("Error saving workforce plan:", error);
      alert(`❌ Failed to save workforce plan: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="wm-main-container">
      {/* Site Selection */}
      <div className="site-selection">
        <h3>Select Site</h3>
        {loading ? (
          <p>Loading sites...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : (
          <select 
            value={siteId} 
            onChange={(e) => setSiteId(e.target.value)}
            className="site-dropdown"
          >
            <option value="">-- Select a site --</option>
            {sites.map((site) => (
              <option key={site._id} value={site['SITE ID']}>
                {site['SITE NAME']} (ID: {site['SITE ID']})
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Sticky Header */}
      <div className="wm-header">
        <div className="header-left">
          <button className="tab active">
            <i className="fa fa-briefcase"></i> WORKFORCE MANAGEMENT
          </button>
        </div>
        <div className="header-right">
          {/* Site selection has been moved to the top of the page */}
        </div>
      </div>

      <div className="wm-scrollable-content">
        <div className="wm-content">
          {/* Left Column - Workforce Sections */}
          <div className="workforce-column">
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

            {/* Additional Workforce */}
            <div className="workforce-section">
              <h3>ADDITIONAL WORKFORCE</h3>
              {workforceRoles2.map((role) => (
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
          </div>

          {/* Right Column - Worker Allocation */}
          <div className="allocation-section">
            <h3>WORKER ALLOCATION</h3>
            {[...workforceRoles, ...workforceRoles2].map((role) => (
              <div className="allocation-field" key={role.key}>
                <label>{role.name}</label>
                <input
                  type="number"
                  placeholder={`Enter number of ${role.name.toLowerCase()}s`}
                  disabled={!workforce[role.key]}
                  onChange={(e) =>
                    setWorkerCount({ ...workerCount, [role.key]: e.target.value })
                  }
                />
              </div>
            ))}

            <button className="save-btn" onClick={handleSave}>
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
              <p className="cost-value">Rs. {costData.totalEstimatedCost.toLocaleString('en-IN')}</p>
            </div>
            <div className="cost-card">
              <h4>Weekly Cost</h4>
              <p className="cost-value">Rs. {costData.costPerWeek.toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkforceManagement;
