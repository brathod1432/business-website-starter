# Design System (Phase 11)

The design system is token-driven. All tokens are CSS custom properties defined in
[`src/styles/globals.css`](../src/styles/globals.css) and consumed through Tailwind in
[`tailwind.config.ts`](../tailwind.config.ts). Change a token once and it updates everywhere.

## Principles

Professional · Premium · Modern · Trustworthy · Business-focused. The system favors calm,
high-contrast neutrals with a confident blue primary and an energetic teal accent for
emphasis and calls to action.

## Color tokens

Colors are stored as **HSL channels** (not full color values) so Tailwind opacity modifiers
like `bg-primary/10` work. Each token has light and `.dark` variants.

| Token                  | Light (HSL)   | Role                                |
| ---------------------- | ------------- | ----------------------------------- |
| `--background`         | `0 0% 100%`   | Page background                     |
| `--foreground`         | `222 47% 11%` | Primary text                        |
| `--primary`            | `221 83% 45%` | Brand, primary buttons, links       |
| `--primary-foreground` | `0 0% 100%`   | Text on primary                     |
| `--secondary`          | `210 40% 96%` | Muted surfaces, subtle sections     |
| `--accent`             | `173 80% 36%` | Highlights, secondary CTAs, ratings |
| `--muted-foreground`   | `215 16% 42%` | Secondary text                      |
| `--destructive`        | `0 72% 51%`   | Errors, validation                  |
| `--border` / `--input` | `214 32% 91%` | Borders and field outlines          |
| `--ring`               | `221 83% 45%` | Focus ring                          |

Usage in Tailwind: `bg-background`, `text-foreground`, `bg-primary text-primary-foreground`,
`text-muted-foreground`, `border-border`, `ring-ring`, etc.

### Contrast

The palette targets **WCAG 2.1 AA**. Primary/accent on white and white on primary/accent
meet AA for text. When re-theming, re-check contrast (e.g. with the WebAIM contrast checker)
before shipping.

## Typography

Fonts are defined via `--font-sans` and `--font-display` and mapped to Tailwind's
`font-sans` / `font-display`. The starter ships a **system font stack** for zero-latency,
offline-safe rendering and a better Lighthouse score.

Type scale (Tailwind): body `text-base`/`text-lg`; headings `text-2xl`→`text-6xl` with
`font-bold`, `tracking-tight`, and `text-wrap: balance` on h1–h4.

### Switching to a custom webfont

```tsx
// src/app/layout.tsx
import { Inter, Sora } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
const sora = Sora({ subsets: ['latin'], variable: '--font-display', display: 'swap' });
// then: <html className={`${inter.variable} ${sora.variable}`}>
```

The CSS variables are the contract, so nothing else needs to change.

## Spacing & layout

- Built on Tailwind's 4px spacing scale.
- Centered `container` capped at `1280px` with responsive padding.
- Vertical rhythm via the `<Section spacing="sm|md|lg">` component.

## Radius

Driven by `--radius` (`0.75rem`). Tailwind exposes `rounded-lg` (full radius), `rounded-md`
(`-2px`), and `rounded-sm` (`-4px`).

## Elevation (shadows)

| Class             | Use                     |
| ----------------- | ----------------------- |
| `shadow-soft`     | Cards at rest           |
| `shadow-elevated` | Hover / raised surfaces |
| `shadow-ring`     | Focus emphasis          |

## Motion

Framer Motion via the `<Reveal>` component (fade + rise on scroll). It reads
`prefers-reduced-motion` and renders statically for users who opt out; a global CSS rule also
neutralizes animations/transitions under reduced motion.

## Component library

Primitives in `src/components/ui/` and composed sections in `src/components/sections/`:

`Button`, `Card`, `Input`, `Textarea`, `Label`, `Accordion`, `Badge`, `Section` +
`SectionHeader`, `Hero`, `FeatureCard`, `ServiceCard`, `TestimonialCard`, `PricingCard`,
`FAQ`, `CTA`, `ContactForm`, `PageHeader`, `Process`, `Metrics`, `Industries`, `ClientLogos`,
`Reveal`.

Each component is fully typed and prop-driven, so it is Storybook-ready. Variants use
`class-variance-authority` (see `button.tsx` / `badge.tsx`) for a predictable API.
