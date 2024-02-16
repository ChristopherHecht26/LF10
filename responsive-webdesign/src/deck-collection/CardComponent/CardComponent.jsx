import React from 'react';
import '/Users/User/Documents/GitHub/LF10/responsive-webdesign/src/deck-collection/CardComponent/cardcomponent.css';
const CardComponent = () => {
  return (
    <div id="editor-container">
      <div id="card-column" style={{ maxHeight: '564px' }}>
        <div id="editor-mobile-card-container" hidden>
          <button id="editor-button-mobile-back-to-deck-card" className="editor-button-mobile-back-to-deck">&lt;&lt;&lt; Back</button>
        </div>
        <h4 id="card-name" className="engine-dark-box">
          <a id="card-name-link" href="https://duelingnexus.com/wiki/Erwachen_der_Kristallultimaten" target="_blank">Erwachen der Kristallultimaten</a>
        </h4>
        <p id="card-picture-container">
          <img
            id="card-picture"
            src="assets/rarity/no-foil.png"
            alt=""
            style={{ backgroundImage: 'url("https://yugi.wiki/assets/card-images/common/12877076.jpg")' }}
          />
        </p>

        <div id="card-description-box" className="engine-dark-box">
          <p>
            <span id="card-description">
              Zeige 1 „Ultimativer Kristall“-Monster in deiner Hand vor, dann aktiviere 1 dieser Effekte. Falls du ein „Ultimativer Kristall“-Monster kontrollierst, kannst du stattdessen 1 oder 2 dieser Effekte nacheinander aktivieren (und musst kein Monster vorzeigen).
              <br />
              ● Nimm 1 „Regenbogenbrücke“-Karte oder 1 „Regenbogen Lichtbrechung“ von deinem Deck und füge sie oder ihn entweder deiner Hand hinzu oder lege sie oder ihn auf den Friedhof.
              <br />
              ● Beschwöre 1 „Kristallungeheuer“-Monsterkarte als Spezialbeschwörung von deiner Hand, deinem Deck, deinem Friedhof oder deiner Zauber- &amp; Fallenzone.
              <br />
              Du kannst nur 1 „Erwachen der Kristallultimaten“ pro Spielzug aktivieren.
            </span>
          </p>
        </div>
        <div className="editor-mobile-card-button-container" hidden>
          <button id="editor-add-to-main-button-mobile" className="editor-button-mobile-100-top" hidden>Add To Main</button>
          <button id="editor-add-to-extra-button-mobile" className="editor-button-mobile-100-top" hidden>Add To Extra</button>
          <button id="editor-add-to-side-button-mobile" className="editor-button-mobile-100" hidden>Add To Side</button>
          <button id="editor-remove-from-main-button-mobile" className="editor-button-mobile-100-top" hidden>Remove From Main</button>
          <button id="editor-remove-from-extra-button-mobile" className="editor-button-mobile-100-top" hidden>Remove From Extra</button>
          <button id="editor-remove-from-side-button-mobile" className="editor-button-mobile-100" hidden>Remove From Side</button>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;