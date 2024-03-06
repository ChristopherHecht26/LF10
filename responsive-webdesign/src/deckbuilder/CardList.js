// CardList.js
import React from "react";
import CardItem from "./CardItem";


const CardList = ({ filteredCardList, handleDragStart, setSelectedCard }) => {
  return (
    <div className="card-list">
      {filteredCardList.map((card) => (
        // Use CardItem component instead of directly rendering JSX
        <CardItem key={card.id} card={card} onDragStart={handleDragStart} setSelectedCard={setSelectedCard} />
      ))}
    </div>
  );
};

export default CardList;