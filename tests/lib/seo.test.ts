import { absoluteUrl, buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

describe('absoluteUrl', () => {
  it('prefixes the site URL and normalizes slashes', () => {
    expect(absoluteUrl('/services')).toBe(`${siteConfig.url}/services`);
    expect(absoluteUrl('services')).toBe(`${siteConfig.url}/services`);
  });
});

describe('buildMetadata', () => {
  it('produces a default title from the site config', () => {
    const meta = buildMetadata();
    expect(meta.title).toContain(siteConfig.name);
  });

  it('composes a page title with the site name', () => {
    const meta = buildMetadata({ title: 'Pricing' });
    expect(meta.title).toBe(`Pricing | ${siteConfig.name}`);
  });

  it('sets a canonical URL for the given path', () => {
    const meta = buildMetadata({ path: '/blog' });
    expect(meta.alternates?.canonical).toBe(`${siteConfig.url}/blog`);
  });

  it('honors noIndex for private pages', () => {
    const meta = buildMetadata({ noIndex: true });
    expect(meta.robots).toMatchObject({ index: false, follow: false });
  });

  it('includes OpenGraph and Twitter card data', () => {
    const meta = buildMetadata({ title: 'About' });
    expect(meta.openGraph?.title).toBe(`About | ${siteConfig.name}`);
    expect(meta.twitter).toMatchObject({ card: 'summary_large_image' });
  });

  it('supports article type with published time', () => {
    const meta = buildMetadata({ type: 'article', publishedTime: '2026-01-01' });
    expect(meta.openGraph).toMatchObject({ type: 'article' });
  });
});
