import React, { useState } from 'react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cardInfo, setCardInfo] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${searchTerm}`);
      const data = await response.json();
      if (data.data.length > 0) {
        setCardInfo(data.data[0]);
        setError('');
      } else {
        setError('Card not found');
        setCardInfo(null);
      }
    } catch (error) {
      console.error('Error fetching card:', error);
      setError('Error fetching card. Please try again.');
      setCardInfo(null);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter card name..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      {cardInfo && (
        <div>
          <h2>{cardInfo.name}</h2>
          <p>Type: {cardInfo.type}</p>
          <p>ATK: {cardInfo.atk}</p>
          <p>DEF: {cardInfo.def}</p>
          <img src={cardInfo.card_images[0].image_url} alt={cardInfo.name} />
        </div>
      )}
    </div>
  );
};

export default SearchBar;
