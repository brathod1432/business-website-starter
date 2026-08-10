import robots, { AI_CRAWLERS, buildRobotsRules } from '@/app/robots';
import { absoluteUrl } from '@/lib/seo';

describe('robots', () => {
  it('always allows crawling and disallows /api/', () => {
    const rules = buildRobotsRules();
    const base = Array.isArray(rules) ? rules[0] : rules;
    expect(base?.allow).toBe('/');
    expect(base?.disallow).toContain('/api/');
  });

  it('links the sitemap', () => {
    expect(robots().sitemap).toBe(absoluteUrl('/sitemap.xml'));
  });

  it('exposes a non-empty AI crawler list', () => {
    expect(AI_CRAWLERS.length).toBeGreaterThan(5);
    expect(AI_CRAWLERS).toContain('GPTBot');
  });
});
