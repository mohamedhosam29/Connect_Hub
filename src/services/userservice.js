import api from "./api";

export const fetchUser = (id) => api.get(`/users/${id}`);
export const fetchAllUsers = () => api.get("/users");
export const fetchUserPosts = (id) => api.get(`/posts?userId=${id}`);