// SelectedCard.js
import React from "react";

const SelectedCard = ({ selectedCard, selectedCardDescription }) => {
  return (
    <div className="selected-card-container" style={{ color: "white" }}>
      <h2>{selectedCard ? selectedCard.name : "Selected Card"}</h2>
      {selectedCard && (
        <div className="main-card">
          <img
            src={selectedCard.card_images[0].image_url}
            alt={selectedCard.name}
            style={{ width: "400px", height: "auto" }}
          />
          {<p>{selectedCardDescription}</p>}
        </div>
      )}
    </div>
  );
};

export default SelectedCard;
