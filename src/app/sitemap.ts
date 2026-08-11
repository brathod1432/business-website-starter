import type { MetadataRoute } from 'next';

import { getBlogPosts, getTagSlugs } from '@/content/blog';
import { getCaseStudies } from '@/content/case-studies';
import { getServices } from '@/content/services';
import { absoluteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    {
      url: absoluteUrl('/case-studies'),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: absoluteUrl('/pricing'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/blog'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    {
      url: absoluteUrl('/privacy-policy'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    { url: absoluteUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    {
      url: absoluteUrl('/accessibility'),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = getServices().map((service) => ({
    url: absoluteUrl(`/service/${service.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = getCaseStudies().map((study) => ({
    url: absoluteUrl(`/case-studies/${study.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const blogRoutes: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  const tagRoutes: MetadataRoute.Sitemap = getTagSlugs().map((tag) => ({
    url: absoluteUrl(`/blog/tag/${tag}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.4,
  }));

  return [...staticRoutes, ...serviceRoutes, ...caseStudyRoutes, ...blogRoutes, ...tagRoutes];
}
