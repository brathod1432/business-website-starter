'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getTurnstileToken, TurnstileWidget } from '@/components/security/turnstile';
import { trackEvent } from '@/lib/analytics-events';
import { contactFormSchema, type ContactFormValues } from '@/lib/validations/contact';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>('idle');
  const [serverError, setServerError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: '', company: '', email: '', phone: '', message: '', website: '' },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting');
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, turnstileToken: getTurnstileToken() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? 'Something went wrong. Please try again.');
      }
      trackEvent('contact_form_submit', { form: 'contact' });
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Unexpected error.');
    }
  }

  if (status === 'success') {
    return (
      <div
        role="status"
        ref={(el) => el?.focus()}
        tabIndex={-1}
        className="flex flex-col items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 p-8 text-center focus:outline-none"
      >
        <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden="true" />
        <h3 className="text-xl font-semibold">Thanks — we got your message!</h3>
        <p className="text-muted-foreground">
          We’ll be in touch within one business day. Keep an eye on your inbox.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Honeypot: hidden from users, catches naive bots. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required error={errors.name?.message}>
          <Input
            id="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
        </Field>
        <Field id="company" label="Company" error={errors.company?.message}>
          <Input
            id="company"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            {...register('company')}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="email" label="Email" required error={errors.email?.message}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </Field>
        <Field id="phone" label="Phone" error={errors.phone?.message}>
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
        </Field>
      </div>

      <Field id="message" label="Message" required error={errors.message?.message}>
        <Textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
      </Field>

      <TurnstileWidget />

      {status === 'error' && serverError ? (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === 'submitting'}
        className="w-full sm:w-auto"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </Button>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required ? (
          <span className="ml-0.5 text-destructive" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        )}
      </Label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
