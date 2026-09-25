import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Navbar from "../components/navbar";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default ProtectedRoute;