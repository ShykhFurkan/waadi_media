'use client';

import { useState, useCallback } from 'react';
import { ContactFormData } from '@/lib/validations/contact';
import { trackEvent } from '@/lib/analytics';

interface UseContactSubmitOptions {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export function useContactSubmit(options?: UseContactSubmitOptions) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const resetStatus = useCallback(() => {
    setStatus('idle');
    setServerError(null);
  }, []);

  const submitContact = useCallback(
    async (formData: ContactFormData) => {
      setStatus('loading');
      setServerError(null);

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const json = await response.json().catch(() => ({}));

        if (response.ok && json.ok) {
          setStatus('success');
          trackEvent({
            name: 'form_submit',
            params: {
              formName: 'contact',
              service: formData.services?.[0] || 'general',
            },
          });
          options?.onSuccess?.();
          return { success: true };
        } else {
          const errorMsg =
            json.error ||
            "Your message didn't send. Check your connection and try again, or message us on WhatsApp.";
          setStatus('error');
          setServerError(errorMsg);
          trackEvent({
            name: 'form_error',
            params: {
              formName: 'contact',
              error: errorMsg,
            },
          });
          options?.onError?.(errorMsg);
          return { success: false, error: errorMsg };
        }
      } catch (err: unknown) {
        const errorMsg =
          "Your message didn't send. Check your connection and try again, or message us on WhatsApp.";
        setStatus('error');
        setServerError(errorMsg);
        trackEvent({
          name: 'form_error',
          params: {
            formName: 'contact',
            error: err instanceof Error ? err.message : 'Network error',
          },
        });
        options?.onError?.(errorMsg);
        return { success: false, error: errorMsg };
      }
    },
    [options]
  );

  return {
    status,
    serverError,
    submitContact,
    resetStatus,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
  };
}
