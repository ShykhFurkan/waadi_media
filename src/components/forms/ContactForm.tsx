'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  ContactFormData,
  budgetOptions,
} from '@/lib/validations/contact';
import { useContactSubmit } from '@/hooks/useContactSubmit';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/services';
import { packagesData } from '@/data/packages';
import { pricingItems } from '@/data/pricing';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICE_CHIP_OPTIONS = [
  ...servicesData.map((s) => s.name),
  'Not sure yet',
];

interface ContactFormProps {
  initialServices?: string[];
  initialMessage?: string;
  sourcePage?: string;
  className?: string;
}

export function ContactForm({
  initialServices = [],
  initialMessage = '',
  sourcePage = '/contact',
  className,
}: ContactFormProps) {
  const searchParams = useSearchParams();
  const [loadTimestamp] = useState<number>(() => Date.now());
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      services: initialServices,
      budget: 'Not sure',
      message: initialMessage,
      honeypot: '',
      loadTimestamp,
      sourcePage,
    },
  });

  const selectedServices = useWatch({ control, name: 'services' }) || [];

  // Query parameter prefill: ?service=, ?package=, ?items=
  useEffect(() => {
    if (!searchParams) return;

    const serviceParam = searchParams.get('service');
    const packageParam = searchParams.get('package');
    const itemsParam = searchParams.get('items');

    if (!serviceParam && !packageParam && !itemsParam) return;

    const currentServices = getValues('services') || [];
    const newServices = new Set<string>(currentServices);
    const prefillNotes: string[] = [];

    if (serviceParam) {
      const matchedService = servicesData.find(
        (s) => s.slug === serviceParam
      );
      if (matchedService) {
        newServices.add(matchedService.name);
      } else {
        const matchedItem = pricingItems.find((p) => p.id === serviceParam);
        if (matchedItem) {
          const parentService = servicesData.find((s) => s.slug === matchedItem.serviceSlug);
          if (parentService) newServices.add(parentService.name);
          prefillNotes.push(`Service item: ${matchedItem.label}`);
        }
      }
    }

    if (packageParam) {
      const matchedPkg = packagesData.find((p) => p.id === packageParam);
      if (matchedPkg) {
        prefillNotes.push(`Package: ${matchedPkg.name}`);
      }
    }

    if (itemsParam) {
      const itemIds = itemsParam.split(',').filter(Boolean);
      const matchedNames: string[] = [];
      itemIds.forEach((id) => {
        const item = pricingItems.find((p) => p.id === id);
        if (item) {
          matchedNames.push(item.label);
          const parentService = servicesData.find((s) => s.slug === item.serviceSlug);
          if (parentService) newServices.add(parentService.name);
        }
      });
      if (matchedNames.length > 0) {
        prefillNotes.push(`Selected items: ${matchedNames.join(', ')}`);
      }
    }

    if (newServices.size > currentServices.length) {
      setValue('services', Array.from(newServices));
    }

    const currentMessage = getValues('message');
    if (prefillNotes.length > 0 && !currentMessage) {
      setValue('message', `Hi Waadi Media, I am interested in:\n- ${prefillNotes.join('\n- ')}`);
    }
  }, [searchParams, setValue, getValues]);

  const { serverError, submitContact, resetStatus, isLoading, isSuccess } =
    useContactSubmit({
      onSuccess: () => {
        reset();
      },
    });

  const handleFirstInteraction = () => {
    if (!hasStartedForm) {
      setHasStartedForm(true);
      trackEvent({ name: 'form_start', params: { formName: 'contact' } });
    }
  };

  const toggleServiceChip = (serviceName: string) => {
    handleFirstInteraction();
    if (serviceName === 'Not sure yet') {
      if (selectedServices.includes('Not sure yet')) {
        setValue(
          'services',
          selectedServices.filter((s) => s !== 'Not sure yet')
        );
      } else {
        setValue('services', ['Not sure yet']);
      }
      return;
    }

    const withoutNotSure = selectedServices.filter((s) => s !== 'Not sure yet');
    if (withoutNotSure.includes(serviceName)) {
      setValue(
        'services',
        withoutNotSure.filter((s) => s !== serviceName)
      );
    } else {
      setValue('services', [...withoutNotSure, serviceName]);
    }
  };

  const onSubmit = (data: ContactFormData) => {
    submitContact({
      ...data,
      loadTimestamp,
      sourcePage,
    });
  };

  if (isSuccess) {
    return (
      <div
        className={cn(
          'p-8 sm:p-10 bg-paper border border-line rounded-3xl text-center space-y-4 shadow-floating',
          className
        )}
      >
        <div className="w-14 h-14 rounded-full bg-blue-tint text-blue mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-h2 text-ink">Thanks, we got your message.</h2>
        <p className="text-lead text-graphite max-w-md mx-auto">
          We&apos;ll reply on WhatsApp or by email within one business day. If it&apos;s urgent, call{' '}
          <a href={`tel:${siteConfig.contact.tel}`} className="text-blue font-medium underline">
            {siteConfig.contact.phone}
          </a>
          .
        </p>
        <div className="pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={resetStatus}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onFocus={handleFirstInteraction}
      className={cn('p-8 sm:p-10 bg-paper border border-line rounded-3xl space-y-6 shadow-floating', className)}
      noValidate
    >
      {/* Honeypot field (hidden from real users) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('honeypot')}
        />
      </div>

      {/* Name */}
      <div>
        <Input
          label="Name"
          required
          placeholder="Furkan Mushtaq"
          error={errors.name?.message}
          {...register('name')}
        />
      </div>

      {/* Phone or WhatsApp */}
      <div>
        <Input
          label="Phone or WhatsApp"
          type="tel"
          required
          placeholder="+91 77809 40317"
          helperText="10-digit Indian phone number"
          error={errors.phone?.message}
          {...register('phone')}
        />
      </div>

      {/* Email (optional) */}
      <div>
        <Input
          label="Email (optional)"
          type="email"
          placeholder="you@yourbusiness.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* What do you need? Multi-select chips */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-graphite">
          What do you need?
        </label>
        <div className="flex flex-wrap gap-2">
          {SERVICE_CHIP_OPTIONS.map((name) => {
            const isSelected = selectedServices.includes(name);
            return (
              <button
                key={name}
                type="button"
                onClick={() => toggleServiceChip(name)}
                className={cn(
                  'px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer',
                  isSelected
                    ? 'bg-blue text-white border-blue'
                    : 'bg-snow text-graphite border-line hover:border-mist'
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Budget */}
      <div>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <Select
              label="Budget"
              options={budgetOptions.map((b) => ({ value: b, label: b }))}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Tell us about your business */}
      <div>
        <Textarea
          label="Tell us about your business"
          required
          rows={4}
          placeholder="What does your business do, and what do you want help with?"
          error={errors.message?.message}
          {...register('message')}
        />
      </div>

      {serverError && (
        <div className="p-4 bg-error/10 border border-error/30 rounded-xl text-sm text-ink flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-error shrink-0 mt-0.5" />
          <div>
            <strong className="block text-ink font-semibold">Your message didn&apos;t send.</strong>
            <p className="text-graphite mt-0.5">
              Check your connection and try again, or{' '}
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-whatsapp font-medium underline"
              >
                message us on WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div>
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? 'Sending' : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
