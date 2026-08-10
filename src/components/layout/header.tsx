'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Logo } from '@/components/layout/logo';
import { ThemeToggle } from '@/components/theme/theme-toggle';
import { mainNav } from '@/lib/site-config';
import { cn } from '@/lib/utils';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Main navigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary',
                    isActive(item.href) ? 'text-primary' : 'text-foreground/80',
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm">
            <Link href="/contact">Contact</Link>
          </Button>
          <Button asChild size="sm">
            <Link href="/contact">Get started</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="border-t bg-background md:hidden"
        >
          <ul className="container flex flex-col gap-1 py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-secondary',
                    isActive(item.href) ? 'text-primary' : 'text-foreground',
                  )}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Button asChild className="w-full">
                <Link href="/contact">Get started</Link>
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
