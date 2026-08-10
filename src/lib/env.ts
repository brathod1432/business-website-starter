import { z } from 'zod';

/**
 * Runtime environment validation.
 *
 * Parses the (public) environment once so misconfiguration fails loudly and
 * the rest of the app can consume typed, validated values. Optional analytics
 * IDs are allowed to be empty; only the shape is enforced.
 */
const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z
    .string()
    .regex(/^G-[A-Z0-9]+$/, 'Expected a GA4 id like G-XXXXXXXXXX')
    .optional()
    .or(z.literal('')),
  NEXT_PUBLIC_CLARITY_PROJECT_ID: z
    .string()
    .regex(/^[a-z0-9]+$/i, 'Expected a Clarity project id')
    .optional()
    .or(z.literal('')),
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_CLARITY_PROJECT_ID: process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID,
});

if (!parsed.success) {
  // Fail fast in every environment; the message lists exactly what is wrong.
  const issues = parsed.error.issues.map((i) => `  - ${i.path.join('.')}: ${i.message}`).join('\n');
  throw new Error(`Invalid environment variables:\n${issues}`);
}

export const env = {
  siteUrl: parsed.data.NEXT_PUBLIC_SITE_URL,
  gaMeasurementId: parsed.data.NEXT_PUBLIC_GA_MEASUREMENT_ID || undefined,
  clarityProjectId: parsed.data.NEXT_PUBLIC_CLARITY_PROJECT_ID || undefined,
  isAnalyticsConfigured:
    Boolean(parsed.data.NEXT_PUBLIC_GA_MEASUREMENT_ID) ||
    Boolean(parsed.data.NEXT_PUBLIC_CLARITY_PROJECT_ID),
} as const;
