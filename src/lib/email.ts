/**
 * Provider-agnostic email delivery (server-only).
 *
 * If `RESEND_API_KEY` is set, emails are sent via the Resend REST API using
 * `fetch` (no SDK dependency). Otherwise it falls back to a no-op "simulated"
 * send so the starter works out of the box. Swap `deliver()` for any provider
 * (SendGrid, Postmark, SES, …) without touching callers.
 *
 * Required env for real delivery:
 *   RESEND_API_KEY   - your Resend API key (server secret; never NEXT_PUBLIC)
 *   EMAIL_FROM       - a verified sender, e.g. "Acme <hello@yourdomain.com>"
 *   CONTACT_TO_EMAIL - where contact/newsletter notifications are delivered
 */

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type SendEmailResult = { delivered: boolean; simulated: boolean; error?: string };

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    // eslint-disable-next-line no-console
    console.info('[email] simulated (no provider configured) →', input.to, '|', input.subject);
    return { delivered: false, simulated: true };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        ...(input.text ? { text: input.text } : {}),
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      return { delivered: false, simulated: false, error: `Provider ${res.status}: ${detail}` };
    }
    return { delivered: true, simulated: false };
  } catch (err) {
    return {
      delivered: false,
      simulated: false,
      error: err instanceof Error ? err.message : 'Unknown email error',
    };
  }
}

/** Escape user-supplied strings before embedding in HTML email bodies. */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
