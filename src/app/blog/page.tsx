import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/sections/page-header';
import { Section } from '@/components/sections/section';
import { getBlogPosts } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description:
    'Practical insights on web performance, design, growth, and engineering from the team at our studio.',
  path: '/blog',
});

export default function BlogPage() {
  const posts = getBlogPosts();
  const [featured, ...rest] = posts;

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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Card key={post.slug} className="group relative flex flex-col hover:shadow-elevated">
              <CardHeader>
                <Badge variant="secondary" className="mb-2 w-fit">
                  {post.category}
                </Badge>
                <CardTitle>
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                <p className="mt-4 text-xs text-muted-foreground">
                  {post.author} · {formatDate(post.publishedAt)}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
