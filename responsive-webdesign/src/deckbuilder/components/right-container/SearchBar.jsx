import React, { useState, useEffect } from "react";
import EditorSearchResults from './EditorSearchResults';

import '../../searchbar.css';

const SearchBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardList, setCardList] = useState([]);
  const [deck, setDeck] = useState([]);
  const [filter, setFilter] = useState({
    monster: true,
    spell: true,
    trap: true,
  });
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const fetchCards = async () => {
    try {
      if (searchTerm.length >= 3) {
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`
        );
        const data = await response.json();
        setCardList(data.data);
        handleSearchResults(data.data);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [searchTerm]);

  // Rest des Codes...

  return (
    <div className="deck-collection">
      {/* ... */}
      <EditorSearchResults searchResults={searchResults} />
    </div>
  );
};

export default SearchBar;
