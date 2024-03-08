import React from "react";
import "../deckbuilder/searchbar.css";

const SearchBar = ({ searchTerm, onSearchChange, onSearchClick }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Enter card name..."
        style={{ color: "black" }}
      />
      <button onClick={onSearchClick} style={{ color: "white", backgroundColor: "#007bff", border: "2px solid #007bff" }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
