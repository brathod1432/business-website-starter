import type {
  Faq,
  Feature,
  Industry,
  Metric,
  PricingPlan,
  ProcessStep,
  Testimonial,
} from '@/content/types';

export const clientLogos: string[] = [
  'Northwind',
  'Meridian',
  'Apex Legal',
  'Vertex',
  'Lumen',
  'Harborview',
];

export const testimonials: Testimonial[] = [
  {
    quote:
      'They operate like an extension of our team. Every sprint shipped something we could show the board.',
    author: 'Dana Whitfield',
    role: 'VP Customer Experience',
    company: 'Northwind Logistics',
    rating: 5,
  },
  {
    quote:
      'The most organized agency we have worked with. Clear scope, clear reporting, and results that held up.',
    author: 'Priya Nair',
    role: 'Managing Partner',
    company: 'Apex Legal Partners',
    rating: 5,
  },
  {
    quote:
      'Our booking numbers tripled and patients keep complimenting the new experience. Worth every dollar.',
    author: 'Dr. Alan Reyes',
    role: 'Practice Director',
    company: 'Meridian Health Group',
    rating: 5,
  },
  {
    quote:
      'They cut our cloud bill by a third while making deploys faster and far less scary. Rare combination.',
    author: 'Tomás Herrera',
    role: 'CTO',
    company: 'Vertex Software',
    rating: 5,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: '$2,500',
    period: '/ project',
    description: 'For small businesses that need a professional presence, fast.',
    features: [
      'Up to 5 pages',
      'Responsive, accessible design',
      'On-page SEO setup',
      'Contact form integration',
      '2 weeks of post-launch support',
    ],
    cta: 'Start with Starter',
    href: '/contact?plan=starter',
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$6,900',
    period: '/ project',
    description: 'For growing companies that want to compound results.',
    features: [
      'Up to 15 pages + blog',
      'Custom design system',
      'Advanced SEO & analytics',
      'Headless CMS integration',
      'Conversion optimization',
      '60 days of support',
    ],
    cta: 'Choose Growth',
    href: '/contact?plan=growth',
    highlighted: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: '',
    description: 'For teams with complex platforms and ongoing needs.',
    features: [
      'Unlimited pages & templates',
      'Dedicated product team',
      'Cloud & DevOps automation',
      'Priority SLAs',
      'Quarterly strategy roadmap',
      'Managed support & care',
    ],
    cta: 'Talk to sales',
    href: '/contact?plan=scale',
    highlighted: false,
  },
];

export const faqs: Faq[] = [
  {
    question: 'How long does a typical project take?',
    answer:
      'Most marketing sites launch in 4–8 weeks, while larger platforms run 3–6 months. After a short discovery, we give you a milestone plan with clear dates.',
  },
  {
    question: 'Do you work with our existing team and tools?',
    answer:
      'Yes. We integrate with your designers, developers, and stack — or run the whole engagement end to end. Whatever gets you the best outcome.',
  },
  {
    question: 'What does the engagement look like week to week?',
    answer:
      'We work in two-week sprints with a demo, a staging preview, and a short written update every cycle so you always know what shipped and what is next.',
  },
  {
    question: 'How do you handle SEO and performance?',
    answer:
      'Both are built in from day one — semantic markup, structured data, Core Web Vitals budgets, and analytics — not bolted on at the end.',
  },
  {
    question: 'Can you maintain the site after launch?',
    answer:
      'Absolutely. Our Managed Support & Care plans cover monitoring, updates, and a monthly block of enhancement hours with defined SLAs.',
  },
  {
    question: 'What if we need to change the brand or content later?',
    answer:
      'Everything is built on a tokenized design system and a CMS-ready content layer, so rebrands and content updates are quick and low-risk.',
  },
];

export const industries: Industry[] = [
  { name: 'Healthcare', icon: 'health', description: 'Accessible, compliant patient experiences.' },
  { name: 'Finance', icon: 'creditCard', description: 'Trustworthy, secure financial products.' },
  { name: 'Legal', icon: 'scale', description: 'Authoritative sites that win qualified clients.' },
  { name: 'Construction', icon: 'building', description: 'Showcase projects and generate bids.' },
  { name: 'Logistics', icon: 'truck', description: 'Real-time portals and tracking experiences.' },
  { name: 'Consulting', icon: 'briefcase', description: 'Position expertise and book more calls.' },
  { name: 'Real Estate', icon: 'building', description: 'Listings and lead capture that convert.' },
  { name: 'Technology', icon: 'code', description: 'SaaS marketing sites and product platforms.' },
];

export const processSteps: ProcessStep[] = [
  {
    step: 1,
    title: 'Discover',
    description:
      'We align on goals, audience, and success metrics through focused workshops and research.',
    icon: 'search',
  },
  {
    step: 2,
    title: 'Design',
    description:
      'We craft accessible, on-brand designs and validate them with prototypes before we build.',
    icon: 'palette',
  },
  {
    step: 3,
    title: 'Build',
    description:
      'We engineer in two-week sprints with staging previews and clear acceptance criteria.',
    icon: 'code',
  },
  {
    step: 4,
    title: 'Grow',
    description:
      'We launch, measure, and optimize — turning data into a compounding stream of improvements.',
    icon: 'lineChart',
  },
];

export const whyChooseUs: Feature[] = [
  {
    title: 'Outcome-obsessed',
    description:
      'We tie every deliverable to a business metric. If it does not move the needle, we do not build it.',
    icon: 'target',
  },
  {
    title: 'Senior, accountable team',
    description:
      'You work directly with senior practitioners — no hand-offs to junior teams after the sale.',
    icon: 'users',
  },
  {
    title: 'Built to last',
    description:
      'Clean architecture, design systems, and documentation you fully own from day one.',
    icon: 'layers',
  },
  {
    title: 'Accessible & fast by default',
    description:
      'WCAG compliance and Core Web Vitals budgets are baked into our process, not optional add-ons.',
    icon: 'gauge',
  },
  {
    title: 'Transparent process',
    description:
      'Sprint demos, staging previews, and written updates keep you informed every step of the way.',
    icon: 'workflow',
  },
  {
    title: 'Security-minded',
    description:
      'Secure defaults, dependency hygiene, and best-practice headers protect you and your users.',
    icon: 'shield',
  },
];

export const metrics: Metric[] = [
  { label: 'Projects delivered', value: '180+', description: 'Across 12 industries' },
  { label: 'Avg. conversion lift', value: '+38%', description: 'Within 90 days of launch' },
  { label: 'Client retention', value: '94%', description: 'Year over year' },
  { label: 'Avg. Lighthouse score', value: '98', description: 'On delivered sites' },
];

export function getFaqs(): Faq[] {
  return faqs;
}
