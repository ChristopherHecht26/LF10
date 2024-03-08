// DeckDisplay.js
import React from "react";

const DeckDisplay = ({ deck, handleDragStart, handleRemoveCardFromDeck, handleSelectCardInDeck }) => {

  const handleDrop = (e) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData("cardId");
    // Perform the necessary actions when a card is dropped onto the deck
    // For example, you can add the card to the deck state
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  
  
  
  return (
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
            <div
              key={index}
              className="deck-card"
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
              onDragEnd={() => handleRemoveCardFromDeck(card.id)}
              onClick={() => handleSelectCardInDeck(card)}
            >
              {[...Array(card.quantity)].map((_, i) => (
                <img
                  key={i}
                  src={card.card_images[0].image_url_small}
                  alt={card.name}
                  style={{ width: "55px", height: "auto", margin: "0px" }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeckDisplay;
