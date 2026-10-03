'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

const quoteSchema = z.object({
  name: z.string().min(1, 'Enter your name'),
  phone: z.string().regex(indianPhoneRegex, 'Enter a 10-digit phone number'),
  email: z.string().email('Enter a valid email').optional().or(z.literal('')),
  budget: z.string().optional(),
  message: z
    .string()
    .min(10, 'Tell us a little about your business (at least 10 characters)')
    .max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Spam detected'),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

export function ServiceQuoteForm({
  serviceName,
  serviceSlug,
}: {
  serviceName: string;
  serviceSlug: string;
}) {
  const [loadTimestamp] = useState<number>(() => Date.now());
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      budget: '',
      message: '',
      honeypot: '',
    },
  });

  const onSubmit = async (values: QuoteFormValues) => {
    setStatus('loading');
    setServerError('');
    trackEvent({ name: 'form_start', params: { formName: 'service_quote' } });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          services: [serviceName],
          loadTimestamp,
        }),
      });

      const json = await res.json();

      if (json.ok) {
        setStatus('success');
        reset();
        trackEvent({
          name: 'form_submit',
          params: { formName: 'service_quote', service: serviceSlug },
        });
      } else {
        setStatus('error');
        setServerError(json.error || "Your message didn't send. Check your connection or WhatsApp us.");
        trackEvent({
          name: 'form_error',
          params: { formName: 'service_quote', error: json.error || 'Submission failed' },
        });
      }
    } catch {
      setStatus('error');
      setServerError("Your message didn't send. Check your connection and try again, or message us on WhatsApp.");
    }
  };

  return (
    <div id="quote-form" className="p-8 sm:p-10 bg-paper border border-line rounded-3xl shadow-floating">
      <div className="max-w-xl mb-8">
        <span className="text-xs uppercase tracking-wider text-blue font-semibold block mb-1">
          Quick quote enquiry
        </span>
        <h3 className="text-2xl font-sans font-bold text-ink">
          Get a quote for {serviceName}
        </h3>
        <p className="text-sm text-mist mt-1">
          Tell us about your project. We reply within one business day with clear recommendations.
        </p>
      </div>

      {status === 'success' ? (
        <div className="p-6 bg-blue-tint/60 border border-blue/30 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 text-blue font-semibold">
            <CheckCircle2 className="w-5 h-5" />
            <span>Thanks, we got your message.</span>
          </div>
          <p className="text-sm text-graphite">
            We will reply on WhatsApp or by email within one business day. If it is urgent, feel free to call us at{' '}
            <a href={`tel:${siteConfig.contact.tel}`} className="text-blue font-medium underline">
              {siteConfig.contact.phone}
            </a>.
          </p>
          <Button variant="secondary" onClick={() => setStatus('idle')} className="mt-2 text-xs h-9 px-4">
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Hidden Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            {...register('honeypot')}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Your Name"
              placeholder="Furkan Mushtaq"
              required
              {...register('name')}
              error={errors.name?.message}
            />

            <Input
              label="Phone or WhatsApp"
              placeholder="+91 77809 40317"
              required
              {...register('phone')}
              error={errors.phone?.message}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="Email (optional)"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              error={errors.email?.message}
            />

            <Select
              label="Estimated Budget"
              {...register('budget')}
              placeholder="Select a budget range"
              options={[
                { value: 'under-10k', label: 'Under ₹10,000' },
                { value: '10k-25k', label: '₹10,000 to ₹25,000' },
                { value: '25k-60k', label: '₹25,000 to ₹60,000' },
                { value: 'above-60k', label: '₹60,000+' },
                { value: 'not-sure', label: 'Not sure yet' },
              ]}
            />
          </div>

          <Textarea
            label="Tell us about your business & goals"
            placeholder="Tell us what you want to build, current challenges, or any timeline in mind..."
            required
            {...register('message')}
            error={errors.message?.message}
            helperText="At least 10 characters."
          />

          {serverError && (
            <div className="p-4 rounded-xl bg-error/10 border border-error/20 flex items-start gap-2.5 text-xs text-error">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{serverError}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full sm:w-auto h-[52px] px-8 rounded-full bg-blue text-white font-medium text-[16px] hover:bg-blue-deep transition-colors disabled:opacity-50 cursor-pointer"
            >
              {status === 'loading' ? 'Sending...' : 'Send message'}
            </button>

            <span className="text-xs text-mist">
              Direct line: {siteConfig.contact.phone}
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
