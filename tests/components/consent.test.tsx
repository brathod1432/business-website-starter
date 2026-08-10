import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ConsentProvider, useConsent } from '@/components/consent/consent-context';

function Probe() {
  const { consent, setConsent, reset } = useConsent();
  return (
    <div>
      <span data-testid="state">{consent}</span>
      <button onClick={() => setConsent('accepted')}>accept</button>
      <button onClick={reset}>reset</button>
    </div>
  );
}

describe('ConsentProvider', () => {
  afterEach(() => window.localStorage.clear());

  it('accepts, persists, and can reset consent (GDPR withdrawal)', async () => {
    const user = userEvent.setup();
    render(
      <ConsentProvider>
        <Probe />
      </ConsentProvider>,
    );

    expect(screen.getByTestId('state')).toHaveTextContent('unset');

    await user.click(screen.getByRole('button', { name: 'accept' }));
    expect(screen.getByTestId('state')).toHaveTextContent('accepted');
    expect(window.localStorage.getItem('cookie-consent')).toBe('accepted');

    await user.click(screen.getByRole('button', { name: 'reset' }));
    expect(screen.getByTestId('state')).toHaveTextContent('unset');
    expect(window.localStorage.getItem('cookie-consent')).toBeNull();
  });
});
