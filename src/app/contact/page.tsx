import type { Metadata } from 'next';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';

import { ContactForm } from '@/components/sections/contact-form';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch to book a free strategy call or discuss your project. We reply within one business day.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Let’s build something great"
        description="Tell us about your goals and we’ll get back to you within one business day."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ]}
      />

      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="text-2xl font-semibold">Send us a message</h2>
            <p className="mt-2 text-muted-foreground">
              Fill out the form and our team will reach out shortly.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside>
            <div className="rounded-lg border bg-secondary/40 p-6">
              <h2 className="text-lg font-semibold">Other ways to reach us</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      className="text-muted-foreground hover:text-primary"
                      href={`mailto:${siteConfig.contact.email}`}
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a
                      className="text-muted-foreground hover:text-primary"
                      href={siteConfig.contact.phoneHref}
                    >
                      {siteConfig.contact.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Office</p>
                    <p className="text-muted-foreground">
                      {siteConfig.contact.address.street}
                      <br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.region}{' '}
                      {siteConfig.contact.address.postalCode}
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-muted-foreground">Mon–Fri, 9am–6pm PT</p>
                  </div>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
