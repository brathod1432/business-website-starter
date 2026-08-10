import { isSameOrigin } from '@/lib/request-guard';

function req(headers: Record<string, string>, url = 'https://example.com/api/contact'): Request {
  const map = new Map(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  return {
    url,
    headers: { get: (k: string) => map.get(k.toLowerCase()) ?? null },
  } as unknown as Request;
}

describe('isSameOrigin', () => {
  it('allows requests with no Origin header (non-browser)', () => {
    expect(isSameOrigin(req({ host: 'example.com' }))).toBe(true);
  });

  it('allows a matching Origin', () => {
    expect(isSameOrigin(req({ origin: 'https://example.com', host: 'example.com' }))).toBe(true);
  });

  it('rejects a cross-origin request', () => {
    expect(isSameOrigin(req({ origin: 'https://evil.example', host: 'example.com' }))).toBe(false);
  });

  it('rejects a malformed Origin', () => {
    expect(isSameOrigin(req({ origin: 'not-a-url', host: 'example.com' }))).toBe(false);
  });
});
