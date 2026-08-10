import type { CaseStudy } from '@/content/types';

const caseStudies: CaseStudy[] = [
  {
    slug: 'northwind-logistics-portal',
    title: 'A real-time portal that cut support tickets by 42%',
    client: 'Northwind Logistics',
    industry: 'Logistics',
    summary:
      'We rebuilt a legacy tracking portal into a fast, real-time experience that customers actually enjoy using.',
    challenge:
      'Northwind’s customers relied on phone calls and email to check shipment status. The legacy portal was slow, hard to use on mobile, and generated a flood of avoidable support tickets.',
    solution:
      'We delivered a Next.js portal with real-time tracking, proactive delay notifications, and a mobile-first interface backed by an automated CI/CD pipeline.',
    results: [
      { label: 'Support tickets', value: '-42%' },
      { label: 'Page load time', value: '1.1s' },
      { label: 'Mobile conversion', value: '+31%' },
    ],
    quote: {
      text: 'The new portal paid for itself in the first quarter. Our support team finally has room to breathe.',
      author: 'Dana Whitfield',
      role: 'VP of Customer Experience',
    },
    tags: ['Web Development', 'UX Design', 'Cloud & DevOps'],
  },
  {
    slug: 'meridian-health-booking',
    title: 'Online booking that grew appointments 3x',
    client: 'Meridian Health Group',
    industry: 'Healthcare',
    summary:
      'A HIPAA-conscious booking experience that made scheduling effortless for patients and staff alike.',
    challenge:
      'Patients could only book by phone during office hours, creating bottlenecks and no-shows. Staff spent hours on manual scheduling.',
    solution:
      'We designed an accessible, WCAG-compliant online booking flow with automated reminders and calendar sync, integrated with their existing systems.',
    results: [
      { label: 'Online appointments', value: '3x' },
      { label: 'No-show rate', value: '-27%' },
      { label: 'Accessibility score', value: '100' },
    ],
    quote: {
      text: 'Booking used to be our biggest complaint. Now it’s something patients compliment us on.',
      author: 'Dr. Alan Reyes',
      role: 'Practice Director',
    },
    tags: ['UX Design', 'Web Development', 'Accessibility'],
  },
  {
    slug: 'apex-legal-rebrand',
    title: 'A rebrand and site relaunch that doubled qualified leads',
    client: 'Apex Legal Partners',
    industry: 'Legal',
    summary:
      'A trustworthy new brand identity and a conversion-focused website that speaks to high-intent clients.',
    challenge:
      'Apex’s dated brand and website undersold their expertise. Their site ranked poorly and rarely produced qualified inquiries.',
    solution:
      'We delivered a refined brand system, a fast SEO-optimized website, and clear conversion paths tailored to each practice area.',
    results: [
      { label: 'Qualified leads', value: '+112%' },
      { label: 'Organic traffic', value: '+68%' },
      { label: 'Bounce rate', value: '-34%' },
    ],
    quote: {
      text: 'We look like the firm we actually are now — and the inbound leads reflect it.',
      author: 'Priya Nair',
      role: 'Managing Partner',
    },
    tags: ['Brand Design', 'Growth Marketing', 'Web Development'],
  },
];

export function getCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}
