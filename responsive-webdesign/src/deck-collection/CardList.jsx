// CardList.js
import React from 'react';

const CardList = ({ cardList, onCardDragStart }) => {
  return (
    <div className="search-results" style={{ border: '4px solid black', borderRadius: '10px', padding: '10px', marginBottom: '20px' }}>
      <h2>Search Results</h2>
      <div className="card-list" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
        {cardList.map((card) => (
          <div
            key={card.id}
            className="card-item"
            draggable
            onDragStart={(e) => onCardDragStart(e, card)}
          >
            <h3>{card.name}</h3>
            <img src={card.card_images[0].image_url_small} alt={card.name} style={{ width: '150px', height: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardList;
