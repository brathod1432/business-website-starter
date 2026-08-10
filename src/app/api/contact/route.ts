import { NextResponse } from 'next/server';

import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { contactFormSchema } from '@/lib/validations/contact';

/**
 * Mock contact endpoint (Phase 10).
 *
 * Validates with the same Zod schema as the client, rate-limits by IP, applies
 * a honeypot spam check, and simulates a provider call. To go live, replace the
 * "simulate delivery" block with a real integration (Resend, SendGrid,
 * Formspree, a CRM webhook, etc.).
 */
export async function POST(request: Request) {
  // Abuse protection: cap submissions per IP per minute.
  const ip = getClientIp(request);
  const limit = rateLimit(`contact:${ip}`, { limit: 5, windowMs: 60_000 });
  if (!limit.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again shortly.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Validation failed.', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot tripped — silently accept to avoid tipping off bots.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // --- Simulate delivery to a provider ---------------------------------
  // Swap this block for a real email/CRM integration in production.
  await new Promise((resolve) => setTimeout(resolve, 400));
  // eslint-disable-next-line no-console
  console.info('[contact] new submission from', parsed.data.email);
  // ---------------------------------------------------------------------

  return NextResponse.json({ ok: true, message: 'Message received.' }, { status: 200 });
}
