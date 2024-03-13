import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Function from './Function'; // Importiere deine Komponente

test('Überprüfung der Anzahl der Karten im Deck', async () => {
  render(<Function />);

  // Warte auf das Laden der Karten (du könntest auch auf ein bestimmtes Element warten)
  await waitFor(() => {
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  // Wähle eine Karte aus den Suchergebnissen aus
  const searchResults = screen.getByText('Search Results');
  const selectedCard = screen.getByRole('listitem', { container: searchResults });

  // Füge die ausgewählte Karte mehrmals zum Deck hinzu
  userEvent.drag(selectedCard);
  userEvent.drag(selectedCard);
  userEvent.drag(selectedCard);

  // Überprüfe, ob die Anzahl der Karten im Deck korrekt ist
  const deck = screen.getByText('My Deck');
  expect(deck).toBeInTheDocument();
  expect(screen.getByText('Total Cards: 3/60')).toBeInTheDocument();
});
