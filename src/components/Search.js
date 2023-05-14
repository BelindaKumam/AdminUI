import { TextField } from "@mui/material";
import React, { useEffect } from "react";

const Search = ({
  searchText,
  setSearchText,
  users,
  setSearchNotFound,
  setFilteredUsers,
}) => {
  // Search
  useEffect(() => {
    // Return All user when there is no search text
    if (searchText.length === 0) {
      setFilteredUsers(users);
      setSearchNotFound(false);
    } else {
      // Will Return Search result based on search query
      const results = searchResults(searchText);
      if (results.length > 0) {
        setSearchNotFound(false);
        setFilteredUsers(results);
      } else {
        setSearchNotFound(true);
      }
    }
  }, [searchText]);

  // storing search text
  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // Name filter
  const searchByName = (name) => {
    return users.filter(
      (user) => user.name.toLowerCase() === name.toLowerCase()
    );
  };

  // Email Filter
  const searchByEmail = (email) => {
    return users.filter((user) => user.email === email);
  };

  // Role Filter
  const searchByRole = (role) => {
    return users.filter((user) => user.role === role);
  };

  // Search Functionality
  const searchResults = (searchText) => {
    const searchResultsByName = searchByName(searchText);
    const searchResultsByEmail = searchByEmail(searchText);
    const searchResultsByRole = searchByRole(searchText);

    if (searchResultsByName.length) {
      return searchResultsByName;
    } else if (searchResultsByEmail.length) {
      return searchResultsByEmail;
    } else {
      return searchResultsByRole;
    }
  };
  return (
    <>
      <TextField
        fullWidth
        label="Search"
        placeholder="Search by name, email or role"
        name="search"
        value={searchText}
        onChange={handleSearch}
      />
    </>
  );
};

export default Search;
