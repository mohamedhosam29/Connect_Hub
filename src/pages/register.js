import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { register, loading, error, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!username || !email || !password || !confirmPassword) {
      setFormError("All fields are required.");
      return;
    }
    if (!email.includes("@") || !email.includes(".com")) {
      setFormError("Please enter a valid email.");
      return;
    }
    if (password.length < 8) {
      setFormError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    register(username, email, password);
  };

  return (
    <div className="form-box">
      <h2>Register</h2>

      {formError && <p className="error-text">{formError}</p>}
      {error && <p className="error-text">{error}</p>}
      {loading && <p className="spinner">Loading...</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <p className="link-muted" style={{ marginTop: "10px", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;