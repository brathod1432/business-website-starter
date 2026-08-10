/**
 * Central site configuration.
 * Re-brand the entire starter by editing the values in this file.
 */
import { env } from '@/lib/env';

export type NavItem = {
  title: string;
  href: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: 'Acme Solutions',
  legalName: 'Acme Solutions, Inc.',
  shortName: 'Acme',
  tagline: 'Growth-focused solutions for modern businesses',
  description:
    'Acme Solutions helps ambitious businesses design, build, and scale digital products and services that convert. Strategy, delivery, and support under one roof.',
  url: env.siteUrl,
  ogImage: '/og',
  locale: 'en_US',
  contact: {
    email: 'hello@acmesolutions.example',
    phone: '+1 (555) 018-2400',
    phoneHref: 'tel:+15550182400',
    address: {
      street: '500 Market Street, Suite 400',
      city: 'San Francisco',
      region: 'CA',
      postalCode: '94105',
      country: 'US',
    },
  },
  founded: '2015',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/example' },
    { label: 'X', href: 'https://x.com/example' },
    { label: 'GitHub', href: 'https://github.com/example' },
  ] satisfies SocialLink[],
  twitterHandle: '@acmesolutions',
} as const;

export const mainNav: NavItem[] = [
  { title: 'Services', href: '/services' },
  { title: 'Case Studies', href: '/case-studies' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'Blog', href: '/blog' },
  { title: 'About', href: '/about' },
];

export const footerNav: { heading: string; items: NavItem[] }[] = [
  {
    heading: 'Company',
    items: [
      { title: 'About', href: '/about' },
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Services', href: '/services' },
      { title: 'Pricing', href: '/pricing' },
    ],
  },
  {
    heading: 'Resources',
    items: [
      { title: 'Blog', href: '/blog' },
      { title: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Legal',
    items: [
      { title: 'Privacy Policy', href: '/privacy-policy' },
      { title: 'Terms', href: '/terms' },
    ],
  },
];

export type SiteConfig = typeof siteConfig;
