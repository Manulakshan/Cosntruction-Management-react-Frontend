import React, { useState, useEffect } from "react";
import "./SupervisorsTable.css";
import { FaEye, FaEdit, FaTrash, FaSpinner, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Sidebar from "../../components/Admin/Sidebar";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SupervisorsTable = () => {
  const [search, setSearch] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchSupervisors = async () => {
      try {
        setLoading(true);
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        
        const response = await axios.get(
          `${apiUrl}/api/supRegister/supervisors`,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.data) {
          throw new Error('No data received from server');
        }
        
        // Ensure we have an array, even if the response is an object with a data property
        const supervisorsData = Array.isArray(response.data) 
          ? response.data 
          : response.data.data || [];
        
        setSupervisors(supervisorsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching supervisors:', err);
        const errorMessage = err.response?.data?.message || 
                           err.message || 
                           'Failed to load supervisors. Please try again later.';
        
        setError(errorMessage);
        toast.error('Failed to load supervisors');
      } finally {
        setLoading(false);
      }
    };

    fetchSupervisors();
  }, []);

  // Filter supervisors based on search
  const filtered = supervisors.filter(
    (s) =>
      s.supervisorId?.toLowerCase().includes(search.toLowerCase()) ||
      s.username?.toLowerCase().includes(search.toLowerCase()) ||
      (s.firstName + ' ' + s.lastName)?.toLowerCase().includes(search.toLowerCase()) ||
      s.recoveryEmail?.toLowerCase().includes(search.toLowerCase())
  );

  // Sort by most recent first (assuming there's a createdAt field)
  const sortedSupervisors = [...filtered].sort((a, b) => 
    new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );

  // Get current supervisors for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSupervisors = sortedSupervisors.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedSupervisors.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle delete supervisor
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this supervisor? This action cannot be undone.')) {
      return;
    }

    try {
      setIsDeleting(true);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      
      const response = await axios.delete(
        `${apiUrl}/api/supRegister/supervisors/${id}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        // Remove the deleted supervisor from the state
        setSupervisors(supervisors.filter(sup => sup._id !== id));
        toast.success('Supervisor deleted successfully');
      } else {
        throw new Error('Failed to delete supervisor');
      }
    } catch (err) {
      console.error('Error deleting supervisor:', err);
      toast.error('Failed to delete supervisor. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="supervisors-section">
      <Sidebar />
      <h2 className="section-title">Registered Supervisors Details</h2>

      <div className="table-actions">
        <Link to="/admin/supervisor/registration">
          <button className="btn-add">+ Add Supervisor</button>
        </Link>
      </div>

      {loading ? (
        <div className="loading-container">
          <FaSpinner className="spinner" />
          <p>Loading supervisors...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="btn-retry">
            Retry
          </button>
        </div>
      ) : (
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
              {currentSupervisors.length > 0 ? (
                currentSupervisors.map((sup) => (
                  <tr key={sup._id}>
                    <td>{sup.supervisorId}</td>
                    <td>{sup.username}</td>
                    <td>{sup.supervisorName}</td>
                    <td>{sup.recoveryEmail}</td>
                    <td>
                      <span className={`status ${sup.isActive ? 'active' : 'inactive'}`}>
                        {sup.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="action-buttons">
                      <button className="btn-icon view" title="View Details">
                        <FaEye />
                      </button>
                      <button className="btn-icon edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button 
                        className="btn-icon delete" 
                        title="Delete"
                        onClick={() => handleDelete(sup._id)}
                        disabled={isDeleting}
                      >
                        {isDeleting ? <FaSpinner className="spinner" /> : <FaTrash />}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">No supervisors found</td>
                </tr>
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          {sortedSupervisors.length > itemsPerPage && (
            <div className="pagination">
              <button 
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : currentPage)}
                disabled={currentPage === 1}
                className="pagination-button"
              >
                <FaChevronLeft />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`pagination-button ${currentPage === number ? 'active' : ''}`}
                >
                  {number}
                </button>
              ))}
              
              <button 
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : currentPage)}
                disabled={currentPage === totalPages}
                className="pagination-button"
              >
                <FaChevronRight />
              </button>
            </div>
          )}
          
          {!loading && !error && (
            <p className="summary">
              Showing {filtered.length} of {supervisors.length} supervisor{supervisors.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SupervisorsTable;
