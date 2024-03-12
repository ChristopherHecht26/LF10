import React, { useState, useEffect } from "react";
import "../deckbuilder/function.css";

const Function = () => {
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
  const [selectedCardDescription, setSelectedCardDescription] = useState("");
  const [selectedCardName, setSelectedCardName] = useState(""); // Zustand für den ausgewählten Kartenname
  const [deckName, setDeckName] = useState("");
  const [promptOpen, setPromptOpen] = useState(false);

  useEffect(() => {
    fetchRacesAndAttributes();
  }, []);

  useEffect(() => {
    document.title = "YuGiOh!";
  }, []);

  const handleCardSelection = (card) => {
    setSelectedCard(card);
    setSelectedCardName(card.name); // Aktualisiere den ausgewählten Kartenname
    fetchCardDescription(card.id);
  };

  useEffect(() => {
    if (selectedCard) {
      fetchCardDescription(selectedCard.id);
    }
  }, [selectedCard]);

  const fetchCardDescription = async (cardId) => {
  try {
    const response = await fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}&language=de`
    );
    const data = await response.json();
    const description = data.data[0].desc || "No description available.";
    setSelectedCardDescription(description);
    setSelectedCard({ ...selectedCard, name: data.data[0].name, image_url: null }); // Update selectedCard with new data
    // Überprüfen, ob die Karte Bilder hat
    if (data.data[0].card_images.length > 0) {
      const imageUrl = data.data[0].card_images[0].image_url;
      setSelectedCard((prevSelectedCard) => ({ ...prevSelectedCard, image_url: imageUrl }));
    }
  } catch (error) {
    console.error("Error fetching card description:", error);
  }
};

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
      const levelsArray = Array.from(levelsSet).sort((a, b) => a - b);
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
          `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(
            searchTerm
          )}&language=de`
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
      }
    } else {
      setDeck([...deck, { ...card, quantity: 1 }]);
    }
  };

  const handleOpenDeck = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.addEventListener("change", handleFileSelect);
    fileInput.click();
  };

  
  const handleRemoveFromDeck = (cardId) => {
    const updatedDeck = deck
      .map((card) => {
        if (card.id === cardId) {
          if (card.quantity > 1) {
            return { ...card, quantity: card.quantity - 1 };
          } else {
            return null;
          }
        }
        return card;
      })
      .filter(Boolean);
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

  const filteredCardList =
    cardList && cardList.length > 0
      ? cardList.filter((card) => {
          if (
            (filter.monster && card.type.toLowerCase().includes("monster")) ||
            (filter.spell && card.type.toLowerCase().includes("spell")) ||
            (filter.trap && card.type.toLowerCase().includes("trap"))
          ) {
            if (
              (card.type.toLowerCase().includes("monster") &&
                card.atk >= filter.minATK &&
                card.atk <= filter.maxATK &&
                card.def >= filter.minDEF &&
                card.def <= filter.maxDEF) ||
              !card.type.toLowerCase().includes("monster")
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
        })
      : [];

  const handleSelectCardInDeck = (card) => {
    setSelectedCard(card);
    setSelectedCardName(card.name); // Aktualisiere den ausgewählten Kartenname
  };

  const handleClearDeck = () => {
    setDeck([]);
  };

  const handleSaveDeck = () => {
    if (!promptOpen) {
      const deckName = prompt("Bitte geben Sie einen Namen für das Deck ein:");
      setDeckName(deckName);
      if (!deckName) {
        return;
      }
      setPromptOpen(true);
      saveDeck(deckName);
    }
  };
  
  const saveDeck = (deckName) => {
    const deckData = deck.map((card) => {
      const images = card.card_images || [{ image_url: card.image_url, image_url_small: card.image_url_small }];
      return {
        quantity: card.quantity,
        id: card.id,
        name: card.name, // Kartennamen hinzufügen
        description: card.description, // Kartendetails hinzufügen
        card_images: images.map(({ image_url, image_url_small }) => ({ image_url, image_url_small })),
      };
    });
    console.log("Deck Data:", deckData);
  
    const jsonData = JSON.stringify(deckData, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
  
    a.href = url;
    a.download = `${deckName}_deck.json`;
  
    const previousLink = document.querySelector("#download-link");
    if (previousLink) {
      document.body.removeChild(previousLink);
    }
  
    a.id = "download-link";
  
    a.click();
  
    URL.revokeObjectURL(url);
  };
  
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        try {
          const deckData = JSON.parse(e.target.result);
  
          if (Array.isArray(deckData)) {
            const cardsInDeck = deckData.map(({ id, quantity, name, description, card_images }) => ({
              id,
              quantity,
              name,
              description,
              card_images: [{ image_url_small: card_images[0].image_url_small }],
            }));
  
            setDeck(cardsInDeck);
            setDeckName(deckName);
          } else {
            console.error("Invalid deck format.");
          }
        } catch (error) {
          console.error("Error reading file:", error);
        }
      };
  
      reader.readAsText(file);
    }
  };
  
  return (
    <div>
      <div className="editor-menu-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px", color: "white", flexDirection: "column" }}>
        <h1>Editing Deck: {deckName}</h1>
        
        <div>
          <button onClick={handleClearDeck} className="editor-button" id="btnClear">Clear Deck</button>
          <button onClick={handleSaveDeck} className="editor-button" id="btnSave">Save Deck</button>
          <button onClick={handleOpenDeck} className="editor-button" id="btnOpen">Open Deck</button>
        </div>
      </div>

      <div className="search-bar-container">
        <div className="search-bar">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter card name..."
            style={{ color: "black" }}
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
        <h2>{selectedCardName ? selectedCardName : "Selected Card"}</h2>
        {selectedCard && (
          <div className="main-card">
            <img
              src={selectedCard.image_url || 'Standard-URL-hier'}
              alt={selectedCard.name}
              style={{ width: "400px", height: "auto" }}
              onClick={() => handleCardSelection(selectedCard)}                 
            />
            {<p>{selectedCardDescription}</p>}
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
                  onClick={() => handleCardSelection(card)}
                >
                  <div className="card-content">
                    <img
                      src={card.card_images[0].image_url_small}
                      alt={card.name}
                      className="template-picture editor-search-card"
                    />
                    <div className="template-info">
                      <p className="editor-search-description">
                        <span className="template-name">{card.name}</span><br />
                        {card.type.toLowerCase() === "monster" && (
                          <span className="template-if-monster">
                            <span className="template-attribute">{card.attribute}</span>/
                            <span className="template-race">{card.race}</span>{" "}
                            {card.level && <span className="fa fa-star template-if-not-link"></span>}{" "}
                            {card.level && <span className="template-level">{card.level}</span>}{" "}
                            <span className="template-atk">{card.atk}</span>/
                            <span className="template-def">{card.def}</span>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="deck-container" onDrop={handleDrop} onDragOver={handleDragOver} style={{ color: "white" }}>
        <div className="deck-info" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h2 style={{ marginRight: "24px" }}>My Deck</h2>
          <div className="deck-count">
            Total Cards: {deck.reduce((acc, cur) => acc + cur.quantity, 0)}/60
          </div>
        </div>
        <div className="deck-box">
              <div className="deck-cards">
                {deck.map((card, index) => (
                  Array.from({ length: card.quantity }, (_, i) => (
                    <div
                      key={`${card.id}-${i}`}
                      className="deck-card"
                      draggable
                      onDragStart={(e) => handleDragStart(e, card)}
                      onDragEnd={() => handleRemoveCardFromDeck(card.id)}
                      onClick={() => handleSelectCardInDeck(card)} // Hier wird der onClick-Handler hinzugefügt
                    >
                      {card.card_images && card.card_images.length > 0 && (
                        <img
                          src={card.card_images[0].image_url_small}
                          alt={card.name}
                          style={{ width: "85px", height: "auto", margin: "0px"  }}
                        />
                      )}
                    </div>
                  ))
                ))}
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Function;
