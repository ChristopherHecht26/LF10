import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Function from './Function'; // Importiere deine Komponente

test('Hinzufügen und Entfernen von Karten mit Drag and Drop in das Deck', async () => {
  render(<Function />);

  // Warte auf das Laden der Karten (du könntest auch auf ein bestimmtes Element warten)
  await waitFor(() => {
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  // Wähle eine Karte aus den Suchergebnissen aus
  const searchResults = screen.getByText('Search Results');
  const selectedCard = searchResults.firstChild.firstChild;

  // Ziehe die ausgewählte Karte in das Deck
  userEvent.drag(selectedCard);

  // Überprüfe, ob die Karte zum Deck hinzugefügt wurde
  const deck = screen.getByText('My Deck');
  expect(deck).toBeInTheDocument();
  expect(screen.getByText('Total Cards: 1/60')).toBeInTheDocument();

  // Ziehe die Karte aus dem Deck, um sie zu entfernen
  const deckCard = screen.getByText('My Deck').nextSibling.firstChild;
  userEvent.drag(deckCard);

  // Überprüfe, ob die Karte aus dem Deck entfernt wurde
  expect(screen.queryByText('Total Cards: 1/60')).not.toBeInTheDocument();
});
