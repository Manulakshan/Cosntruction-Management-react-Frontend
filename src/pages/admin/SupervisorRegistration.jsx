import React from "react";
import { CheckCircle, XCircle, AlertCircle, Mail, Lock, User } from "lucide-react";
import "./SupervisorRegistration.css";
import Sidebar from "../../components/Admin/Sidebar";

function SupervisorRegistration() {
  const [formData, setFormData] = React.useState({
    supervisorId: "",
    supervisorName: "",
    username: "",
    password: "",
    confirmPassword: "",
    recoveryEmail: "",
  });

  const [passwordValidation, setPasswordValidation] = React.useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setFormData((prev) => ({ ...prev, password: pwd }));

    setPasswordValidation({
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      lowercase: /[a-z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.supervisorId ||
      !formData.supervisorName ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.recoveryEmail
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const payload = {
      supervisorId: formData.supervisorId,
      supervisorName: formData.supervisorName,
      username: formData.username,
      password: formData.password,
      recoveryEmail: formData.recoveryEmail,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/supRegister`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Account Created Successfully!");
        setFormData({
          supervisorId: "",
          supervisorName: "",
          username: "",
          password: "",
          confirmPassword: "",
          recoveryEmail: "",
        });
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      alert("Network error: " + err.message);
    }
  };

  const ValidationItem = ({ isValid, text }) => (
    <div className="validation-item">
      {isValid ? (
        <CheckCircle className="validation-icon valid" />
      ) : (
        <XCircle className="validation-icon invalid" />
      )}
      <span className={isValid ? "valid-text" : ""}>{text}</span>
    </div>
  );

  return (
    <div className="registration-container">
      <Sidebar />
      <h1 className="form-title">Supervisor Registration</h1>
      <p className="form-subtitle">Fill in the details to create a new supervisor account.</p>

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Supervisor ID *</label>
            <input
              type="text"
              name="supervisorId"
              placeholder="SP-001"
              value={formData.supervisorId}
              onChange={handleChange}
              className="form-input"
            />
            <small className="form-hint">Format: SP-XXX (3 digits)</small>
          </div>
          
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              name="supervisorName"
              placeholder="Enter supervisor's full name"
              value={formData.supervisorName}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </div>

        <label className="form-label">Username *</label>
        <input
          type="text"
          name="username"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          className="form-input"
        />
        <small className="form-hint">Must be 5–20 characters long</small>

        <label className="form-label">Password *</label>
        <input
          type="password"
          name="password"
          placeholder="Create a strong password"
          value={formData.password}
          onChange={handlePasswordChange}
          className="form-input"
        />

        <div className="validation-grid">
          <ValidationItem isValid={passwordValidation.length} text="At least 8 characters" />
          <ValidationItem isValid={passwordValidation.uppercase} text="One uppercase letter" />
          <ValidationItem isValid={passwordValidation.lowercase} text="One lowercase letter" />
          <ValidationItem isValid={passwordValidation.number} text="One number" />
          <ValidationItem isValid={passwordValidation.special} text="One special character (@, $, !, etc.)" />
        </div>

        <label className="form-label">Confirm Password *</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="form-input"
        />

        <label className="form-label">Recovery Email *</label>
        <input
          type="email"
          name="recoveryEmail"
          placeholder="Enter a valid recovery email"
          value={formData.recoveryEmail}
          onChange={handleChange}
          className="form-input"
        />

        <button type="submit" className="submit-button">
          Create Account
        </button>
      </form>

      <div className="guidelines-card">
        <h2 className="guidelines-title">Registration Guidelines</h2>
        <div className="guideline-item">
          <User className="icon" />
          <p>Supervisor ID must follow format: SP-XXX (3 digits)</p>
        </div>
        <div className="guideline-item">
          <Lock className="icon" />
          <p>Password must contain: 8+ chars, uppercase, lowercase, number, special character</p>
        </div>
        <div className="guideline-item">
          <Mail className="icon" />
          <p>Use an active, accessible recovery email.</p>
        </div>
        <div className="info-alert">
          <AlertCircle className="alert-icon" />
          <p>Account credentials will be sent to the recovery email after registration.</p>
        </div>
      </div>
    </div>
  );
}

export default SupervisorRegistration;
