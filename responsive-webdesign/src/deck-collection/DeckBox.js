// DeckBox.js
import React from 'react';

const DeckBox = ({ deck, onDeckDrop, onDeckDragOver, onRemoveFromDeck }) => {
  return (
    <div className="deck-box" onDrop={onDeckDrop} onDragOver={onDeckDragOver} style={{ border: '4px solid black', borderRadius: '10px', padding: '10px' }}>
      <h2>Mein Deck</h2>
      <div className="deck-count" style={{ fontWeight: 'bold', fontSize: '24px' }}>Total Cards: {deck.reduce((acc, cur) => acc + cur.quantity, 0)}/60</div>
      <div
        className="deck-cards"
        onDrop={onDeckDrop}
        onDragOver={onDeckDragOver}
      >
        {deck.map((card, index) => (
          <div
            key={index}
            className="deck-card"
          >
            {[...Array(card.quantity)].map((_, i) => (
              <img
                key={i}
                src={card.card_images[0].image_url_small}
                alt={card.name}
                style={{ width: '150px', height: 'auto' }}
                onDragStart={(e) => onCardDragStart(e, card)}
                onDragEnd={() => onRemoveFromDeck(card.id)}
                draggable
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeckBox;
