import React from 'react';
import Function from '../../src/deckbuilder/function';

describe('<Function />', () => {
  beforeEach(() => {
    cy.mount(<Function />)
  });

  it('should display the correct number of cards in the deck count when a card is added to the deck', () => {
    // Suchbegriff eingeben und Suchen klicken
    cy.get('input[type="text"]').type('Hamon, Herr des tosenden Donners');
    cy.contains('Search').click();

    // Karte aus dem Suchergebniscontainer auswählen und ziehen
    cy.get('.search-results-container .card-item').first().then(($card) => {
      // Hier starten wir die Drag-and-Drop-Aktion
      cy.wrap($card).trigger('dragstart');

      // Karte in den Deck-Container ablegen
      cy.get('.deck-container').trigger('drop');
    });

    // Überprüfen, ob die Anzahl der Karten im Deck-Container aktualisiert wurde
    cy.get('.deck-count').should('contain', '1/60'); // Hier angenommen, dass 1 Karte hinzugefügt wurde und das Deck eine maximale Größe von 60 hat
  });
});
