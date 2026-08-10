import { NextResponse } from 'next/server';

import { escapeHtml, sendEmail } from '@/lib/email';
import { getClientIp, rateLimit } from '@/lib/rate-limit';
import { isSameOrigin } from '@/lib/request-guard';
import { verifyTurnstile } from '@/lib/turnstile';
import { contactFormSchema } from '@/lib/validations/contact';

/**
 * Contact endpoint (Phase 10).
 *
 * Rate-limits by IP, validates with the shared Zod schema, checks a honeypot,
 * optionally verifies a Cloudflare Turnstile token, then delivers via the email
 * provider (Resend if configured, otherwise a simulated send). Set
 * `RESEND_API_KEY`, `EMAIL_FROM`, and `CONTACT_TO_EMAIL` to go live.
 */
export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: 'Cross-origin request rejected.' }, { status: 403 });
  }

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

  const data = parsed.data;

  // Honeypot tripped — silently accept to avoid tipping off bots.
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Optional CAPTCHA (no-op unless TURNSTILE_SECRET_KEY is set).
  const humanVerified = await verifyTurnstile(data.turnstileToken, ip);
  if (!humanVerified) {
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 400 });
  }

  const to = process.env.CONTACT_TO_EMAIL ?? process.env.EMAIL_FROM ?? '';
  const result = to
    ? await sendEmail({
        to,
        replyTo: data.email,
        subject: `New contact form submission from ${data.name}`,
        html: `
          <h2>New contact submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
          ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${escapeHtml(data.message).replace(/\n/g, '<br/>')}</p>
        `,
      })
    : { delivered: false, simulated: true };

  if (result.error) {
    // eslint-disable-next-line no-console
    console.error('[contact] delivery error:', result.error);
    return NextResponse.json(
      { error: 'We could not send your message right now. Please try again later.' },
      { status: 502 },
    );
  }

  return NextResponse.json(
    { ok: true, message: 'Message received.' },
    {
      status: 200,
      headers: {
        'X-RateLimit-Limit': String(limit.limit),
        'X-RateLimit-Remaining': String(limit.remaining),
      },
    },
  );
}
