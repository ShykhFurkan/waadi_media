'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, id, containerClassName, className, required, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const helperId = textareaId ? `${textareaId}-helper` : undefined;
    const errorId = textareaId ? `${textareaId}-error` : undefined;

    return (
      <div className={cn('w-full flex flex-col', containerClassName)}>
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-graphite mb-1.5"
          >
            {label}
            {required && <span className="text-mist ml-1 font-normal">(required)</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : helperText ? helperId : undefined}
          className={cn(
            'w-full min-h-[120px] p-4 rounded-[12px] bg-paper text-ink font-sans text-[16px] border-[1.5px] transition-colors leading-relaxed',
            'border-line hover:border-mist/60 focus:border-blue',
            'focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3',
            'placeholder:text-mist/70',
            error && 'border-error focus:border-error focus-visible:outline-error',
            className
          )}
          {...props}
        />
        {error ? (
          <p id={errorId} role="alert" className="text-xs text-error mt-1.5 font-medium">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-mist mt-1.5">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
