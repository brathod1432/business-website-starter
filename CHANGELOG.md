# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [1.1.0] - 2026-08-10

### Added

- **Dark mode** with a system-aware theme toggle (`next-themes`).
- **Cookie consent** banner with **consent-gated analytics** (GDPR-conscious).
- **Newsletter** signup with a mock API route and shared Zod validation.
- **Security hardening:** Content Security Policy + HSTS and additional headers,
  IP-based **rate limiting** on API routes, and startup **environment
  validation** (`src/lib/env.ts`).
- **PWA:** web app manifest and app icons (192/512 + maskable).
- **Resilience:** route `error`, `global-error`, and `loading` boundaries.
- **Project screenshots** in `public/screenshots/` plus a generator script.
- **OSS/DX setup:** MIT license, security policy, contributing guide, code of
  conduct, CI workflow, Dependabot, issue/PR templates, EditorConfig, `.nvmrc`,
  and VS Code recommendations.
- Improvement report at `docs/improvements.md`.

## [1.0.0] - 2026-08-10

### Added

- Initial production-grade starter: Next.js App Router + TypeScript + Tailwind +
  ShadCN-style UI.
- Full information architecture (home, about, services + detail, case studies +
  detail, pricing, blog + detail, contact, privacy, terms).
- Reusable component library, CMS-ready content layer, contact form with mock
  API, SEO (metadata, sitemap, robots, JSON-LD), accessibility, and a Jest +
  RTL + jest-axe test suite.
