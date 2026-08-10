import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { BlogPostCard } from '@/components/sections/blog-post-card';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { getAllTags, getPostsByTag, getTagBySlug, getTagSlugs } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag } = await params;
  const label = getTagBySlug(tag);
  if (!label) return buildMetadata({ title: 'Tag not found', noIndex: true });
  return buildMetadata({
    title: `#${label}`,
    description: `Articles tagged “${label}”.`,
    path: `/blog/tag/${tag}`,
  });
}

export default async function BlogTagPage({ params }: Params) {
  const { tag } = await params;
  const label = getTagBySlug(tag);
  if (!label) notFound();

  const posts = getPostsByTag(tag);
  const allTags = getAllTags();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title={`Tagged: ${label}`}
        description={`${posts.length} article${posts.length === 1 ? '' : 's'} on this topic.`}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: `#${label}`, href: `/blog/tag/${tag}` },
        ]}
      />

      <Section spacing="lg">
        <div className="mb-10 flex flex-wrap gap-2" aria-label="All topics">
          {allTags.map((t) => (
            <Link key={t.slug} href={`/blog/tag/${t.slug}`}>
              <Badge variant={t.slug === tag ? 'default' : 'secondary'}>
                #{t.tag} ({t.count})
              </Badge>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-10">
          <Link href="/blog" className="text-sm font-medium text-primary hover:underline">
            ← All articles
          </Link>
        </div>
      </Section>
    </>
  );
}
