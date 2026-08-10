# Testing

## Strategy

Testing is layered to match risk while keeping the suite fast:

| Layer          | What it verifies                                 | Location                               |
| -------------- | ------------------------------------------------ | -------------------------------------- |
| Unit           | Pure helpers (`cn`, `formatDate`, `readingTime`) | `tests/lib/utils.test.ts`              |
| Validation     | Zod contact schema (valid, invalid, honeypot)    | `tests/lib/contact-validation.test.ts` |
| SEO            | `buildMetadata` / `absoluteUrl` output           | `tests/lib/seo.test.ts`                |
| Content        | Repository functions + icon integrity            | `tests/content/content.test.ts`        |
| Component      | Button, cards, FAQ, ContactForm behavior         | `tests/components/*`                   |
| Page rendering | Pages render, single `h1`, dynamic params        | `tests/pages/*`                        |
| Accessibility  | `jest-axe` on form, footer, pricing card         | `tests/a11y/accessibility.test.tsx`    |

## Tooling

- **Jest** with `next/jest` for Next-aware transforms.
- **React Testing Library** for user-centric component/page tests.
- **@testing-library/user-event** for realistic interactions.
- **jest-axe** for automated accessibility assertions.
- jsdom polyfills for `matchMedia` and `IntersectionObserver` live in `jest.setup.ts`
  (required by Framer Motion).

## Running

```bash
npm test              # run the whole suite
npm run test:watch    # watch mode
npm run coverage      # with coverage report (text + lcov)
```

Coverage output is written to `coverage/` (lcov) and printed to the console.

## Current status

- **Test suites:** 11 passed
- **Tests:** 57 passed
- **Coverage:** ~78% statements · ~82% lines · ~74% functions · ~63% branches

Coverage intentionally excludes the root `layout.tsx` and pure-presentational config. The
`app/og` image route and analytics loaders are validated via build rather than jsdom (canvas /
edge runtime aren't available in the test environment).

## What each test protects against

- **Validation tests** guard the contact form contract shared by client and server.
- **SEO tests** ensure canonical URLs and titles never silently regress.
- **Content tests** catch broken slugs and icon references before runtime.
- **Component/page tests** assert accessible roles/labels and correct links.
- **a11y tests** catch missing labels, invalid ARIA, and contrast-independent issues.

## Extending

- Co-locate new tests under `tests/**` using the `*.test.ts(x)` pattern.
- Prefer role/label queries (`getByRole`, `getByLabelText`) over test IDs.
- Add a `jest-axe` assertion whenever you add an interactive component.
- Consider Playwright for end-to-end and visual regression as the app grows.
