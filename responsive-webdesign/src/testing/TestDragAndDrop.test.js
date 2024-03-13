import { render, screen, waitFor, within } from '@testing-library/react';
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
  const selectedCard = within(searchResults).getByText('template-name');

  // Ziehe die ausgewählte Karte in das Deck
  userEvent.drag(selectedCard);

  // Überprüfe, ob die Karte zum Deck hinzugefügt wurde
  expect(screen.getByText('My Deck')).toBeInTheDocument();
  expect(screen.getByText('Total Cards: 1/60')).toBeInTheDocument();

  // Ziehe die Karte aus dem Deck, um sie zu entfernen
  const deckCards = screen.getAllByTestId('deck-card');
  userEvent.drag(deckCards[0]);

  // Überprüfe, ob die Karte aus dem Deck entfernt wurde
  expect(screen.queryByText('Total Cards: 1/60')).not.toBeInTheDocument();
});
