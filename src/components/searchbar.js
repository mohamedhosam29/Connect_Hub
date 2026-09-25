import React from "react";

const SearchBar = ({ value, onChange}) => {
  return (
    <input
      type="text"
      className="input"
      placeholder="Search..."
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchBar;