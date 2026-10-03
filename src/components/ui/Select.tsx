'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  containerClassName?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helperText,
      error,
      id,
      options,
      placeholder,
      containerClassName,
      className,
      required,
      ...props
    },
    ref
  ) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);
    const helperId = selectId ? `${selectId}-helper` : undefined;
    const errorId = selectId ? `${selectId}-error` : undefined;

    return (
      <div className={cn('w-full flex flex-col', containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-sm font-medium text-graphite mb-1.5"
          >
            {label}
            {required && <span className="text-mist ml-1 font-normal">(required)</span>}
          </label>
        )}
        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'w-full h-[52px] pl-4 pr-10 rounded-[12px] bg-paper text-ink font-sans text-[16px] border-[1.5px] appearance-none transition-colors cursor-pointer',
              'border-line hover:border-mist/60 focus:border-blue',
              'focus-visible:outline-2 focus-visible:outline-blue focus-visible:outline-offset-3',
              error && 'border-error focus:border-error focus-visible:outline-error',
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-mist">
            <ChevronDown className="w-5 h-5 stroke-[1.5]" />
          </div>
        </div>
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

Select.displayName = 'Select';
