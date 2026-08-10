import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

import { CookieSettingsButton } from '@/components/consent/cookie-settings-button';
import { Logo } from '@/components/layout/logo';
import { Newsletter } from '@/components/sections/newsletter';
import { footerNav, siteConfig } from '@/lib/site-config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-secondary/40" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-14">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <a className="hover:text-primary" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <a className="hover:text-primary" href={siteConfig.contact.phoneHref}>
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" aria-hidden="true" />
                <span>
                  {siteConfig.contact.address.street}, {siteConfig.contact.address.city},{' '}
                  {siteConfig.contact.address.region} {siteConfig.contact.address.postalCode}
                </span>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.heading} aria-label={group.heading}>
                <h3 className="text-sm font-semibold">{group.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground hover:text-primary"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <Newsletter />
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <CookieSettingsButton />
            <ul className="flex gap-4">
              {siteConfig.social.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    className="text-sm text-muted-foreground hover:text-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
