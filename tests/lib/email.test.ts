import { escapeHtml, isEmailConfigured, sendEmail } from '@/lib/email';

describe('escapeHtml', () => {
  it('escapes HTML-significant characters', () => {
    expect(escapeHtml('<script>"&\'</script>')).toBe(
      '&lt;script&gt;&quot;&amp;&#39;&lt;/script&gt;',
    );
  });

  it('leaves plain text unchanged', () => {
    expect(escapeHtml('Hello world')).toBe('Hello world');
  });
});

describe('email configuration', () => {
  const original = { key: process.env.RESEND_API_KEY, from: process.env.EMAIL_FROM };
  afterEach(() => {
    process.env.RESEND_API_KEY = original.key;
    process.env.EMAIL_FROM = original.from;
  });

  it('reports not configured without env vars', () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;
    expect(isEmailConfigured()).toBe(false);
  });

  it('reports configured when both env vars are present', () => {
    process.env.RESEND_API_KEY = 're_test';
    process.env.EMAIL_FROM = 'Acme <a@b.com>';
    expect(isEmailConfigured()).toBe(true);
  });

  it('simulates delivery (no network) when unconfigured', async () => {
    delete process.env.RESEND_API_KEY;
    delete process.env.EMAIL_FROM;
    const result = await sendEmail({ to: 'x@y.com', subject: 's', html: '<p>hi</p>' });
    expect(result).toEqual({ delivered: false, simulated: true });
  });
});
