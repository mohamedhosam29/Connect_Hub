import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth";
import { getPosts } from "../slices/postslice";
import { getAllUsers } from "../slices/userslice";
import PostCard from "../components/postcard";
import Sidebar from "../components/sidebar";

const Home = () => {
  const { user } = useAuth();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const { allUsers } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(getPosts());
    }
    if (allUsers.length === 0) {
      dispatch(getAllUsers());
    }
  }, [dispatch, posts.length, allUsers.length]);

  return (
    <div
      className="home-layout"
      style={{
        display: "flex",
        gap: "24px",
        maxWidth: "1100px",
        margin: "20px auto",
        padding: "0 20px",
        alignItems: "flex-start",
        justifyContent: "center",
      }}
    >
      <Sidebar />

      <div style={{ flex: 1, maxWidth: "600px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <h2 style={{ margin: 0 }}>Welcome, {user?.name || user?.username || "User"}!</h2>
          <Link to="/create-post">
            <Button variant="primary">Create Post</Button>
          </Link>
        </div>

        {loading && <p className="spinner">Loading posts...</p>}
        {error && <p className="error-text">{error}</p>}
        {!loading && posts.length === 0 && <p className="empty-text">No posts available.</p>}

        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;