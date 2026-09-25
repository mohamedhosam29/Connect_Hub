import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUsers } from "../slices/userslice";
import useDebounce from "../hooks/useDebounce";
import SearchBar from "../components/searchbar";
import UserCard from "../components/usercard";
import LoadingSpinner from "../components/loadingspinner";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const filteredUsers = debouncedSearch
    ? allUsers.filter((u) =>
        u.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];

  return (
    <div className="page-container">
      <h2>Search Users</h2>

      <SearchBar
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search by name..."
      />

      {loading && <LoadingSpinner text="Loading users..." />}

      {!loading && debouncedSearch && filteredUsers.length === 0 && (
        <p className="empty-text">No users found.</p>
      )}

      {!debouncedSearch && (
        <p className="empty-text">Search for users.</p>
      )}

      {filteredUsers.map((u) => (
        <UserCard key={u.id} user={u} />
      ))}
    </div>
  );
};

export default Search;