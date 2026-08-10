'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { trackEvent } from '@/lib/analytics-events';
import { newsletterSchema, type NewsletterValues } from '@/lib/validations/newsletter';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function Newsletter() {
  const [status, setStatus] = React.useState<Status>('idle');
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '', company: '' },
  });

  async function onSubmit(values: NewsletterValues) {
    setStatus('submitting');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('failed');
      trackEvent('newsletter_subscribe', { form: 'newsletter' });
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <p className="flex items-center gap-2 text-sm text-accent" role="status">
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        You&rsquo;re subscribed — thanks!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-sm">
      <Label htmlFor="newsletter-email" className="text-sm font-semibold">
        Subscribe to our newsletter
      </Label>
      <p className="mb-3 mt-1 text-sm text-muted-foreground">
        Practical insights on growth, design, and engineering. No spam.
      </p>
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="newsletter-company">Leave empty</label>
        <input id="newsletter-company" tabIndex={-1} autoComplete="off" {...register('company')} />
      </div>
      <div className="flex gap-2">
        <Input
          id="newsletter-email"
          type="email"
          placeholder="you@company.com"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'newsletter-error' : undefined}
          {...register('email')}
        />
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
        </Button>
      </div>
      {errors.email ? (
        <p id="newsletter-error" role="alert" className="mt-2 text-sm text-destructive">
          {errors.email.message}
        </p>
      ) : null}
      {status === 'error' ? (
        <p role="alert" className="mt-2 text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}
