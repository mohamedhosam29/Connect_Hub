import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleLike, removePost } from "../slices/postslice";
import { addNotification } from "../slices/notificationslice";
import Modal from "./modal";

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allUsers } = useSelector((state) => state.users);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const isOwner = user?.id === post.userId;
  const postAuthor =
    post.userId === user?.id
      ? user
      : allUsers.find((u) => u.id === post.userId);

  const handleLike = useCallback(() => {
    dispatch(toggleLike(post.id));
    if (!post.liked) {
      dispatch(addNotification("You liked a post."));
    }
  }, [dispatch, post.id, post.liked]);

  const handleShare = useCallback(() => {
    navigator.clipboard.writeText(post.body);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [post.body]);

  const confirmDelete = () => {
    dispatch(removePost(post.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="card social-card">
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
        <div className="avatar" style={{ width: "40px", height: "40px", fontSize: "16px" }}>
          {(postAuthor?.name || "U").charAt(0).toUpperCase()}
        </div>
        <div style={{ flex: 1 }}>
          <Link to={`/profile/${post.userId}`} className="post-author-link">
            {postAuthor?.name || "User"}
          </Link>
          <div style={{ fontSize: "12px", color: "#888" }}>{post.createdAt}</div>
        </div>
      </div>

      <p style={{ margin: "0 0 10px 0" }}>{post.body}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          style={{ maxWidth: "100%", borderRadius: "10px", marginBottom: "10px", display: "block" }}
        />
      )}

      <div className="social-actions">
        <button
          className={`social-action-btn ${post.liked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {post.liked ? "Unlike" : "Like"} ({post.likeCount})
        </button>

        <Link to={`/posts/${post.id}`} className="social-action-btn">
          Comment ({post.commentCount})
        </Link>

        <button className="social-action-btn" onClick={handleShare}>
          {copied ? "Text copied!" : "Share"}
        </button>

        {isOwner && (
          <>
            <Link to={`/edit-post/${post.id}`} className="social-action-btn">
              Edit
            </Link>
            <button
              className="social-action-btn danger"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete
            </button>
          </>
        )}
      </div>

      {showDeleteModal && (
        <Modal
          title="Delete Post"
          message="Are you sure you want to delete this post? This cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default PostCard;