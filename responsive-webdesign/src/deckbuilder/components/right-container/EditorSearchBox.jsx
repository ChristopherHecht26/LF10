import React, { useState, useEffect } from 'react';
import EditorFilters from './EditorFilters'; // Stelle sicher, dass du die EditorFilters-Komponente implementierst

const EditorSearchBox = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        if (searchTerm.length >= 3) {
          const response = await fetch(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`
          );
          const data = await response.json();
          onSearchResults(data.data); // Ergebnisse an die übergebene Funktion weitergeben
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, [searchTerm, onSearchResults]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="editor-search-box">
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Enter card name..."
      />
      <EditorFilters />
    </div>
  );
};

export default EditorSearchBox;
