import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="card" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div className="avatar" style={{ width: "40px", height: "40px", fontSize: "16px" }}>
        {(user.name || "U").charAt(0).toUpperCase()}
      </div>
      <div>
        <Link to={`/profile/${user.id}`} className="post-author-link">
          {user.name}
        </Link>
        <div style={{ fontSize: "13px", color: "#888" }}>@{user.username}</div>
      </div>
    </div>
  );
};

export default UserCard;