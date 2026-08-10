# Accessibility

**Target:** WCAG 2.1 AA. Accessibility is built into components and verified automatically
with `jest-axe`, not bolted on at the end.

## Decisions & implementation

### Structure & semantics

- Semantic landmarks: `<header>`, `<nav>`, `<main id="main-content">`, `<footer>`.
- Exactly one `<h1>` per page with a logical heading hierarchy below it.
- Lists use real `<ul>/<ol>` with `role="list"` where styling removes default semantics.

### Keyboard & focus

- A **skip-to-content** link is the first focusable element in the layout.
- Visible focus rings via a global `:focus-visible` ring token (never `outline: none` alone).
- The mobile menu toggle uses `aria-expanded` / `aria-controls`; the Radix accordion (FAQ) is
  fully keyboard operable.

### Navigation

- Active links expose `aria-current="page"`.
- Breadcrumbs use an ordered list inside `<nav aria-label="Breadcrumb">` with the current page
  marked `aria-current`.

### Forms (Contact)

- Every field has a real, associated `<label>` (no placeholder-only fields).
- Errors are tied to inputs via `aria-describedby` and `aria-invalid`, and announced with
  `role="alert"`.
- The success state uses `role="status"` so it is announced to assistive tech.
- Required vs optional fields are indicated in text, not by color alone.
- A visually hidden honeypot field is `aria-hidden` and removed from the tab order.

### Color & contrast

- Tokens chosen to meet AA contrast for text on background, primary, and accent surfaces.
- Information is never conveyed by color alone (icons/text accompany state).

### Motion

- `<Reveal>` respects `prefers-reduced-motion`, rendering content statically for users who opt
  out; a global CSS rule also neutralizes animations/transitions under reduced motion.

### Images & icons

- Decorative icons are `aria-hidden="true"`.
- Meaningful graphics (e.g. star ratings) expose an accessible name via `aria-label`.

## Automated testing

`tests/a11y/accessibility.test.tsx` runs `jest-axe` against the Contact form, Footer, and
Pricing card. Add a `jest-axe` assertion for every new interactive component.

```bash
npm test -- tests/a11y
```

## Manual QA checklist

- [ ] Tab through every page — order is logical, focus always visible.
- [ ] Operate the mobile menu and FAQ with keyboard only.
- [ ] Submit the contact form with errors using a screen reader; confirm errors are announced.
- [ ] Zoom to 200% — no loss of content or function.
- [ ] Run Lighthouse and axe DevTools on key pages.
- [ ] Verify contrast after any theme change.
