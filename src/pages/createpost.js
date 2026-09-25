import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost } from "../slices/postslice";

const CreatePost = () => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [formError, setFormError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.posts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!content) {
      setFormError("Post content is required.");
      return;
    }

    const result = await dispatch(
      addPost({
        title: content.slice(0, 20),
        body: content,
        image,
        userId: user?.id || 1,
      })
    );

    if (addPost.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <div className="form-box">
      <h2>Create Post</h2>

      {formError && <p className="error-text">{formError}</p>}
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="What's on your mind?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          className="input"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn" disabled={loading} style={{ width: "100%" }}>
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;