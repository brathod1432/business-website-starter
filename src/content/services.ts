import type { Service } from '@/content/types';

/**
 * Mock service catalog. Replace the array below with a CMS fetch to go live;
 * the exported repository functions keep the rest of the app unchanged.
 */
const services: Service[] = [
  {
    slug: 'web-development',
    title: 'Web & App Development',
    summary: 'High-performance websites and web apps built to convert and scale.',
    description:
      'We design and engineer fast, accessible, SEO-ready websites and web applications using modern frameworks — from marketing sites to complex product platforms.',
    icon: 'code',
    features: [
      'Next.js & TypeScript architecture',
      'Core Web Vitals optimization',
      'Headless CMS integration',
      'Design system & component libraries',
      'Ongoing maintenance & SLAs',
    ],
    body: [
      {
        heading: 'What we deliver',
        content:
          'A production-grade codebase, a reusable design system, and a deployment pipeline your team can own. We ship incrementally so you see value every sprint, not just at the end.',
      },
      {
        heading: 'How we work',
        content:
          'Discovery workshops define scope and success metrics. We then work in two-week sprints with demos, staging previews, and clear acceptance criteria for every feature.',
      },
    ],
    outcomes: [
      'Faster page loads and higher search rankings',
      'A maintainable codebase your team can extend',
      'Measurable lifts in conversion and engagement',
    ],
    featured: true,
  },
  {
    slug: 'digital-strategy',
    title: 'Digital Strategy & Consulting',
    summary: 'Turn ambiguous goals into a prioritized, measurable roadmap.',
    description:
      'We help leadership teams align on outcomes, map the customer journey, and prioritize initiatives that move the metrics that matter.',
    icon: 'compass',
    features: [
      'Market & competitor analysis',
      'Customer journey mapping',
      'KPI & measurement framework',
      'Technology & vendor selection',
      'Quarterly roadmap planning',
    ],
    body: [
      {
        heading: 'What we deliver',
        content:
          'A clear strategy document, a prioritized roadmap tied to business KPIs, and the operating cadence to execute it. No 80-page decks that never get used.',
      },
      {
        heading: 'How we work',
        content:
          'We embed with your team, interview stakeholders and customers, audit your current stack, and translate findings into decisions you can act on immediately.',
      },
    ],
    outcomes: [
      'Aligned leadership and a shared roadmap',
      'Investment focused on the highest-impact work',
      'A measurement framework to prove ROI',
    ],
    featured: true,
  },
  {
    slug: 'brand-design',
    title: 'Brand & Product Design',
    summary: 'Distinctive, accessible design systems that build trust.',
    description:
      'From identity to interface, we craft cohesive visual systems and intuitive product experiences that earn attention and drive action.',
    icon: 'palette',
    features: [
      'Brand identity & guidelines',
      'UX research & wireframing',
      'High-fidelity UI design',
      'Accessible, tokenized design systems',
      'Prototyping & usability testing',
    ],
    body: [
      {
        heading: 'What we deliver',
        content:
          'A complete brand and product design system — tokens, components, and guidelines — delivered in Figma and ready for engineering handoff.',
      },
      {
        heading: 'How we work',
        content:
          'We start with research and hypotheses, validate through prototypes and testing, then systematize what works into a scalable design language.',
      },
    ],
    outcomes: [
      'A memorable, consistent brand presence',
      'Higher usability and lower support load',
      'Faster design-to-development handoff',
    ],
    featured: true,
  },
  {
    slug: 'growth-marketing',
    title: 'Growth & Performance Marketing',
    summary: 'Full-funnel campaigns engineered around real ROI.',
    description:
      'We plan, launch, and optimize acquisition and retention programs across SEO, paid, email, and lifecycle — all tied back to revenue.',
    icon: 'megaphone',
    features: [
      'SEO & content strategy',
      'Paid search & social',
      'Conversion rate optimization',
      'Lifecycle & email automation',
      'Attribution & reporting dashboards',
    ],
    body: [
      {
        heading: 'What we deliver',
        content:
          'A full-funnel growth engine with clear attribution, plus dashboards that tie every dollar spent to pipeline and revenue.',
      },
      {
        heading: 'How we work',
        content:
          'We run structured experiments, double down on winners, and cut losers fast — with a transparent weekly reporting rhythm.',
      },
    ],
    outcomes: [
      'Lower customer acquisition cost',
      'Predictable, compounding pipeline',
      'Clear attribution from spend to revenue',
    ],
    featured: false,
  },
  {
    slug: 'cloud-devops',
    title: 'Cloud & DevOps',
    summary: 'Reliable, secure infrastructure that scales with demand.',
    description:
      'We modernize infrastructure with automated pipelines, observability, and cost controls so your team ships confidently.',
    icon: 'cloud',
    features: [
      'CI/CD pipeline automation',
      'Infrastructure as code',
      'Observability & alerting',
      'Security hardening & compliance',
      'Cost optimization',
    ],
    body: [
      {
        heading: 'What we deliver',
        content:
          'Automated deployments, infrastructure defined as code, and dashboards that surface reliability and cost signals before they become problems.',
      },
      {
        heading: 'How we work',
        content:
          'We assess your current setup, close the highest-risk gaps first, and hand over runbooks so your team stays in control.',
      },
    ],
    outcomes: [
      'Faster, safer releases',
      'Higher uptime and quicker recovery',
      'Lower and more predictable cloud spend',
    ],
    featured: false,
  },
  {
    slug: 'managed-support',
    title: 'Managed Support & Care',
    summary: 'Proactive maintenance and support that keeps you running.',
    description:
      'Ongoing monitoring, updates, and enhancements with clear SLAs so your digital products stay fast, secure, and current.',
    icon: 'support',
    features: [
      'Proactive monitoring',
      'Security patches & updates',
      'Performance tuning',
      'Priority incident response',
      'Monthly enhancement hours',
    ],
    body: [
      {
        heading: 'What we deliver',
        content:
          'A dedicated support team, defined SLAs, and a monthly report covering uptime, performance, and the enhancements we shipped.',
      },
      {
        heading: 'How we work',
        content:
          'We monitor proactively, triage against agreed SLAs, and reserve time each month for improvements — not just firefighting.',
      },
    ],
    outcomes: [
      'Peace of mind with guaranteed response times',
      'Continuously improving products',
      'A single accountable partner',
    ],
    featured: false,
  },
];

export function getServices(): Service[] {
  return services;
}

export function getFeaturedServices(): Service[] {
  return services.filter((service) => service.featured);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}
