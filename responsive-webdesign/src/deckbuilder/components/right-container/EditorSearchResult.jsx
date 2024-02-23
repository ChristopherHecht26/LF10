import React from 'react';

const EditorSearchResult = ({ card }) => {
  return (
    <div className="editor-search-result">
      <img src={card.card_images[0].image_url_small} alt={card.name} />
      <p>{card.name}</p>
      <p>Type: {card.type}</p>
    </div>
  );
};

export default EditorSearchResult;