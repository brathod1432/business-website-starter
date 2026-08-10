import type { MetadataRoute } from 'next';

import { absoluteUrl } from '@/lib/seo';
import { siteConfig } from '@/lib/site-config';

/** Known AI/LLM training crawlers, blocked when `siteConfig.seo.blockAiCrawlers` is true. */
export const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'CCBot',
  'Google-Extended',
  'Applebot-Extended',
  'PerplexityBot',
  'Bytespider',
  'Amazonbot',
  'Meta-ExternalAgent',
  'cohere-ai',
] as const;

/** Build the robots rule set (exported for testing). */
export function buildRobotsRules(): MetadataRoute.Robots['rules'] {
  const baseRule = { userAgent: '*', allow: '/', disallow: ['/api/'] };
  if (!siteConfig.seo?.blockAiCrawlers) return baseRule;
  return [baseRule, { userAgent: [...AI_CRAWLERS], disallow: '/' }];
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: buildRobotsRules(),
    sitemap: absoluteUrl('/sitemap.xml'),
    host: absoluteUrl('/'),
  };
}
