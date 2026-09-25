import React from "react";

const ProfileHeader = ({ user, followerCount, followingCount, isOwnProfile, isFollowing, onFollowToggle }) => {
  return (
    <div className="card" style={{ textAlign: "center" }}>
      <div
        className="avatar"
        style={{ width: "80px", height: "80px", fontSize: "32px", margin: "0 auto" }}
      >
        {user.name?.charAt(0).toUpperCase()}
      </div>

      <h2 style={{ margin: "10px 0 0 0" }}>{user.name}</h2>
      <p style={{ color: "#666", margin: "0 0 5px 0" }}>@{user.username}</p>
      <p style={{ fontStyle: "italic", color: "#888" }}>No bio available.</p>
      <p>{user.email}</p>

      <div style={{ display: "flex", gap: "20px", justifyContent: "center", margin: "10px 0" }}>
        <span>Followers: {followerCount}</span>
        <span>Following: {followingCount}</span>
      </div>

      {!isOwnProfile && (
        <button className="btn" onClick={onFollowToggle}>
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default ProfileHeader;