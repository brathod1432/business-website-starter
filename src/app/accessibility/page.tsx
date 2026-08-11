import type { Metadata } from 'next';

import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata({
  title: 'Accessibility Statement',
  description: `How ${siteConfig.name} works to keep this website usable for everyone, and how to reach us about access barriers.`,
  path: '/accessibility',
});

const lastUpdated = 'August 1, 2026';

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Accessibility Statement"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Accessibility', href: '/accessibility' },
        ]}
      />

      <Section spacing="lg">
        <div className="prose-content mx-auto max-w-3xl">
          <p>
            {siteConfig.legalName} is committed to making this website accessible to the widest
            possible audience, regardless of ability or technology. This is a template statement —
            review and adapt it to your organization before publishing.
          </p>

          <h2>Standard we aim for</h2>
          <p>
            We target conformance with the{' '}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
            </a>
            . These guidelines explain how to make web content more accessible to people with a wide
            range of disabilities.
          </p>

          <h2>What we do</h2>
          <ul>
            <li>
              Semantic HTML with landmarks, a skip-to-content link, and a logical heading order.
            </li>
            <li>Full keyboard operability with visible focus indicators.</li>
            <li>Labelled form fields with errors announced to assistive technology.</li>
            <li>Color choices checked for contrast, and support for reduced-motion preferences.</li>
            <li>
              Automated accessibility checks (axe-core) run against every page in our test suite.
            </li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            Despite our efforts, some content may not yet be fully accessible. We treat reported
            barriers as bugs and prioritize fixing them.
          </p>

          <h2>Give us feedback</h2>
          <p>
            If you encounter an accessibility barrier on this site, please tell us so we can put it
            right. Email{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or call{' '}
            <a href={siteConfig.contact.phoneHref}>{siteConfig.contact.phone}</a>. We aim to respond
            within a few business days.
          </p>
        </div>
      </Section>
    </>
  );
}
