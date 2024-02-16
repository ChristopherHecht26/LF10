import React, { useState, useEffect } from 'react';
import '../deck-collection/deckcollection.css';

const DeckCollection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cardList, setCardList] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deck, setDeck] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState({
    monster: true,
    spell: true,
    trap: true,
  });

  const fetchCards = async () => {
    try {
      if (searchTerm.length >= 3) {
        const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${searchTerm}`);
        const data = await response.json();
        setCardList(data.data);
      }
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [searchTerm]);

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };

  const handleAddToDeck = (card) => {
    if (deck.length >= 60) {
      alert('Maximum deck size reached (60 cards)');
      return;
    }

    const existingCard = deck.find((c) => c.id === card.id);
    if (existingCard) {
      if (existingCard.quantity < 3) {
        setDeck([...deck.filter((c) => c.id !== card.id), { ...card, quantity: existingCard.quantity + 1 }]);
      } else {
        alert('Maximum 3 cards of the same type allowed');
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
        }
      }
      return card;
    }).filter((card) => card.quantity > 0);
    setDeck(updatedDeck);
  };

  const handleDragStart = (event, card) => {
    event.dataTransfer.setData('card', JSON.stringify(card));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const cardData = JSON.parse(event.dataTransfer.getData('card'));
    handleAddToDeck(cardData);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    setFilter({ ...filter, [name]: checked });
  };

  const filteredCardList = cardList.filter((card) => {
    if (filter.monster && card.type.toLowerCase().includes('monster')) return true;
    if (filter.spell && card.frameType === 'spell') return true;
    if (filter.trap && card.frameType === 'trap') return true;
    return false;
  });

  return (
    <div className="deck-collection">
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter card name..."
        />
        <button onClick={fetchCards} style={{ fontSize: '16px' }}>Search</button>
      </div>
      <div className="filter">
        <label style={{ fontSize: '20px' }}>
          Monster
          <input
            type="checkbox"
            name="monster"
            checked={filter.monster}
            onChange={handleFilterChange}
          />
        </label>
        <label style={{ fontSize: '20px' }}>
          Spell
          <input
            type="checkbox"
            name="spell"
            checked={filter.spell}
            onChange={handleFilterChange}
          />
        </label>
        <label style={{ fontSize: '20px' }}>
          Trap
          <input
            type="checkbox"
            name="trap"
            checked={filter.trap}
            onChange={handleFilterChange}
          />
        </label>
      </div>
      <div className="search-results" style={{ border: '4px solid black', borderRadius: '10px', padding: '10px', marginBottom: '20px' }}>
        <h2>Search Results</h2>
        <div className="card-list" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
          {filteredCardList.map((card) => (
            <div
              key={card.id}
              className="card-item"
              onClick={() => handleCardClick(card)}
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
            >
              <h3>{card.name}</h3>
              <img src={card.card_images[0].image_url_small} alt={card.name} style={{ width: '150px', height: 'auto' }} />
            </div>
          ))}
        </div>
      </div>
      <div className="deck-box" onDrop={handleDrop} onDragOver={handleDragOver} style={{ border: '4px solid black', borderRadius: '10px', padding: '10px' }}>
        <h2>Mein Deck</h2>
        <div className="deck-count" style={{ fontWeight: 'bold', fontSize: '24px' }}>Total Cards: {deck.reduce((acc, cur) => acc + cur.quantity, 0)}/60</div>
        <div
          className="deck-cards"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {deck.map((card, index) => (
            <div
              key={index}
              className="deck-card"
              draggable
              onDragStart={(e) => handleDragStart(e, card)}
              onDragEnd={() => handleRemoveFromDeck(card.id)}
            >
              {[...Array(card.quantity)].map((_, i) => (
                <img
                  key={i}
                  src={card.card_images[0].image_url_small}
                  alt={card.name}
                  style={{ width: '150px', height: 'auto' }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>{selectedCard.name}</h2>
            <p>Type: {selectedCard.type}</p>
            <p>ATK: {selectedCard.atk}</p>
            <p>DEF: {selectedCard.def}</p>
            <img src={selectedCard.card_images[0].image_url} alt={selectedCard.name} />
            <button onClick={() => handleAddToDeck(selectedCard)}>Add to Deck</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckCollection;
