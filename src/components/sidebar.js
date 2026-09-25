import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ width: "220px",position: "sticky", top: "80px" }}>
      <div className="card" style={{ textAlign: "center" }}>
        <div
          className="avatar"
          style={{ width: "60px", height: "60px", fontSize: "24px", margin: "0 auto 10px auto" }}
        >
          {(user?.name || "U").charAt(0).toUpperCase()}
        </div>
        <strong>{user?.name || "User"}</strong>
        <div style={{ fontSize: "13px", color: "#888" }}>@{user?.username}</div>
      </div>

      <div className="card" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button className="btn btn-secondary" onClick={() => navigate("/home")}>Home</button>
        <button className="btn btn-secondary" onClick={() => navigate(`/profile/${user?.id}`)}>My Profile</button>
        <button className="btn btn-secondary" onClick={() => navigate("/search")}>Search</button>
        <button className="btn btn-secondary" onClick={() => navigate("/quotes")}>Quotes</button>
        <button className="btn btn-secondary" onClick={() => navigate("/notifications")}>Notifications</button>
      </div>
    </div>
  );
};

export default Sidebar;