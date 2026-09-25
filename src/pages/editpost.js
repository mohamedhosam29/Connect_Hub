import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editPost } from "../slices/postslice";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === Number(id))
  );
  const { loading, error } = useSelector((state) => state.posts);

  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (post) {
      setContent(post.body);
      setImage(post.image || "");
    }
  }, [post]);

  if (!post) {
    return <p className="empty-text">Post not found.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      editPost({ id: post.id, data: { body: content, image } })
    );
    if (editPost.fulfilled.match(result)) {
      navigate("/home");
    }
  };

  return (
    <div className="form-box">
      <h2>Edit Post</h2>
      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <textarea
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
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;