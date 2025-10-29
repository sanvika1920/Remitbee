import React from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ search, setSearch }) => {
  return (
    <TextField
      fullWidth
      label="Search by name"
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      sx={{ marginBottom: 3 }}
    />
  );
};

export default SearchBar;
