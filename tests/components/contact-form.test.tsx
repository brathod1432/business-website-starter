import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ContactForm } from '@/components/sections/contact-form';

describe('ContactForm', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    // @ts-expect-error cleanup injected mock
    delete global.fetch;
  });

  it('shows validation errors when submitting empty', async () => {
    const user = userEvent.setup();
    render(<ContactForm />);
    await user.click(screen.getByRole('button', { name: /send message/i }));
    expect(await screen.findAllByRole('alert')).not.toHaveLength(0);
  });

  it('submits valid data and shows a success state', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true }) });
    global.fetch = fetchMock as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(
      screen.getByLabelText(/message/i),
      'I would like to talk about building a new website.',
    );
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/we got your message/i)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('shows an error state when the API fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Server error' }),
    }) as unknown as typeof fetch;

    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.type(
      screen.getByLabelText(/message/i),
      'This is a sufficiently long message for validation.',
    );
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/server error/i)).toBeInTheDocument();
  });
});
