import React from 'react';

const DeckComponent = () => {
  return (
    <div id="editor-decks-column" style={{ maxHeight: '564px', width: '411.2px', marginLeft: '7.65px', marginRight: '7.65px' }}>
      <div className="editor-mobile-deck-container" hidden>
        <button id="editor-deck-name-button-mobile" className="editor-button-mobile-85">Advanced Crystal</button>
        <button id="editor-menu-button-mobile" className="editor-button-mobile-15">
          <div id="menu-icon-container">
            <div id="menu-icon"></div>
            <div id="menu-icon"></div>
            <div id="menu-icon"></div>
          </div>
        </button>
      </div>
      <h4 id="editor-deck-main-title" className="engine-dark-box">
        <span id="main-title">Main</span>
        <span id="editor-counter-text-main-total" style={{ display: 'inline' }} hidden>[41]</span>
      </h4>
      <div id="editor-main-deck" className="editor-deck-container" style={{ height: '222.498px' }}>
        {/* Hier füge die React-Komponenten für die Karten hinzu */}
        {/* Beispiel: <CardComponent imageUrl="https://yugi.wiki/assets/card-images/common/71620241.jpg" /> */}
      </div>
      <h4 id="editor-deck-extra-title" className="engine-dark-box">
        <span id="extra-title">Extra</span>
        <span id="editor-counter-text-extra-total" style={{ display: 'inline' }} hidden>[2]</span>
        {/* Weitere Counter und Icons hier einfügen */}
      </h4>
      <div id="editor-extra-deck" className="editor-deck-container" style={{ height: '55.6246px' }}>
        {/* Hier füge die React-Komponenten für die Extra-Deck-Karten hinzu */}
        {/* Beispiel: <CardComponent imageUrl="https://yugi.wiki/assets/card-images/common/37440988.jpg" /> */}
      </div>
      <h4 id="editor-deck-side-title" className="engine-dark-box">
        <span id="side-title">Side</span>
        <span id="editor-counter-text-side-total" style={{ display: 'none' }} hidden>[0]</span>
        {/* Weitere Counter und Icons hier einfügen */}
      </h4>
      <div id="editor-side-deck" className="editor-deck-container" style={{ height: '58.6246px' }}>
        {/* Hier füge die React-Komponenten für die Side-Deck-Karten hinzu */}
      </div>
      <div id="editor-banlist-icons"></div>
      <div id="editor-beta-icons"></div>
      <div id="editor-region-icons"></div>
      <button id="mobile-button-swap" className="mobile-button-swap" hidden>Swap</button>
      <div className="editor-mobile-deck-container" hidden>
        <button id="editor-search-button-mobile" className="editor-button-mobile-100-bottom">Add Cards</button>
      </div>
    </div>
  );
};

export default DeckComponent;