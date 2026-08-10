import { z } from 'zod';

/** Shared newsletter subscription schema (client + mock API). */
export const newsletterSchema = z.object({
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
  /** Honeypot — must stay empty. */
  company: z.string().max(0).optional().or(z.literal('')),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
