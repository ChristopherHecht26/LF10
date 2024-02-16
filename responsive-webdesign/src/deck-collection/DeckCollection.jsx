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

    const existingCardIndex = deck.findIndex((c) => c.id === card.id);
    if (existingCardIndex !== -1 && deck[existingCardIndex].quantity >= 3) {
      alert('Maximum 3 cards of the same type allowed');
      return;
    }

    const updatedDeck = [...deck];
    if (existingCardIndex !== -1) {
      updatedDeck[existingCardIndex].quantity += 1;
    } else {
      updatedDeck.push({ ...card, quantity: 1 });
    }
    setDeck(updatedDeck);
  };

  const handleRemoveFromDeck = (cardIndex) => {
    const updatedDeck = [...deck];
    if (updatedDeck[cardIndex].quantity > 1) {
      updatedDeck[cardIndex].quantity -= 1;
    } else {
      updatedDeck.splice(cardIndex, 1);
    }
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
      <div className="deck" onDrop={handleDrop} onDragOver={handleDragOver}>
        <h2>Deck</h2>
        <ul>
          {deck.map((card, index) => (
            <li key={index}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={card.card_images[0].image_url_small} alt={card.name} style={{ width: '150px', height: 'auto' }} />
                {[...Array(card.quantity)].map((_, i) => (
                  <img key={i} src={card.card_images[0].image_url_small} alt={card.name} style={{ width: '50px', height: 'auto' }} />
                ))}
              </div>
              <span>{card.name}</span>
              <button onClick={() => handleRemoveFromDeck(index)}>Remove</button>
            </li>
          ))}
        </ul>
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
