import api from "./api";

export const fetchPosts = () => api.get("/posts?_limit=50");
export const fetchPost = (id) => api.get(`/posts/${id}`);
export const createPost = (data) => api.post("/posts", data);
export const updatePost = (id, data) => api.put(`/posts/${id}`, data);
export const deletePost = (id) => api.delete(`/posts/${id}`);