import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../slices/commentslice";
import { addNotification } from "../slices/notificationslice";
import { incrementCommentCount } from "../slices/postslice";

const CommentForm = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    dispatch(
      addComment({
        postId,
        userId: user?.id,
        name: user?.name || "You",
        email: user?.email || "you@example.com",
        body: text,
      })
    );
    dispatch(incrementCommentCount(postId));
    dispatch(addNotification("You commented on a post."));
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px", display: "flex", gap: "8px" }}>
      <input
        type="text"
        placeholder="Write a comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="input"
        style={{ marginBottom: 0, flex: 1 }}
      />
      <button type="submit" className="btn">Post</button>
    </form>
  );
};

export default CommentForm;