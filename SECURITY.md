# Security Policy

## Supported versions

This is a starter template; security fixes land on the `main` branch. Always
build from the latest `main` for the most recent hardening.

## Reporting a vulnerability

Please **do not** open a public issue for security vulnerabilities.

Instead, report privately via GitHub's **Security → Report a vulnerability**
(private advisory) on this repository, or email the maintainer. Include:

- A description of the issue and its impact
- Steps to reproduce (proof of concept if possible)
- Affected files/routes and any suggested remediation

You can expect an initial acknowledgement within a few business days.

## Security features in this starter

- **Content Security Policy** and hardened response headers (HSTS,
  `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`) configured in `next.config.mjs`.
- **Input validation** with Zod, shared between client forms and API routes.
- **Rate limiting** on API routes (`src/lib/rate-limit.ts`).
- **Honeypot** spam protection on the contact and newsletter forms.
- **Consent-gated analytics** — no third-party scripts load without opt-in.
- **Environment validation** at startup (`src/lib/env.ts`).
- **No secrets in the repo** — `.env*` files are git-ignored; use `.env.example`.

## Hardening checklist before production

- [ ] Replace the in-memory rate limiter with a shared store (Redis/Upstash/KV).
- [ ] Add a CAPTCHA/Turnstile to public forms.
- [ ] Wire a real, authenticated email/CRM provider for form submissions.
- [ ] Consider a nonce-based strict CSP (see `docs/improvements.md`).
- [ ] Enable dependency scanning (Dependabot is preconfigured) and review alerts.
- [ ] Serve exclusively over HTTPS so HSTS takes effect.
