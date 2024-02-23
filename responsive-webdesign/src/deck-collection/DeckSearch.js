// DeckSearch.js
import React from 'react';

const DeckSearch = ({ searchTerm, onSearchTermChange, onSearchButtonClick }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
        placeholder="Enter card name..."
      />
      <button onClick={onSearchButtonClick} style={{ fontSize: '16px' }}>
        Search
      </button>
    </div>
  );
};

export default DeckSearch;
