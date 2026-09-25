import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { useTheme } from "../components/themetoggle";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { unreadCount } = useSelector((state) => state.notifications);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="app-navbar">
      <Link to="/home" className="navbar-header">ConnectHub</Link>
      <div className="navbar-links">
        <Link to="/home">Feed</Link>
        <Link to="/search">Search</Link>
        <Link to="/quotes">Quotes</Link>
        <Link to="/notifications">
          Notifications
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </Link>
        {user && <Link to={`/profile/${user.id}`}>My Profile</Link>}

        <button className="theme-btn" onClick={toggleTheme}>
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;