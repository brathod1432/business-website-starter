import { z } from 'zod';

/**
 * Shared contact form schema (Phase 10).
 * Used by both the client form (React Hook Form) and the mock API route,
 * guaranteeing identical validation on both sides.
 */
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Please enter your name (at least 2 characters).' })
    .max(80, { message: 'Name is too long.' }),
  company: z
    .string()
    .trim()
    .max(120, { message: 'Company name is too long.' })
    .optional()
    .or(z.literal('')),
  email: z.string().trim().email({ message: 'Please enter a valid email address.' }),
  phone: z
    .string()
    .trim()
    .max(30, { message: 'Phone number is too long.' })
    .refine((val) => val === '' || /^[+()\d\s-]{7,}$/.test(val), {
      message: 'Please enter a valid phone number.',
    })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Please provide a few more details (at least 10 characters).' })
    .max(2000, { message: 'Message is too long.' }),
  /** Honeypot field for basic spam prevention — must stay empty. */
  website: z.string().max(0, { message: 'Spam detected.' }).optional().or(z.literal('')),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
