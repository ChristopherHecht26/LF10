// Modal.js
import React from 'react';

const Modal = ({ showModal, selectedCard, onAddToDeck, onCloseModal }) => {
  return (
    <div className={showModal ? 'modal' : 'hidden'}>
      <div className="modal-content">
        <span className="close" onClick={onCloseModal}>&times;</span>
        <h2>{selectedCard.name}</h2>
        <p>Type: {selectedCard.type}</p>
        <p>ATK: {selectedCard.atk}</p>
        <p>DEF: {selectedCard.def}</p>
        <img src={selectedCard.card_images[0].image_url} alt={selectedCard.name} />
        <p>Description: {selectedCard.desc}</p>
        <button onClick={() => onAddToDeck(selectedCard)}>Add to Deck</button>
      </div>
    </div>
  );
};

export default Modal;
