# Setup

## Prerequisites

- **Node.js** 18.18+ (developed and verified on Node 22).
- **npm** 10+ (bundled with Node).
- **git** (optional, for version control).

## Install

```bash
npm install
```

### Windows / PowerShell note

If PowerShell blocks `npm` due to execution policy (`npm.ps1 cannot be loaded ...`), use the
`.cmd` shim, which is unaffected:

```powershell
npm.cmd install
npm.cmd run dev
```

## Environment variables

Copy the example file and fill in values as needed:

```bash
cp .env.example .env.local          # PowerShell: Copy-Item .env.example .env.local
```

| Variable                         | Required    | Description                                                                                        |
| -------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`           | Recommended | Canonical base URL for metadata, sitemap, OG, canonical tags. Defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID`  | Optional    | Google Analytics 4 ID (`G-XXXXXXXXXX`). Blank disables GA.                                         |
| `NEXT_PUBLIC_CLARITY_PROJECT_ID` | Optional    | Microsoft Clarity project ID. Blank disables Clarity.                                              |
| `CONTACT_FORM_ENDPOINT`          | Optional    | Contact submission endpoint. Defaults to the built-in mock route.                                  |

Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; others stay server-side.

## Scripts

| Command                           | What it does                          |
| --------------------------------- | ------------------------------------- |
| `npm run dev`                     | Dev server at `http://localhost:3000` |
| `npm run build`                   | Production build                      |
| `npm run start`                   | Serve the production build            |
| `npm run lint`                    | ESLint (Next core-web-vitals + TS)    |
| `npm run typecheck`               | `tsc --noEmit`                        |
| `npm run format` / `format:check` | Prettier write / check                |
| `npm test`                        | Jest test suite                       |
| `npm run test:watch`              | Jest in watch mode                    |
| `npm run coverage`                | Tests with coverage report            |

## First run checklist

1. `npm install`
2. `Copy-Item .env.example .env.local`
3. `npm run dev` and open `http://localhost:3000`
4. Re-brand via `src/lib/site-config.ts` and `src/styles/globals.css`

## Troubleshooting

- **Fonts / build network errors behind a corporate proxy:** the starter uses a system font
  stack by default, so no font fetching happens at build time. If you switch to `next/font`,
  ensure the build environment can reach Google Fonts or self-host the font files.
- **Port already in use:** run `npm run dev -- -p 3001`.
