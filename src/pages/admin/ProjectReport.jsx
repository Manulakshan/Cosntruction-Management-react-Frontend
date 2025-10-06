import React, { useState, useEffect } from "react";
import "./ProjectReport.css";
import Sidebar from "../../components/Admin/Sidebar";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ProjectReport = () => {
  const [sites, setSites] = useState([]);
  const [selectedSite, setSelectedSite] = useState("");

  useEffect(() => {
    // Fetch all sites
    const fetchSites = async () => {
      try {
        console.log('Fetching sites from API...');
        const response = await axios.get("http://localhost:3000/api/siteRegister/");
        console.log('API Response:', response);
        
        if (!response.data || !Array.isArray(response.data)) {
          console.error('Unexpected API response format:', response);
          return;
        }
        
        console.log('All sites:', response.data);
        
        // Sort all sites by creation date (newest first)
        const allSites = [...response.data]
          .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
        
        console.log('All sites:', allSites);
        setSites(allSites);
        
        // Set the first site as selected by default if available
        if (allSites.length > 0) {
          console.log('Setting selected site:', allSites[0]._id);
          setSelectedSite(allSites[0]._id);
        } else {
          console.log('No sites found in the response');
        }
      } catch (error) {
        console.error("Error fetching sites:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Error response data:', error.response.data);
          console.error('Error status:', error.response.status);
          console.error('Error headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
      }
    };

    fetchSites();
  }, []);

  // Find the currently selected site
  const selectedSiteData = sites.find(site => site._id === selectedSite) || {};

  // Format date to a readable string
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate project duration
  const getProjectDuration = (startDate, endDate) => {
    if (!startDate || !endDate) return 'N/A';
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const years = Math.floor(diffDays / 365);
    const months = Math.floor((diffDays % 365) / 30);
    const days = diffDays % 30;
    
    let duration = [];
    if (years > 0) duration.push(`${years} year${years > 1 ? 's' : ''}`);
    if (months > 0) duration.push(`${months} month${months > 1 ? 's' : ''}`);
    if (days > 0 || duration.length === 0) duration.push(`${days} day${days !== 1 ? 's' : ''}`);
    
    return duration.join(', ');
  };

  const handleSiteChange = (e) => {
    setSelectedSite(e.target.value);
  };
  // ===== Workers Distribution Data =====
  const workerData = [
    { name: "Laborers", value: 400 },
    { name: "Masons", value: 250 },
    { name: "Carpenters", value: 150 },
    { name: "Plumbers", value: 100 },
    { name: "Electricians", value: 80 },
    { name: "Supervisors", value: 70 },
  ];

  const workerColors = [
    "#f8c8dc",
    "#c6d3ff",
    "#a8caff",
    "#9cf2ff",
    "#8ff2e5",
    "#7ff5cf",
  ];

  // ===== Materials Data =====
  const materialData = [
    { name: "Cement", quantity: 9800 },
    { name: "Steel Bars", quantity: 6900 },
    { name: "Bricks", quantity: 7900 },
    { name: "Sand", quantity: 6400 },
    { name: "Gravel", quantity: 5400 },
    { name: "Timber", quantity: 4600 },
    { name: "Readymix", quantity: 3500 },
  ];

  return (
    <div className="project-report-page">
      <Sidebar />

      <div className="project-report-container">
        {/* ===== HEADER ===== */}
        <div className="project-header">
          <h2>PROJECT REPORT</h2>
          <div className="site-select">
            <label htmlFor="site-id">Site ID</label>
            <select 
              id="site-id" 
              className="site-dropdown"
              value={selectedSite}
              onChange={handleSiteChange}
            >
              {sites.length > 0 ? (
                sites.map((site) => (
                  <option key={site._id} value={site._id}>
                    {site['SITE ID'] || `Site ${site._id.substring(0, 6)}...`}
                  </option>
                ))
              ) : (
                <option value="">No sites available</option>
              )}
            </select>
          </div>
        </div>

        {/* ===== PROJECT SUMMARY ===== */}
        <div className="project-summary">
          <h3>PROJECT SUMMARY</h3>
          <div className="summary-grid">
            <div className="summary-card">
              <h4>Site Name</h4>
              <p>{selectedSiteData['SITE NAME'] || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Site Type</h4>
              <p>{selectedSiteData['SITE TYPE'] || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Location</h4>
              <p>{selectedSiteData.LOCATION || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Client Name</h4>
              <p>{selectedSiteData['CLIENT NAME'] || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Client Contact No</h4>
              <p>{selectedSiteData['CLIENT CONTACT NO'] || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Assigned Supervisor</h4>
              <p>{selectedSiteData['SUPERVISOR NAME'] || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Supervisor ID</h4>
              <p>{selectedSiteData['SUPERVISOR ID'] || 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Project Scale</h4>
              <p>{selectedSiteData['PROJECT SCALE'] ? `${selectedSiteData['PROJECT SCALE']} sq.ft` : 'N/A'}</p>
            </div>
            <div className="summary-card">
              <h4>Project Duration</h4>
              <p>{getProjectDuration(selectedSiteData['PROJECT START DATE'], selectedSiteData['PROJECT END DATE'])}</p>
            </div>
            <div className="summary-card">
              <h4>Start Date</h4>
              <p>{formatDate(selectedSiteData['PROJECT START DATE'])}</p>
            </div>
            <div className="summary-card">
              <h4>End Date</h4>
              <p>{formatDate(selectedSiteData['PROJECT END DATE'])}</p>
            </div>
          </div>
        </div>

        {/* ===== SCROLL-DOWN CHARTS SECTION ===== */}
        <div className="charts-section">
          {/* Workers Pie Chart */}
          <div className="chart-card">
            <h3>Workers Distribution</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={workerData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                >
                  {workerData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={workerColors[index % workerColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Materials Bar Chart */}
          <div className="chart-card">
            <h3>Materials</h3>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={materialData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="quantity"
                  radius={[8, 8, 0, 0]}
                  fill="#6d0e0e"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectReport;
