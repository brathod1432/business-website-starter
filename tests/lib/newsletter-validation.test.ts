import { newsletterSchema } from '@/lib/validations/newsletter';

describe('newsletterSchema', () => {
  it('accepts a valid email', () => {
    expect(newsletterSchema.safeParse({ email: 'a@b.com', company: '' }).success).toBe(true);
  });

  it('rejects an invalid email', () => {
    expect(newsletterSchema.safeParse({ email: 'nope', company: '' }).success).toBe(false);
  });

  it('flags the honeypot when filled', () => {
    expect(newsletterSchema.safeParse({ email: 'a@b.com', company: 'bot' }).success).toBe(false);
  });
});
