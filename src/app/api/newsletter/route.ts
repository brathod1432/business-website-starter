import { NextResponse } from 'next/server';

import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { newsletterSchema } from '@/lib/validations/newsletter';

/**
 * Mock newsletter subscription endpoint.
 * Swap the "simulate subscription" block for a real provider (Mailchimp,
 * ConvertKit, Resend Audiences, Beehiiv, etc.).
 */
export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limit = rateLimit(`newsletter:${ip}`, { limit: 5, windowMs: 60_000 });
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

  const parsed = newsletterSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  // Honeypot tripped — silently accept.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // --- Simulate subscription ------------------------------------------
  await new Promise((resolve) => setTimeout(resolve, 300));
  // eslint-disable-next-line no-console
  console.info('[newsletter] new subscriber', parsed.data.email);
  // --------------------------------------------------------------------

  return NextResponse.json({ ok: true, message: 'Subscribed.' }, { status: 200 });
}
