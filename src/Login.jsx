// src/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import constructionImage from "./assets/construction.jpg";
import { FaUsers, FaChartLine, FaFolderOpen } from "react-icons/fa";
import Footer from "./components/Footer";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Admin login
    if (username === "admin" && password === "admin123") {
      setError("");
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'admin');
      navigate('/admin/dashboard');
    } 
    // Supervisor login
    else if (username === "supervisor" && password === "super123") {
      setError("");
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userRole', 'supervisor');
      navigate('/supervisor/dashboard');
    } 
    // Invalid credentials
    else {
      setError("Incorrect username or password!");
    }
  };

  return (
    <div className="login-page">
      <div className="construction-banner">
        <img
          src={constructionImage}
          alt="Construction in Progress"
          className="construction-image"
        />
      </div>
      <main className="login-main">
        <section className="welcome-section">
          <h1>
            Building The Future, <span className="highlight">Together.</span>
          </h1>
          <h2>
            Login to manage your projects, teams and resources with SolidConstruction. Our platform streamlines your workflow and ensures project success.
          </h2>
          <ul>
            <li>
              <FaUsers className="icon" /> Collaborate with your team seamlessly
            </li>
            <li>
              <FaChartLine className="icon" /> Track project progress in
              real-time
            </li>
            <li>
              <FaFolderOpen className="icon" /> Access all your documents and
              resources
            </li>
          </ul>
        </section>

        <section className="login-form-section">
          <h2>Welcome back</h2>
          <form onSubmit={handleLogin}>
            <label htmlFor="username">User Name or Email Address</label>
            <input
              id="username"
              type="text"
              placeholder="User Name or Email Address"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="forgot-checkbox">
              <input type="checkbox" id="forgot" />
              <label htmlFor="forgot">Remember Me</label>
            </div>

            <button type="submit" className="login-button">
              Log in
            </button>
          </form>

          <p className="support-text">
            Need help? <a href="#">Please contact support.</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Login;
