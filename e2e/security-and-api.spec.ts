import { expect, test } from '@playwright/test';

const VALID_CONTACT = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  message: 'I would like to discuss a new website project for my company.',
};

test.describe('security headers', () => {
  test('home response carries the hardened header set', async ({ request }) => {
    const res = await request.get('/');
    const h = res.headers();
    expect(h['content-security-policy']).toContain("default-src 'self'");
    expect(h['content-security-policy']).toContain('report-to csp-endpoint');
    expect(h['strict-transport-security']).toContain('max-age=');
    expect(h['x-frame-options']).toBe('SAMEORIGIN');
    expect(h['x-content-type-options']).toBe('nosniff');
    expect(h['referrer-policy']).toBe('strict-origin-when-cross-origin');
    expect(h['cross-origin-opener-policy']).toBe('same-origin');
    expect(h['reporting-endpoints']).toContain('csp-endpoint');
    expect(h['x-powered-by']).toBeFalsy();
  });
});

test.describe('contact API', () => {
  test('rejects cross-origin POSTs (CSRF guard)', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: { origin: 'https://evil.example' },
      data: VALID_CONTACT,
    });
    expect(res.status()).toBe(403);
  });

  test('accepts a valid submission and returns rate-limit headers', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: { 'x-forwarded-for': '203.0.113.10' },
      data: VALID_CONTACT,
    });
    expect(res.status()).toBe(200);
    expect(res.headers()['x-ratelimit-limit']).toBe('5');
    expect(Number(res.headers()['x-ratelimit-remaining'])).toBeLessThan(5);
    expect((await res.json()).ok).toBe(true);
  });

  test('rejects invalid payloads with 422', async ({ request }) => {
    const res = await request.post('/api/contact', {
      headers: { 'x-forwarded-for': '203.0.113.11' },
      data: { name: '', email: 'bad', message: 'short' },
    });
    expect(res.status()).toBe(422);
  });

  test('enforces the per-IP rate limit', async ({ request }) => {
    const ip = '203.0.113.99';
    const codes: number[] = [];
    for (let i = 0; i < 6; i++) {
      const res = await request.post('/api/contact', {
        headers: { 'x-forwarded-for': ip },
        data: VALID_CONTACT,
      });
      codes.push(res.status());
    }
    expect(codes.filter((c) => c === 200)).toHaveLength(5);
    expect(codes[codes.length - 1]).toBe(429);
  });
});

test.describe('newsletter API', () => {
  test('subscribes with a valid email', async ({ request }) => {
    const res = await request.post('/api/newsletter', {
      headers: { 'x-forwarded-for': '198.51.100.10' },
      data: { email: 'subscriber@example.com' },
    });
    expect(res.status()).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  test('rejects an invalid email with 422', async ({ request }) => {
    const res = await request.post('/api/newsletter', {
      headers: { 'x-forwarded-for': '198.51.100.11' },
      data: { email: 'nope' },
    });
    expect(res.status()).toBe(422);
  });
});

test.describe('ops endpoints', () => {
  test('health check reports ok', async ({ request }) => {
    const res = await request.get('/api/health');
    expect(res.status()).toBe(200);
    expect((await res.json()).status).toBe('ok');
  });

  test('CSP report collector accepts reports (204)', async ({ request }) => {
    const res = await request.post('/api/csp-report', {
      data: { 'csp-report': { 'blocked-uri': 'https://evil.example' } },
    });
    expect(res.status()).toBe(204);
  });
});
