// src/Login.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import constructionImage from "./assets/construction.jpg";
import { FaUsers, FaChartLine, FaFolderOpen } from "react-icons/fa";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== "admin" || password !== "password") {
      setError("Incorrect Username or password!");
    } else {
      setError("");
      alert("Logged in successfully!");
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
            Login to manage your projects ,teams and resources with SolidConstruction. Our platform streamlines your workflow and ensures project success.
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

      <footer className="site-footer">
        <div className="footer-container">
          {/* About Us */}
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              SolidCore Constructions is a leading company in the construction
              industry, dedicated to providing high-quality services and
              innovative solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>123 Construction Ave, Colombo, Sri Lanka</p>
            <p>+94 11 234 5678</p>
            <p>
              <a href="mailto:info@solidcore.com">info@solidcore.com</a>
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} SolidCore Constructions. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Login;
