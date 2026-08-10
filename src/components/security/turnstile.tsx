'use client';

import Script from 'next/script';

import { env } from '@/lib/env';

/**
 * Cloudflare Turnstile widget (optional).
 *
 * Renders nothing unless `NEXT_PUBLIC_TURNSTILE_SITE_KEY` is set. Uses implicit
 * rendering: the script injects a hidden `cf-turnstile-response` input into the
 * surrounding <form>, which the contact form reads on submit. Server-side
 * verification happens in the API route via `TURNSTILE_SECRET_KEY`.
 */
export function TurnstileWidget() {
  const siteKey = env.turnstileSiteKey;
  if (!siteKey) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="afterInteractive"
        async
        defer
      />
      <div className="cf-turnstile" data-sitekey={siteKey} data-theme="auto" />
    </>
  );
}

/** Reads the Turnstile token from the hidden input, if present. */
export function getTurnstileToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const input = document.querySelector<HTMLInputElement>('input[name="cf-turnstile-response"]');
  return input?.value || undefined;
}
