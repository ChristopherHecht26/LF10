// CardItem.js
import React from "react";

const CardItem = ({ card, onDragStart, setSelectedCard }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("cardId", card.id);
    onDragStart && onDragStart(e, card); // Ensure onDragStart is defined before calling it
  };

  return (
    <div
      className="card-item"
      onDragStart={(e) => handleDragStart(e)}
      draggable
      onClick={() => setSelectedCard(card)}
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
  );
};

export default CardItem;
