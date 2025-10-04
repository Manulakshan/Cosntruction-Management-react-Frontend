import React, { useState } from "react";
import "./SupervisorsTable.css";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Sidebar from "../../components/Admin/Sidebar";
import { Link } from "react-router-dom";


const SupervisorsTable = () => {
  const [search, setSearch] = useState("");

  const supervisors = [
    {
      id: "SP-101",
      username: "jdoe",
      name: "John Doe",
      email: "john.doe@solidcore.io",
      status: "Active",
    },
    {
      id: "SP-102",
      username: "asmith",
      name: "Ava Smith",
      email: "ava.smith@solidcore.io",
      status: "Inactive",
    },
    {
      id: "SP-103",
      username: "rfernandez",
      name: "Rafael Fernandez",
      email: "rafael.f@solidcore.io",
      status: "Active",
    },
    {
      id: "SP-104",
      username: "lchoi",
      name: "Lina Choi",
      email: "lina.choi@solidcore.io",
      status: "Active",
    },
    {
      id: "SP-105",
      username: "mali",
      name: "Mahmud Ali",
      email: "mahmud.ali@solidcore.io",
      status: "Inactive",
    },
  ];

  const filtered = supervisors.filter(
    (s) =>
      s.id.toLowerCase().includes(search.toLowerCase()) ||
      s.username.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="supervisors-section">
      <Sidebar />
      <h2 className="section-title">Registered Supervisors Details</h2>

      <div className="table-actions">
        <Link to="/admin/supervisor/registration">
          <button className="btn-add">+ Add Supervisor</button>
        </Link>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Supervisor ID</th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((sup) => (
              <tr key={sup.id}>
                <td>{sup.id}</td>
                <td>{sup.username}</td>
                <td>{sup.name}</td>
                <td>{sup.email}</td>
                <td>
                  <span className={`status ${sup.status.toLowerCase()}`}>
                    {sup.status}
                  </span>
                </td>
                <td className="action-buttons">
                  <button className="btn-icon view">
                    <FaEye />
                  </button>
                  <button className="btn-icon edit">
                    <FaEdit />
                  </button>
                  <button className="btn-icon delete">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button>{"<<"}</button>
        <button>{"<"}</button>
        <button className="active">1</button>
        <button>2</button>
        <button>3</button>
        <button>{">"}</button>
        <button>{">>"}</button>
      </div>

      <p className="summary">Showing 1–5 of 42 supervisors</p>
    </div>
  );
};

export default SupervisorsTable;
