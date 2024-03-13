import { render, screen, waitFor, within } from '@testing-library/react';
import Function from './Function'; // Importiere deine Komponente

test('Testen der Kommunikation mit der API für Karteninfos', async () => {
  render(<Function />);

  // Warte auf das Laden der Karten (du könntest auch auf ein bestimmtes Element warten)
  await waitFor(() => {
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  // Überprüfe, ob die Karteninfos korrekt abgerufen werden
  const searchResults = screen.getByText('Search Results');
  const cardName = within(searchResults).getByText('.template-name').textContent;

  // Hier könntest du auch sicherstellen, dass die API-Antwort korrekte Daten enthält
  expect(cardName).not.toBe('');
});