import React, { useState, useEffect } from "react";
import CardModal from "../card/CardModal"; // Aktualisieren Sie den Pfad hier
import "../deckbuilder/searchbar.css";

const SearchBar = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cardList, setCardList] = useState([]);
  const [deck, setDeck] = useState([]);
  const [filter, setFilter] = useState({
    monster: true,
    spell: true,
    trap: true,
    minATK: 0,
    maxATK: 4000,
    minDEF: 0,
    maxDEF: 4000,
    race: "",
    attribute: "",
    level: "",
  });
  const [races, setRaces] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    fetchRacesAndAttributes();
  }, []);

  const fetchRacesAndAttributes = async () => {
    try {
      const response = await fetch(
        "https://db.ygoprodeck.com/api/v7/cardinfo.php"
      );
      const data = await response.json();
      const racesSet = new Set();
      const attributesSet = new Set();
      const levelsSet = new Set();
      data.data.forEach((card) => {
        if (card.type.toLowerCase().includes("monster")) {
          racesSet.add(card.race);
          attributesSet.add(card.attribute);
          levelsSet.add(card.level);
        }
      });
      const racesArray = Array.from(racesSet);
      const attributesArray = Array.from(attributesSet);
      const levelsArray = Array.from(levelsSet).sort((a, b) => a - b); // Sortiere Level aufsteigend
      setRaces(racesArray);
      setAttributes(attributesArray);
      setLevels(levelsArray);
    } catch (error) {
      console.error("Error fetching races and attributes:", error);
    }
  };

  const fetchCards = async () => {
    try {
      if (searchTerm.length >= 3) {
        const response = await fetch(
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`
        );
        const data = await response.json();
        setCardList(data.data);
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [searchTerm]);

  const handleAddToDeck = (card) => {
    const existingCard = deck.find((c) => c.id === card.id);
    if (existingCard) {
      if (existingCard.quantity < 3) {
        setDeck([
          ...deck.filter((c) => c.id !== card.id),
          { ...card, quantity: existingCard.quantity + 1 },
        ]);
      } else {
        alert("Maximum 3 cards of the same type allowed");
      }
    } else {
      setDeck([...deck, { ...card, quantity: 1 }]);
    }
  };

  const handleRemoveFromDeck = (cardId) => {
    const updatedDeck = deck.map((card) => {
      if (card.id === cardId) {
        if (card.quantity > 1) {
          return { ...card, quantity: card.quantity - 1 };
        } else {
          // Wenn die Kartenmenge auf 1 fällt oder darunter, entfernen Sie die Karte aus dem Deck
          return null;
        }
      }
      return card;
    }).filter(Boolean); // Entfernen Sie null-Einträge aus dem aktualisierten Deck
    setDeck(updatedDeck);
  };

  const handleDragStart = (event, card) => {
    event.dataTransfer.setData("card", JSON.stringify(card));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const cardData = JSON.parse(event.dataTransfer.getData("card"));
    handleAddToDeck(cardData);
  };

  const handleRemoveCardFromDeck = (cardId) => {
    handleRemoveFromDeck(cardId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFilterChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFilter({ ...filter, [name]: checked });
    } else {
      setFilter({ ...filter, [name]: value });
    }
  };

  // Überprüfen Sie, ob cardList definiert ist, bevor Sie filteredCardList erstellen
  const filteredCardList = cardList && cardList.length > 0 ? cardList.filter((card) => {
    if (
      (filter.monster && card.type.toLowerCase().includes("monster")) ||
      (filter.spell && card.frameType === "spell") ||
      (filter.trap && card.frameType === "trap")
    ) {
      if (
        card.atk >= filter.minATK &&
        card.atk <= filter.maxATK &&
        card.def >= filter.minDEF &&
        card.def <= filter.maxDEF
      ) {
        if (
          (filter.race === "" || card.race === filter.race) &&
          (filter.attribute === "" || card.attribute === filter.attribute) &&
          (filter.level === "" || card.level === parseInt(filter.level))
        ) {
          return true;
        }
      }
    }
    return false;
  }) : [];

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter card name..."
          style={{ color: "black"}}
        />
        <button onClick={fetchCards} style={{ color: "white", backgroundColor: "#007bff", border: "2px solid #007bff" }}>Search</button>
      </div>
      <div className="filters-container" style={{ color: "white" }}>
        <div className="atk-def-filter">
          <label style={{ color: "white" }}>ATK Range:</label>
          <input
            type="number"
            name="minATK"
            value={filter.minATK}
            onChange={handleFilterChange}
            placeholder="Min"
          />
          <input
            type="number"
            name="maxATK"
            value={filter.maxATK}
            onChange={handleFilterChange}
            placeholder="Max"
          />
        </div>
        <div className="atk-def-filter">
          <label style={{ color: "white" }}>DEF Range:</label>
          <input
            type="number"
            name="minDEF"
            value={filter.minDEF}
            onChange={handleFilterChange}
            placeholder="Min"
          />
          <input
            type="number"
            name="maxDEF"
            value={filter.maxDEF}
            onChange={handleFilterChange}
            placeholder="Max"
          />
        </div>
        <div className="race-attribute-filter">
          <label style={{ color: "white" }}>Race:</label>
          <select
            name="race"
            value={filter.race}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {races.map((race, index) => (
              <option key={index} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>
        <div className="race-attribute-filter">
          <label style={{ color: "white" }}>Attribute:</label>
          <select
            name="attribute"
            value={filter.attribute}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {attributes.map((attribute, index) => (
              <option key={index} value={attribute}>
                {attribute}
              </option>
            ))}
          </select>
        </div>
        <div className="race-attribute-filter">
          <label style={{ color: "white" }}>Level:</label>
          <select
            name="level"
            value={filter.level}
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            {levels.map((level, index) => (
              <option key={index} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="main-container">
        <div className="selected-card-container" style={{ color: "white" }}>
          <h2>Selected Card</h2>
          {selectedCard && (
            <div className="main-card">
              <img
                src={selectedCard.card_images[0].image_url_small}
                alt={selectedCard.name}
                style={{ width: "600px", height: "auto" }} // Bildgröße erhöht
              />
            </div>
          )}
        </div>
        <div className="search-results-container" style={{ color: "white" }}>
          <h2>Search Results</h2>
          <div className="card-list">
            {filteredCardList.map((card) => (
              <div
                key={card.id}
                className="card-item"
                onDragStart={(e) => handleDragStart(e, card)}
                draggable
                onClick={() => setSelectedCard(card)}
              >
                <h3>{card.name}</h3>
                <img
                  src={card.card_images[0].image_url_small}
                  alt={card.name}
                  style={{ width: "150px", height: "auto" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="deck-container" onDrop={handleDrop} onDragOver={handleDragOver} style={{ color: "white" }}>
          
        <div className="deck-info" style={{ display: "flex", alignItems: "center" , justifyContent: "space-between"}}>
  <h2 style={{ marginRight: "24px" }}>My Deck</h2>
  <div className="deck-count">Total Cards: {deck.reduce((acc, cur) => acc + cur.quantity, 0)}/60</div>
</div>

          
          
          
     




          <div className="deck-box">
            <div className="deck-cards">
              {deck.map((card, index) => (
                <div
                  key={index}
                  className="deck-card"
                  draggable
                  onDragStart={(e) => handleDragStart(e, card)}
                  onDragEnd={() => handleRemoveCardFromDeck(card.id)}
                >
                  {[...Array(card.quantity)].map((_, i) => (
                    <img
                      key={i}
                      src={card.card_images[0].image_url_small}
                      alt={card.name}
                      style={{ width: "150px", height: "auto" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
