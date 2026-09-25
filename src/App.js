import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import CreatePost from "./pages/createpost";
import EditPost from "./pages/editpost";
import PostDetails from "./pages/postdetails";
import Quotes from "./pages/quotes";
import Profile from "./pages/profile";
import Search from "./pages/search";
import Notifications from "./pages/notifications";
import ProtectedRoute from "./routes/protected";

function App() {
  return (
    <BrowserRouter basename="/Connect_Hub">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-post"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-post/:id"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <PostDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quotes"
          element={
            <ProtectedRoute>
              <Quotes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;