import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeComment } from "../slices/commentslice";
import { decrementCommentCount } from "../slices/postslice";

const CommentList = () => {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.comments);
  const { user } = useSelector((state) => state.auth);

  if (loading) return <p className="spinner">Loading comments...</p>;
  if (comments.length === 0) return <p className="empty-text">No comments yet.</p>;

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id} style={{ borderTop: "1px solid #eee", padding: "10px 0" }}>
          <strong style={{ fontSize: "14px" }}>{comment.name || comment.email}</strong>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>{comment.body}</p>
          {comment.userId === user?.id && (
            <button
              className="social-action-btn danger"
              onClick={() => {
                dispatch(removeComment(comment.id));
                dispatch(decrementCommentCount(comment.postId));
              }}
            >
              Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentList;