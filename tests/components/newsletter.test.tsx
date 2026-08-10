import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Newsletter } from '@/components/sections/newsletter';

describe('Newsletter', () => {
  afterEach(() => {
    // @ts-expect-error cleanup injected mock
    delete global.fetch;
  });

  it('validates the email before submitting', async () => {
    const user = userEvent.setup();
    render(<Newsletter />);
    await user.type(screen.getByLabelText(/subscribe to our newsletter/i), 'not-an-email');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
  });

  it('shows a success state on valid submission', async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValue({ ok: true, json: async () => ({ ok: true }) }) as unknown as typeof fetch;
    const user = userEvent.setup();
    render(<Newsletter />);
    await user.type(screen.getByLabelText(/subscribe to our newsletter/i), 'jane@example.com');
    await user.click(screen.getByRole('button', { name: /subscribe/i }));
    expect(await screen.findByText(/you.re subscribed/i)).toBeInTheDocument();
  });
});
