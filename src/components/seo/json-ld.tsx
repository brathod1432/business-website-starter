import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

/** Renders a JSON-LD <script> block. Safe: data is server-controlled. */
function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.legalName,
        alternateName: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl('/logo.svg'),
        description: siteConfig.description,
        foundingDate: siteConfig.founded,
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: siteConfig.contact.address.street,
          addressLocality: siteConfig.contact.address.city,
          addressRegion: siteConfig.contact.address.region,
          postalCode: siteConfig.contact.address.postalCode,
          addressCountry: siteConfig.contact.address.country,
        },
        sameAs: siteConfig.social.map((s) => s.href),
      }}
    />
  );
}

export function WebsiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteConfig.name,
        url: siteConfig.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: `${siteConfig.url}/blog?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; href: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.href),
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  slug,
  publishedAt,
  author,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  author: string;
  image?: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        datePublished: publishedAt,
        dateModified: publishedAt,
        author: { '@type': 'Person', name: author },
        publisher: {
          '@type': 'Organization',
          name: siteConfig.legalName,
          logo: { '@type': 'ImageObject', url: absoluteUrl('/logo.svg') },
        },
        mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
        image: image ? absoluteUrl(image) : absoluteUrl(siteConfig.ogImage),
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        provider: { '@type': 'Organization', name: siteConfig.legalName, url: siteConfig.url },
        url: absoluteUrl(`/service/${slug}`),
        areaServed: 'Worldwide',
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      }}
    />
  );
}
