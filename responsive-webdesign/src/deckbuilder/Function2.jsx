import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Filters from "./Filters";
import CardList from "./CardList";
import SelectedCard from "./SelectedCard";
import DeckDisplay from "./DeckDisplay";
import "../deckbuilder/searchbar.css";
import "./global.css";
import "./searchbar.css";
import "./cards.css";
import "./deck.css";
import "./filters.css";
import "./selectedcard.css";
import "./maincontainer.css";

const Function2 = () => {
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
    
  
    useEffect(() => {
      fetchRacesAndAttributes();
    }, []);
  
  
  
  
    useEffect(() => {
      document.title = "YuGiOh!"; // Setze den Seitennamen
    }, []);
  
    const handleCardSelection = (card) => {
      setSelectedCard(card);
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
            `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(searchTerm)}&language=de`
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
        (filter.spell && card.type.toLowerCase().includes("spell")) ||
        (filter.trap && card.type.toLowerCase().includes("trap"))
      ) {
        if (
          (card.type.toLowerCase().includes("monster") &&
            card.atk >= filter.minATK &&
            card.atk <= filter.maxATK &&
            card.def >= filter.minDEF &&
            card.def <= filter.maxDEF) ||
          (!card.type.toLowerCase().includes("monster"))
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
  
    const handleSelectCardInDeck = (card) => {
      setSelectedCard(card);
    };
  
    const handleClearDeck = () => {
      // Logik zum Löschen des Decks hier implementieren
      setDeck([]);
    };
  
    const handleSaveDeck = () => {
      // Logik zum Speichern der Deck-IDs hier implementieren
      const deckIds = deck.map((card) => card.id);
      console.log("Deck IDs:", deckIds);
      // Hier können Sie die Deck-IDs weiterverarbeiten, z. B. in einer Datenbank speichern
    };

    return (
        <div>
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onSearchClick={fetchCards} />
          <Filters filter={filter} races={races} attributes={attributes} levels={levels} onFilterChange={handleFilterChange} />
          <CardList filteredCardList={filteredCardList} onCardSelect={handleCardSelection} onDragStart={handleDragStart} />
          <SelectedCard selectedCard={selectedCard} selectedCardDescription={selectedCardDescription} onCardSelection={handleCardSelection} />
          <DeckDisplay deck={deck} onDragStart={handleDragStart} onRemoveCardFromDeck={handleRemoveCardFromDeck} onSelectCardInDeck={handleSelectCardInDeck} />
        </div>
      );
    };
    
    export default Function2;