import type { Metadata } from 'next';

import { siteConfig } from '@/lib/site-config';

type BuildMetadataInput = {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/services". */
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
  publishedTime?: string;
  authors?: string[];
};

/** Absolute URL helper anchored to the configured site URL. */
export function absoluteUrl(path = '/'): string {
  const base = siteConfig.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Central metadata builder used by every route to guarantee consistent
 * titles, canonical URLs, OpenGraph, and Twitter cards.
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = '/',
  image = siteConfig.ogImage,
  type = 'website',
  noIndex = false,
  publishedTime,
  authors,
}: BuildMetadataInput = {}): Metadata {
  const url = absoluteUrl(path);
  const resolvedTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  const imageUrl = image.startsWith('http') ? image : absoluteUrl(image);

  return {
    title: resolvedTitle,
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, 'max-image-preview': 'large' },
    openGraph: {
      title: resolvedTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: resolvedTitle }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: resolvedTitle,
      description,
      images: [imageUrl],
      creator: siteConfig.twitterHandle,
    },
  };
}
