import React from 'react';
import Function from '../../src/deckbuilder/function';

describe('<Function />', () => {
  beforeEach(() => {
    cy.mount(<Function />)
  });

  it('should display search results when searching for "Hamon, Herr des tosenden Donners"', () => {
    // Suchbegriff eingeben und Suchen klicken
    cy.get('input[type="text"]').type('Hamon, Herr des tosenden Donners');
    cy.contains('Search').click();

    // Überprüfen, ob genau ein Ergebnis im Suchergebniscontainer angezeigt wird
    cy.get('.search-results-container').children('.card-list').should('have.length', 1);
  });
});