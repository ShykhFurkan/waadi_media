'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm, Controller, useWatch, FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  contactFormSchema,
  ContactFormData,
  budgetOptions,
  sanitizePhoneNumber,
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
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
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

  const onInvalid = (fieldErrors: FieldErrors<ContactFormData>) => {
    const errorKeys = Object.keys(fieldErrors);
    if (errorKeys.length > 0) {
      const firstField = errorKeys[0];
      const el = document.querySelector(`[name="${firstField}"]`) as HTMLElement | null;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus();
      }
    }
  };

  const onSubmit = (data: ContactFormData) => {
    submitContact({
      ...data,
      phone: sanitizePhoneNumber(data.phone),
      loadTimestamp,
      sourcePage,
    });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    handleFirstInteraction();
    e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess && successRef.current) {
      successRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (serverError && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [serverError]);

  if (isSuccess) {
    return (
      <div
        ref={successRef}
        role="status"
        aria-live="polite"
        className={cn(
          'p-6 sm:p-10 bg-paper border-[3px] border-ink rounded-[24px] text-center space-y-5 shadow-hard-md animate-pop-overshoot',
          className
        )}
      >
        <div className="w-16 h-16 rounded-full bg-mint border-[3px] border-ink text-ink mx-auto flex items-center justify-center shadow-hard-sm">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>
        <div className="space-y-2">
          <span className="inline-block px-3.5 py-1 bg-mint text-ink text-xs font-bold uppercase tracking-wider rounded-full border-2 border-ink shadow-hard-sm">
            ✓ Message Sent Successfully
          </span>
          <h2 className="text-h2 text-ink">Thanks, we got your message!</h2>
        </div>
        <p className="text-lead text-ink/80 max-w-md mx-auto">
          We&apos;ll reply on WhatsApp or by email within one business day. If it&apos;s urgent, feel free to call us at{' '}
          <a href={`tel:${siteConfig.contact.tel}`} className="text-chinar font-bold underline">
            {siteConfig.contact.phone}
          </a>
          .
        </p>
        <div className="pt-2">
          <Button
            type="button"
            variant="saffron"
            onClick={resetStatus}
            className="h-11 min-h-[44px]"
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocus={handleFirstInteraction}
      className={cn('p-6 sm:p-10 bg-paper border-[3px] border-ink rounded-[24px] space-y-6 shadow-hard-md', className)}
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
          autoComplete="name"
          enterKeyHint="next"
          onFocus={handleInputFocus}
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
          inputMode="tel"
          autoComplete="tel"
          enterKeyHint="next"
          onFocus={handleInputFocus}
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
          inputMode="email"
          autoComplete="email"
          enterKeyHint="next"
          onFocus={handleInputFocus}
          placeholder="you@yourbusiness.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {/* What do you need? Multi-select chips (44px min height, 8px gap) */}
      <div className="space-y-2">
        <label className="block text-sm font-bold text-ink">
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
                  'h-11 min-h-[44px] px-4 rounded-full text-xs font-bold border-[2px] border-ink transition-colors cursor-pointer select-none shadow-hard-sm active:translate-y-0.5',
                  isSelected
                    ? 'bg-chinar text-white'
                    : 'bg-white text-ink hover:bg-paper'
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
              onFocus={handleInputFocus}
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
          enterKeyHint="send"
          onFocus={handleInputFocus}
          placeholder="What does your business do, and what do you want help with?"
          error={errors.message?.message}
          {...register('message')}
        />
      </div>

      {serverError && (
        <div
          ref={errorRef}
          role="alert"
          aria-live="assertive"
          className="p-4 bg-chinar/10 border-[3px] border-chinar rounded-2xl text-sm text-ink flex items-start gap-3 shadow-hard-sm animate-pop-overshoot"
        >
          <AlertCircle className="w-5 h-5 text-chinar shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="block text-ink font-bold text-base">Your message could not be sent</strong>
            <p className="text-ink/80 text-sm">{serverError}</p>
            <p className="text-xs text-ink/70 pt-0.5">
              Please check your connection and try again, or{' '}
              <a
                href={siteConfig.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-chinar font-bold underline"
              >
                message us directly on WhatsApp
              </a>
              .
            </p>
          </div>
        </div>
      )}

      {/* Form validation warning banner */}
      {Object.keys(errors).length > 0 && (
        <div className="p-3.5 bg-chinar/10 border-[2px] border-chinar rounded-xl text-sm font-semibold text-chinar flex items-center gap-2.5 animate-pop-overshoot">
          <AlertCircle className="w-5 h-5 shrink-0 text-chinar" />
          <span>Please fill in the required fields highlighted above before sending.</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="saffron"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit, onInvalid)}
          className="w-full h-12 min-h-[44px] text-base font-bold shadow-hard-sm flex items-center justify-center gap-2"
        >
          {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
          {isLoading
            ? 'Sending message...'
            : serverError
            ? 'Failed to send — Click to try again'
            : 'Send message'}
        </Button>
      </div>
    </form>
  );
}
