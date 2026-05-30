import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { http, HttpResponse, delay } from 'msw';
import { beforeEach, describe, expect, it } from 'vitest';

import App from '@/App';
import { server } from '@/mocks/server';
import { clearAuthSession } from '@/login/api/authToken';

async function loginAs(
  user: ReturnType<typeof userEvent.setup>,
  username: string,
  password: string,
): Promise<void> {
  await user.type(screen.getByLabelText('Username'), username);
  await user.type(screen.getByLabelText('Password'), password);
  await user.click(screen.getByRole('button', { name: 'Sign in' }));
}

describe('Chat app', () => {
  beforeEach(() => {
    // Reset the in-memory + persisted auth so every test starts logged out.
    clearAuthSession();
  });

  it('logs in and lists conversations sorted by most recent message', async () => {
    const user = userEvent.setup();
    render(<App />);

    await loginAs(user, 'Alice', 'password123');

    // Login screen is gone, conversations are shown.
    const bob = await screen.findByRole('button', { name: /Bob/ });
    const carol = await screen.findByRole('button', { name: /Carol/ });
    expect(screen.queryByRole('button', { name: 'Sign in' })).not.toBeInTheDocument();

    // Bob's conversation (2026-05-28) is more recent than Carol's (2026-05-27),
    // so it must appear first.
    expect(
      bob.compareDocumentPosition(carol) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it('shows an error and stays on the login screen for wrong credentials', async () => {
    const user = userEvent.setup();
    render(<App />);

    await loginAs(user, 'Alice', 'wrong-password');

    const alert = await screen.findByRole('alert');
    expect(alert).toHaveTextContent(/incorrect password/i);
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows the empty state when the user has no conversations', async () => {
    server.use(http.get('/conversations', () => HttpResponse.json([])));

    const user = userEvent.setup();
    render(<App />);

    await loginAs(user, 'Alice', 'password123');

    expect(await screen.findByText('No conversations yet')).toBeInTheDocument();
  });

  it('optimistically renders a sent message, then rolls back and toasts on failure', async () => {
    // Force the send to fail (after a small delay so we can observe the optimistic message).
    server.use(
      http.post('/conversations/:id/messages', async () => {
        await delay(50);
        return HttpResponse.json(
          { code: 'SEND_FAILED', message: 'Simulated failure' },
          { status: 500 },
        );
      }),
    );

    const user = userEvent.setup();
    render(<App />);

    await loginAs(user, 'Alice', 'password123');
    await user.click(await screen.findByRole('button', { name: /Bob/ }));

    // Existing thread messages load.
    await screen.findByText('Hey Bob!');

    const composer = screen.getByPlaceholderText('Type a message...');
    await user.type(composer, 'Optimistic hello{Enter}');

    // Appears immediately (optimistic).
    expect(await screen.findByText('Optimistic hello')).toBeInTheDocument();

    // Rolls back once the request fails...
    await waitFor(() => {
      expect(screen.queryByText('Optimistic hello')).not.toBeInTheDocument();
    });
    // ...and an error toast is shown.
    expect(await screen.findByText('Simulated failure')).toBeInTheDocument();
  });
});
