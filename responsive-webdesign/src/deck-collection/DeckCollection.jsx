
// DeckCollection.js
import React, { useState, useEffect } from 'react';
import DeckSearch from './DeckSearch';
import DeckFilter from './DeckFilter';
import CardList from './CardList';
import DeckBox from './DeckBox';
import Modal from './Modal';
import '../deck-collection/deckcollection.css';

const DeckCollection = () => {
  // ... (Deine bisherige Logik und State-Variablen bleiben hier)

  return (
    <div className="deck-collection">
      <div className="container">
        <DeckSearch
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onSearchButtonClick={fetchCards}
        />
        <DeckFilter
          filter={filter}
          onFilterChange={handleFilterChange}
        />
        <CardList
          cardList={filteredCardList}
          onCardDragStart={handleDragStart}
        />
        <DeckBox
          deck={deck}
          onDeckDrop={handleDrop}
          onDeckDragOver={handleDragOver}
          onRemoveFromDeck={handleRemoveFromDeck}
        />
      </div>
      <Modal
        showModal={showModal}
        selectedCard={selectedCard}
        onAddToDeck={handleAddToDeck}
        onCloseModal={() => setShowModal(false)}
      />

    </div>
  );
}

export default App;
