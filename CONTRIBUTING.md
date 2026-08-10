# Contributing

Thanks for your interest in improving the Business Website Starter!

## Getting started

```bash
npm install
cp .env.example .env.local   # PowerShell: Copy-Item .env.example .env.local
npm run dev
```

Node 18.18+ is required (developed on Node 22 — see `.nvmrc`).

## Development workflow

1. Create a branch: `git checkout -b feat/short-description`.
2. Make your change, following the existing patterns and conventions.
3. Run the full check suite locally before opening a PR:

   ```bash
   npm run format
   npm run lint
   npm run typecheck
   npm test
   npm run build
   ```

4. Add or update tests for any behavior change.
5. Open a pull request using the template and describe the change and rationale.

## Conventions

- **TypeScript strict** — no `any` unless justified.
- **Imports** grouped: node/react, third-party, then `@/` aliases.
- **Styling** via Tailwind + design tokens (`src/styles/globals.css`); avoid
  hard-coded colors.
- **Content** goes through the repository layer in `src/content/` — never import
  raw data arrays into UI.
- **Accessibility** — new interactive components must be keyboard operable and
  should include a `jest-axe` test.
- **Commits** — clear, imperative messages explaining the "why".

## Reporting bugs / requesting features

Use the issue templates under **Issues → New issue**. For security issues, see
[`SECURITY.md`](SECURITY.md) instead.
