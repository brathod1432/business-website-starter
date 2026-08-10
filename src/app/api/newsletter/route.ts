import { NextResponse } from 'next/server';

import { escapeHtml, sendEmail } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { isSameOrigin } from '@/lib/request-guard';
import { newsletterSchema } from '@/lib/validations/newsletter';

/**
 * Newsletter subscription endpoint.
 *
 * Sends a notification via the email provider (Resend if configured, otherwise
 * a simulated send). For a full subscriber list, swap `sendEmail` for a list
 * provider (Mailchimp, ConvertKit, Resend Audiences, Beehiiv, etc.).
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });
  }

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

  const to = process.env.CONTACT_TO_EMAIL ?? process.env.EMAIL_FROM;
  if (to) {
    const result = await sendEmail({
      to,
      subject: 'New newsletter subscriber',
      html: `<p>New subscriber: <strong>${escapeHtml(parsed.data.email)}</strong></p>`,
    });
    if (result.error) {
      // eslint-disable-next-line no-console
      console.error('[newsletter] delivery error:', result.error);
    }
  } else {
    // eslint-disable-next-line no-console
    console.info('[newsletter] new subscriber (simulated)', parsed.data.email);
  }

  return NextResponse.json({ ok: true, message: 'Subscribed.' }, { status: 200 });
}
