import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { BlogPost } from '@/content/types';
import { formatDate } from '@/lib/utils';

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group relative flex flex-col hover:shadow-elevated">
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
  );
}
