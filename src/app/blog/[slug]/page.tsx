import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { BlogPostCard } from '@/components/sections/blog-post-card';
import { CTA } from '@/components/sections/cta';
import { PageHeader } from '@/components/sections/page-header';
import { Prose } from '@/components/sections/prose';
import { Section, SectionHeader } from '@/components/sections/section';
import { ArticleJsonLd } from '@/components/seo/json-ld';
import { getBlogPostBySlug, getBlogSlugs, getRelatedPosts, tagToSlug } from '@/content/blog';
import { buildMetadata } from '@/lib/seo';
import { formatDate, readingTime } from '@/lib/utils';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return buildMetadata({ title: 'Post not found', noIndex: true });
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: `/og?title=${encodeURIComponent(post.title)}`,
    type: 'article',
    publishedTime: post.publishedAt,
    authors: [post.author],
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug);

  return (
    <>
      <PageHeader
        eyebrow={post.category}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { name: 'Home', href: '/' },
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${post.slug}` },
        ]}
      />

      <Section spacing="lg">
        <article className="mx-auto max-w-3xl">
          <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{post.author}</span>
            <span>·</span>
            <span>{post.authorRole}</span>
            <span>·</span>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span>·</span>
            <span>{readingTime(post.content)} min read</span>
          </div>

          <Prose content={post.content} />

          <div className="mt-10 flex flex-wrap gap-2 border-t pt-6">
            {post.tags.map((tag) => (
              <Link key={tag} href={`/blog/tag/${tagToSlug(tag)}`}>
                <Badge variant="secondary">#{tag}</Badge>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </article>
      </Section>

      {related.length > 0 ? (
        <Section spacing="lg" muted aria-labelledby="related-heading">
          <SectionHeader
            eyebrow="Keep reading"
            title="Related articles"
            description="More on the topics covered in this post."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r) => (
              <BlogPostCard key={r.slug} post={r} />
            ))}
          </div>
        </Section>
      ) : null}

      <CTA />
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        publishedAt={post.publishedAt}
        author={post.author}
      />
    </>
  );
}
