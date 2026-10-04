'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

export function Accordion({
  items,
  allowMultiple = false,
  className,
}: {
  items: AccordionItemData[];
  allowMultiple?: boolean;
  className?: string;
}) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn('w-full space-y-4', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div
            key={item.id}
            className={cn(
              'border-[3px] border-ink rounded-[20px] bg-paper transition-all duration-150',
              isOpen ? 'shadow-hard-md bg-paper-2' : 'shadow-hard-sm hover:shadow-hard-md'
            )}
          >
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left font-display text-lg sm:text-xl font-bold text-ink cursor-pointer select-none"
            >
              <span className="pr-2">{item.question}</span>
              {/* Plus sticker that rotates 45 degrees */}
              <span
                className={cn(
                  'shrink-0 w-10 h-10 rounded-full border-[3px] border-ink flex items-center justify-center transition-all duration-200 shadow-hard-sm',
                  isOpen
                    ? 'rotate-45 bg-chinar text-white'
                    : 'bg-saffron text-ink hover:scale-105'
                )}
                aria-hidden="true"
              >
                <Plus className="w-5 h-5 stroke-[3]" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-all duration-200 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="px-5 sm:px-6 pb-6 pt-1 text-ink text-body leading-relaxed border-t-2 border-ink/15 mt-1">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
