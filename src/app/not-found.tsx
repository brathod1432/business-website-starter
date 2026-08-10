import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">404</p>
      <h1 className="mt-3 text-4xl font-bold sm:text-5xl">Page not found</h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Sorry, we couldn&rsquo;t find the page you&rsquo;re looking for. It may have been moved or
        removed.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact us</Link>
        </Button>
      </div>
    </div>
  );
}
