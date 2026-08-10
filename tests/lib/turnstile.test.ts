import { isTurnstileEnabled, verifyTurnstile } from '@/lib/turnstile';

describe('turnstile', () => {
  const original = process.env.TURNSTILE_SECRET_KEY;
  afterEach(() => {
    process.env.TURNSTILE_SECRET_KEY = original;
    // @ts-expect-error cleanup injected mock
    delete global.fetch;
  });

  it('is disabled without a secret', () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(isTurnstileEnabled()).toBe(false);
  });

  it('passes verification when disabled (no secret)', async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    expect(await verifyTurnstile(undefined)).toBe(true);
  });

  it('fails when enabled but no token provided', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    expect(await verifyTurnstile(undefined)).toBe(false);
  });

  it('returns true when the provider confirms success', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    }) as unknown as typeof fetch;
    expect(await verifyTurnstile('token')).toBe(true);
  });

  it('returns false when the provider rejects', async () => {
    process.env.TURNSTILE_SECRET_KEY = 'secret';
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: false }),
    }) as unknown as typeof fetch;
    expect(await verifyTurnstile('token')).toBe(false);
  });
});
