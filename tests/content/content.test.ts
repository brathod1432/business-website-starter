import { getBlogPostBySlug, getBlogPosts, getFeaturedPosts } from '@/content/blog';
import { getCaseStudies, getCaseStudyBySlug } from '@/content/case-studies';
import { getFeaturedServices, getServiceBySlug, getServices } from '@/content/services';
import { iconMap } from '@/lib/icons';

describe('services repository', () => {
  it('returns services and resolves by slug', () => {
    const services = getServices();
    expect(services.length).toBeGreaterThan(0);
    const first = services[0]!;
    expect(getServiceBySlug(first.slug)).toEqual(first);
  });

  it('returns only featured services from getFeaturedServices', () => {
    expect(getFeaturedServices().every((s) => s.featured)).toBe(true);
  });

  it('references icons that exist in the icon registry', () => {
    for (const service of getServices()) {
      expect(iconMap).toHaveProperty(service.icon);
    }
  });

  it('returns undefined for an unknown slug', () => {
    expect(getServiceBySlug('does-not-exist')).toBeUndefined();
  });
});

describe('blog repository', () => {
  it('sorts posts by newest first', () => {
    const posts = getBlogPosts();
    const times = posts.map((p) => new Date(p.publishedAt).getTime());
    const sorted = [...times].sort((a, b) => b - a);
    expect(times).toEqual(sorted);
  });

  it('resolves a post by slug', () => {
    const post = getBlogPosts()[0]!;
    expect(getBlogPostBySlug(post.slug)?.title).toBe(post.title);
  });

  it('returns only featured posts from getFeaturedPosts', () => {
    expect(getFeaturedPosts().every((p) => p.featured)).toBe(true);
  });
});

describe('case studies repository', () => {
  it('returns case studies and resolves by slug', () => {
    const studies = getCaseStudies();
    expect(studies.length).toBeGreaterThan(0);
    expect(getCaseStudyBySlug(studies[0]!.slug)).toEqual(studies[0]);
  });
});
