import React, { useState } from 'react';
import '../deck-collection/deckcollection.css';
function App() {
  const [deckName, setDeckName] = useState('');
  const [decks, setDecks] = useState([]);

  const createDeck = () => {
    setDecks([...decks, { name: deckName }]);
    setDeckName('');
  };

  const renameDeck = (index) => {
    const newName = prompt("Enter new deck name:", decks[index].name);
    if (newName !== null) {
      const updatedDecks = [...decks];
      updatedDecks[index].name = newName;
      setDecks(updatedDecks);
    }
  };

  const deleteDeck = (index) => {
    const updatedDecks = decks.filter((_, i) => i !== index);
    setDecks(updatedDecks);
  };

  return (
    <div className="container">
      <div className="container-head">
        <h1>Decks</h1>
        <button onClick={createDeck}>Create Deck</button>
      </div>
      <div className="decks-container">
        {decks.map((deck, index) => (
          <div className="decks" key={index}>
            <input
              type="text"
              value={deck.name}
              disabled
            />
            <button onClick={() => renameDeck(index)}>Rename</button>
            <button>Edit</button>
            <button onClick={() => deleteDeck(index)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
