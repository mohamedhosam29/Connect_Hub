import api from "./api";

export const fetchComments = (postId) => api.get(`/comments?postId=${postId}`);
export const createComment = (data) => api.post("/comments", data);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const fetchAllComments = () => api.get("/comments");