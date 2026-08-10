import type { Metadata } from 'next';

import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy',
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  path: '/privacy-policy',
});

const lastUpdated = 'August 1, 2026';

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Privacy Policy', href: '/privacy-policy' },
        ]}
      />

      <Section spacing="lg">
        <div className="prose-content mx-auto max-w-3xl">
          <p>
            This Privacy Policy explains how {siteConfig.legalName} (&ldquo;we&rdquo;,
            &ldquo;us&rdquo;) collects, uses, and safeguards your information when you use our
            website. This is a template intended as a starting point and should be reviewed by legal
            counsel before production use.
          </p>

          <h2>Information we collect</h2>
          <p>
            We collect information you provide directly — such as your name, email, phone number,
            and message when you submit a contact form — and limited technical data (like your
            browser type and pages visited) collected automatically to improve our services.
          </p>

          <h2>How we use your information</h2>
          <ul>
            <li>To respond to inquiries and provide requested services.</li>
            <li>To improve our website, content, and user experience.</li>
            <li>
              To send updates you have opted into, which you can unsubscribe from at any time.
            </li>
          </ul>

          <h2>Analytics &amp; cookies</h2>
          <p>
            We may use privacy-respecting analytics (such as Google Analytics with IP anonymization
            and Microsoft Clarity) to understand how visitors use our site. These tools are only
            loaded when configured and can be disabled.
          </p>

          <h2>How we share information</h2>
          <p>
            We do not sell your personal information. We share data only with trusted service
            providers who help us operate our business, and only as necessary to deliver our
            services.
          </p>

          <h2>Your rights</h2>
          <p>
            Depending on your location, you may have the right to access, correct, or delete your
            personal information. To exercise these rights, contact us at{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have questions about this policy, email{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a> or write
            to us at {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{' '}
            {siteConfig.contact.address.region} {siteConfig.contact.address.postalCode}.
          </p>
        </div>
      </Section>
    </>
  );
}
