import React from "react";
import "./ProjectReport.css";
import Sidebar from "../../components/Admin/Sidebar";
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
            <select id="site-id" className="site-dropdown">
              <option value="S1TF4503">Select: S1TF4503</option>
            </select>
          </div>
        </div>

        {/* ===== PROJECT SUMMARY ===== */}
        <div className="project-summary">
          <h3>PROJECT SUMMARY</h3>
          <div className="summary-grid">
            <div className="summary-card">
              <h4>Site Name</h4>
              <p>PVR Cinema Complex</p>
            </div>
            <div className="summary-card">
              <h4>Site Type</h4>
              <p>Building Construction</p>
            </div>
            <div className="summary-card">
              <h4>Location</h4>
              <p>Rajagiriya</p>
            </div>
            <div className="summary-card">
              <h4>Client Name</h4>
              <p>Mr. Pranitha Balasooriya</p>
            </div>
            <div className="summary-card">
              <h4>Client Contact No</h4>
              <p>0774357821</p>
            </div>
            <div className="summary-card">
              <h4>Assigned Supervisor</h4>
              <p>Mr. Kamal Gamage</p>
            </div>
            <div className="summary-card">
              <h4>Supervisor ID</h4>
              <p>S0001</p>
            </div>
            <div className="summary-card">
              <h4>Project Type</h4>
              <p>Large Scale</p>
            </div>
            <div className="summary-card">
              <h4>Project Duration</h4>
              <p>1 Year</p>
            </div>
            <div className="summary-card">
              <h4>Estimated Labour Cost</h4>
              <p>10.5 M</p>
            </div>
            <div className="summary-card">
              <h4>Estimated Material Cost</h4>
              <p>30.2 M</p>
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
