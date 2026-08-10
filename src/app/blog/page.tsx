import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { BlogPostCard } from '@/components/sections/blog-post-card';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { getAllTags, getBlogPosts } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  ...buildMetadata({
    title: 'Blog',
    description:
      'Practical insights on web performance, design, growth, and engineering from the team at our studio.',
    path: '/blog',
  }),
  alternates: {
    canonical: '/blog',
    types: { 'application/rss+xml': '/feed.xml' },
  },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;
  const tags = getAllTags();

  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Insights to help you grow"
        description="Field-tested advice on performance, design, growth, and engineering — no fluff."
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
        ]}
      />

      <Section spacing="lg">
        {featured ? (
          <Card className="group relative mb-10 overflow-hidden hover:shadow-elevated">
            <CardContent className="p-8">
              <Badge className="mb-3">{featured.category}</Badge>
              <h2 className="text-2xl font-bold sm:text-3xl">
                <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">{featured.excerpt}</p>
              <p className="mt-4 text-sm text-muted-foreground">
                {featured.author} · {formatDate(featured.publishedAt)}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Read article
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </CardContent>
          </Card>
        ) : null}

        {tags.length > 0 ? (
          <div className="mb-10 flex flex-wrap items-center gap-2" aria-label="Browse by topic">
            <span className="mr-1 text-sm font-medium text-muted-foreground">Topics:</span>
            {tags.map((t) => (
              <Link key={t.slug} href={`/blog/tag/${t.slug}`}>
                <Badge variant="secondary">
                  #{t.tag} ({t.count})
                </Badge>
              </Link>
            ))}
          </div>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
