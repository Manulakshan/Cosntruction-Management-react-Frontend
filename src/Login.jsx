// src/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username !== 'admin' || password !== 'password') {
      setError('Incorrect Username or password!');
    } else {
      setError('');
      alert('Logged in successfully!');
    }
  };

  return (
    <div className="login-page">
      <main className="login-main">
        <section className="welcome-section">
          <h1>Welcome back</h1>
          <ul>
            <li>Only the admin and supervisors have permissions to log in.</li>
            <li>Supervisors must need a user account to log in.</li>
            <li>
              If you don't have a user account, please contact the admin: <br />
              <strong>+94 77 123 54567</strong>
            </li>
          </ul>
        </section>

        <section className="login-form-section">
          <h2>Login</h2>
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
              <label htmlFor="forgot">Forgot Password?</label>
            </div>

            <button type="submit" className="login-button">Log in</button>
          </form>

          <p className="support-text">
            Need help? <a href="#">Please contact support.</a>
          </p>
        </section>

        <section className="illustration-section">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995523.png"
            alt="Construction worker"
            className="illustration"
          />
        </section>
      </main>
    </div>
  );
}

export default Login;