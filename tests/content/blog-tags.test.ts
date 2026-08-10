import {
  getAllTags,
  getPostsByTag,
  getRelatedPosts,
  getTagBySlug,
  getTagSlugs,
  tagToSlug,
} from '@/content/blog';

describe('blog tags', () => {
  it('slugifies tags consistently', () => {
    expect(tagToSlug('Core Web Vitals')).toBe('core-web-vitals');
    expect(tagToSlug('  SEO ')).toBe('seo');
  });

  it('aggregates unique tags with counts, most frequent first', () => {
    const tags = getAllTags();
    expect(tags.length).toBeGreaterThan(0);
    const counts = tags.map((t) => t.count);
    expect([...counts]).toEqual([...counts].sort((a, b) => b - a));
  });

  it('exposes a slug for every tag and resolves back to its label', () => {
    const slugs = getTagSlugs();
    expect(slugs.length).toBe(getAllTags().length);
    const first = getAllTags()[0]!;
    expect(getTagBySlug(first.slug)).toBe(first.tag);
  });

  it('returns only posts carrying a given tag', () => {
    const first = getAllTags()[0]!;
    const posts = getPostsByTag(first.slug);
    expect(posts.length).toBe(first.count);
    expect(posts.every((p) => p.tags.some((t) => tagToSlug(t) === first.slug))).toBe(true);
  });

  it('returns undefined for an unknown tag slug', () => {
    expect(getTagBySlug('does-not-exist')).toBeUndefined();
    expect(getPostsByTag('does-not-exist')).toEqual([]);
  });

  it('suggests related posts by shared tags/category, excluding self', () => {
    const related = getRelatedPosts('core-web-vitals-that-actually-move-revenue');
    expect(related.every((p) => p.slug !== 'core-web-vitals-that-actually-move-revenue')).toBe(
      true,
    );
    expect(related.length).toBeLessThanOrEqual(3);
  });
});
