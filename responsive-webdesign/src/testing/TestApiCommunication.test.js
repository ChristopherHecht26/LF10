// Importiere msw und setze ein einfaches Mock für die API
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import Function from './Function'; // Importiere deine Komponente

const server = setupServer(
  rest.get('https://db.ygoprodeck.com/api/v7/cardinfo.php', (req, res, ctx) => {
    return res(ctx.status(500)); // Simuliere einen API-Fehler
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('Überprüfung der Anwendung auf API-Fehler', async () => {
  render(<Function />);

  // Warte auf das Laden der Karten (du könntest auch auf ein bestimmtes Element warten)
  await waitFor(() => {
    expect(screen.getByText('Search Results')).toBeInTheDocument();
  });

  // Überprüfe, ob die Anwendung auf API-Fehler angemessen reagiert
  const errorAlert = screen.getByText('Error fetching cards:');
  expect(errorAlert).toBeInTheDocument();
});
