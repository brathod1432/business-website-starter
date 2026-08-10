import { __resetRateLimit, getClientIp, rateLimit } from '@/lib/rate-limit';

describe('rateLimit', () => {
  beforeEach(() => __resetRateLimit());

  it('allows requests up to the limit', () => {
    const results = Array.from({ length: 3 }, () => rateLimit('k', { limit: 3, windowMs: 1000 }));
    expect(results.every((r) => r.success)).toBe(true);
    expect(results[2]!.remaining).toBe(0);
  });

  it('blocks requests over the limit', () => {
    for (let i = 0; i < 3; i++) rateLimit('k', { limit: 3, windowMs: 1000 });
    const blocked = rateLimit('k', { limit: 3, windowMs: 1000 });
    expect(blocked.success).toBe(false);
    expect(blocked.retryAfter).toBeGreaterThan(0);
  });

  it('tracks separate keys independently', () => {
    rateLimit('a', { limit: 1, windowMs: 1000 });
    expect(rateLimit('b', { limit: 1, windowMs: 1000 }).success).toBe(true);
  });

  it('resets after the window elapses', async () => {
    rateLimit('k', { limit: 1, windowMs: 20 });
    expect(rateLimit('k', { limit: 1, windowMs: 20 }).success).toBe(false);
    await new Promise((r) => setTimeout(r, 30));
    expect(rateLimit('k', { limit: 1, windowMs: 20 }).success).toBe(true);
  });
});

// jsdom has no global Request; build a minimal stand-in with a headers.get().
function fakeRequest(headers: Record<string, string> = {}): Request {
  const map = new Map(Object.entries(headers));
  return {
    headers: { get: (k: string) => map.get(k.toLowerCase()) ?? null },
  } as unknown as Request;
}

describe('getClientIp', () => {
  it('reads the first x-forwarded-for entry', () => {
    const req = fakeRequest({ 'x-forwarded-for': '1.1.1.1, 2.2.2.2' });
    expect(getClientIp(req)).toBe('1.1.1.1');
  });

  it('falls back to unknown', () => {
    expect(getClientIp(fakeRequest())).toBe('unknown');
  });
});
