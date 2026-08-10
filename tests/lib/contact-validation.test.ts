import { contactFormSchema } from '@/lib/validations/contact';

const valid = {
  name: 'Jane Doe',
  company: 'Acme',
  email: 'jane@example.com',
  phone: '+1 555 018 2400',
  message: 'I would like to discuss a new website project for my company.',
  website: '',
};

describe('contactFormSchema', () => {
  it('accepts a fully valid submission', () => {
    expect(contactFormSchema.safeParse(valid).success).toBe(true);
  });

  it('accepts optional company/phone when empty', () => {
    const result = contactFormSchema.safeParse({ ...valid, company: '', phone: '' });
    expect(result.success).toBe(true);
  });

  it('rejects a short name', () => {
    const result = contactFormSchema.safeParse({ ...valid, name: 'J' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email', () => {
    const result = contactFormSchema.safeParse({ ...valid, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects a short message', () => {
    const result = contactFormSchema.safeParse({ ...valid, message: 'too short' });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid phone number', () => {
    const result = contactFormSchema.safeParse({ ...valid, phone: 'abc' });
    expect(result.success).toBe(false);
  });

  it('flags the honeypot field when filled (spam)', () => {
    const result = contactFormSchema.safeParse({ ...valid, website: 'http://spam.example' });
    expect(result.success).toBe(false);
  });
});
