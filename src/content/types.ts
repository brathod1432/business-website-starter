import type { LucideIcon } from 'lucide-react';

/**
 * Content model types (Phase 6 — CMS-ready).
 * These interfaces intentionally mirror what a headless CMS (Contentful,
 * Sanity, Strapi, headless WordPress) would expose, so the repository
 * functions in `src/content/*.ts` can later be swapped for CMS fetchers
 * without touching the UI.
 */

export type Service = {
  slug: string;
  title: string;
  /** Short one-line summary for cards and lists. */
  summary: string;
  /** Longer description for the detail page hero. */
  description: string;
  /** lucide-react icon name resolved at render time. */
  icon: string;
  features: string[];
  /** Rich, sectioned body for the detail page. */
  body: { heading: string; content: string }[];
  outcomes: string[];
  featured: boolean;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  category: string;
  tags: string[];
  coverImage?: string;
  featured: boolean;
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  quote?: { text: string; author: string; role: string };
  tags: string[];
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  rating: number;
};

export type PricingPlan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
  highlighted: boolean;
};

export type Faq = {
  question: string;
  answer: string;
};

export type Industry = {
  name: string;
  icon: string;
  description: string;
};

export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  icon: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: string;
};

export type Metric = {
  label: string;
  value: string;
  description: string;
};

export type { IconName } from '@/lib/icons';
export type { LucideIcon };
