import type { Metadata } from 'next';

import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service',
  description: `The terms and conditions governing your use of the ${siteConfig.name} website.`,
  path: '/terms',
});

const lastUpdated = 'August 1, 2026';

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description={`Last updated: ${lastUpdated}`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Terms', href: '/terms' },
        ]}
      />

      <Section spacing="lg">
        <div className="prose-content mx-auto max-w-3xl">
          <p>
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the{' '}
            {siteConfig.legalName} website. This is a template intended as a starting point and
            should be reviewed by legal counsel before production use. By using our site, you agree
            to these Terms.
          </p>

          <h2>Use of our website</h2>
          <p>
            You agree to use our website lawfully and not to misuse it, interfere with its
            operation, or attempt to access it using a method other than the interface we provide.
          </p>

          <h2>Intellectual property</h2>
          <p>
            All content on this website — including text, graphics, logos, and code — is owned by or
            licensed to us and protected by applicable intellectual property laws. You may not
            reproduce it without permission.
          </p>

          <h2>Disclaimers</h2>
          <p>
            The website and its content are provided &ldquo;as is&rdquo; without warranties of any
            kind. We do not guarantee that the website will be uninterrupted, error-free, or free of
            harmful components.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {siteConfig.legalName} will not be liable for
            any indirect, incidental, or consequential damages arising from your use of the website.
          </p>

          <h2>Changes to these Terms</h2>
          <p>
            We may update these Terms from time to time. Continued use of the website after changes
            take effect constitutes acceptance of the revised Terms.
          </p>

          <h2>Contact us</h2>
          <p>
            Questions about these Terms? Email{' '}
            <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>.
          </p>
        </div>
      </Section>
    </>
  );
}
