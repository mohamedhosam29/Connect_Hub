import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getComments } from "../slices/commentslice";
import CommentList from "../components/commentlist";
import CommentForm from "../components/commentform";

const PostDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const post = useSelector((state) =>
    state.posts.posts.find((p) => p.id === Number(id))
  );

  useEffect(() => {
    dispatch(getComments(id));
  }, [dispatch, id]);

  if (!post) {
    return <p className="empty-text">Post not found.</p>;
  }

  return (
    <div className="page-container">
      <Link to="/home" className="link-muted">← Back to Feed</Link>

      <div className="card" style={{ marginTop: "15px" }}>
        <p style={{ margin: "0 0 10px 0" }}>{post.body}</p>
        {post.image && (
          <img
            src={post.image}
            alt="post"
            style={{ maxWidth: "100%", borderRadius: "10px" }}
          />
        )}
        <small style={{ color: "#888" }}>{post.createdAt}</small>
      </div>

      <div className="card">
        <h4 style={{ marginTop: 0 }}>Comments</h4>
        <CommentList />
        <CommentForm postId={Number(id)} />
      </div>
    </div>
  );
};

export default PostDetails;