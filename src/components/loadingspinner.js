import React from "react";

const LoadingSpinner = ({ text = "Loading..." }) => {
  return (
  <p className="spinner">{text}</p>
)};

export default LoadingSpinner;