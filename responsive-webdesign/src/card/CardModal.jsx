import React from "react";
import "./cardmodal.css"; // Erstelle diese CSS-Datei, um das Aussehen des Modals zu stylen

const CardModal = ({ card, onClose }) => {
  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal">
        <h3>{card.name}</h3>
        <img
          src={card.card_images[0].image_url_large}
          alt={card.name}
          style={{ width: "300px", height: "auto" }}
        />
        <p>Card Description: {card.desc}</p>
        {/* Füge hier weitere Informationen hinzu, die du anzeigen möchtest */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default CardModal;
