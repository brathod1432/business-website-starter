# Improvement Report — User & Client Perspective

This report analyzes the starter as a **real product a developer/agency would use to ship
client websites**, and as an **end-visitor experience**. It lists what was improved in this
pass, why it matters in practice, and what remains as recommended future work — with a
dedicated security section.

---

## Who uses this, and what they actually need

| Persona                                          | What they care about                                                                 |
| ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| **Agency / freelancer** (clones this per client) | Fast re-branding, clean structure, docs, CI, no legal/security surprises             |
| **Business owner** (the client)                  | Trustworthy look, fast site, works on mobile, ranks on Google, leads arrive reliably |
| **End visitor**                                  | Fast load, accessible, respects privacy, easy to contact                             |
| **Maintainer** (future dev)                      | Types, tests, conventions, no hidden footguns                                        |

The improvements below were prioritized against these real needs.

---

## Implemented in this pass

### 1. Dark mode (visitor + client expectation)

A system-aware theme with a header toggle (`next-themes`). The design tokens already defined a
`.dark` palette; this makes it usable. **Why it matters:** dark mode is now a baseline
expectation; clients ask for it, and it improves perceived quality and accessibility.

### 2. Privacy & consent (legal necessity)

A GDPR-style **cookie consent banner** that **gates analytics** — GA4/Clarity scripts do not
load until the visitor opts in. **Why it matters:** running analytics without consent is a
real legal liability in the EU/UK. This makes the starter safe to hand to a client out of the
box.

### 3. Lead capture beyond the contact form

A **newsletter signup** (footer) with shared Zod validation, honeypot, and a mock API.
**Why it matters:** most business sites want an email list; this is a common paid add-on now
included.

### 4. Security hardening (see the dedicated section below)

CSP + HSTS and hardened headers, **rate limiting** on API routes, **honeypot** spam guards,
**environment validation**, and consent-gated third-party scripts.

### 5. Resilience & UX polish

Route-level `error`, `global-error`, and `loading` boundaries so failures and slow navigations
degrade gracefully instead of showing a blank page or Next's default error screen.

### 6. Installability / mobile (PWA basics)

A web app **manifest** and **app icons** (192/512 + maskable). **Why it matters:** better
"Add to Home Screen" behavior, richer mobile presentation, and Lighthouse PWA/Best-Practices
credit.

### 7. Portfolio-ready proof

Real **screenshots** committed to `public/screenshots/` and embedded in the README, plus a
one-command generator (`npm run screenshots`). **Why it matters:** anyone browsing the repo
immediately sees the output — critical for a portfolio piece.

### 8. Open-source & DX foundation

MIT **LICENSE**, **SECURITY.md**, **CONTRIBUTING.md**, **CODE_OF_CONDUCT.md**, **CHANGELOG.md**,
**GitHub Actions CI** (format/lint/typecheck/test/build), **Dependabot**, issue/PR templates,
`.editorconfig`, `.nvmrc`, and VS Code recommendations. **Why it matters:** makes the repo
credible, contributable, and safe to maintain over time.

---

## Security analysis

### Addressed now

| Area                        | Implementation                                                                                                                                | Practical benefit                                  |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| **Content Security Policy** | `next.config.mjs` sets a CSP restricting `default-src`, `object-src 'none'`, `frame-ancestors`, `base-uri`, and allow-lists analytics origins | Mitigates XSS, clickjacking, and data exfiltration |
| **Transport security**      | `Strict-Transport-Security` (HSTS) with preload                                                                                               | Forces HTTPS, prevents downgrade/MITM              |
| **Clickjacking**            | `X-Frame-Options: SAMEORIGIN` + `frame-ancestors`                                                                                             | Site can't be embedded maliciously                 |
| **MIME sniffing**           | `X-Content-Type-Options: nosniff`                                                                                                             | Prevents content-type confusion attacks            |
| **Referrer / permissions**  | `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo/topics off)                                                                           | Less data leakage, disables unused APIs            |
| **Input validation**        | Zod schemas shared by client + API (contact, newsletter)                                                                                      | Rejects malformed/oversized input server-side      |
| **Rate limiting**           | `src/lib/rate-limit.ts` on `/api/contact` and `/api/newsletter` (per IP)                                                                      | Blunts spam and brute-force/abuse                  |
| **Bot spam**                | Hidden honeypot fields on both forms                                                                                                          | Filters naive bots without harming UX/a11y         |
| **Third-party scripts**     | Consent-gated, `afterInteractive`, IP anonymization on GA                                                                                     | No tracking without opt-in                         |
| **Env safety**              | `src/lib/env.ts` validates at startup; `.env*` git-ignored                                                                                    | Fails fast on misconfig; no secrets in repo        |
| **Supply chain**            | Pinned exact versions, Dependabot enabled, CI build gate                                                                                      | Controlled, reviewable dependency updates          |

### Recommended before a high-security production launch

1. **Strict, nonce-based CSP.** The current CSP uses `'unsafe-inline'` for `script-src`/
   `style-src` (required by inline JSON-LD, the theme bootstrap, and Tailwind/Framer inline
   styles) to preserve static generation. For maximum protection, move CSP into `middleware.ts`,
   generate a per-request nonce, and read it in the layout for `<script>`/`next/script`. Trade-off:
   this forces dynamic rendering, so weigh it against the SSG/perf benefits.
2. **Distributed rate limiting.** The in-memory limiter resets per instance on serverless.
   Swap for Upstash Redis / Vercel KV for real protection at scale (same function signature).
3. **CAPTCHA / Turnstile** on public forms to complement the honeypot.
4. **Authenticated form delivery.** Replace the mock API with a real provider using a
   server-side secret (never a `NEXT_PUBLIC_` key).
5. **Monitoring.** Wire the `error`/`global-error` boundaries to Sentry (or similar) and enable
   GitHub code scanning / secret scanning.

---

## Additional future improvements (prioritized backlog)

| Priority | Improvement                                                        | User value                         |
| -------- | ------------------------------------------------------------------ | ---------------------------------- |
| High     | Real email/CRM integration for forms                               | Leads actually get delivered       |
| High     | Blog: MDX authoring, categories/tags filtering, related posts, RSS | Content marketing that scales      |
| High     | Internationalization (i18n) + locale routing                       | Serve non-English markets          |
| Medium   | Search (blog / site)                                               | Findability on content-heavy sites |
| Medium   | Storybook for the component library                                | Faster, safer UI iteration         |
| Medium   | Playwright E2E + visual regression                                 | Confidence beyond unit tests       |
| Medium   | CMS adapter reference (Sanity/Contentful) wired to the repo layer  | Non-devs edit content              |
| Low      | Pagination for blog/case studies                                   | Scales past a handful of posts     |
| Low      | Testimonials/logos as data-driven carousels                        | Richer social proof                |
| Low      | Booking/calendar embed on contact                                  | Fewer steps to a meeting           |

---

## Summary

This pass moved the starter from "great demo" to "safe to ship for a real client":
privacy-compliant analytics, hardened security headers and abuse protection, dark mode,
lead capture, resilience boundaries, PWA basics, and a credible open-source/CI foundation —
all verified by the existing lint/typecheck/test/build gates.
