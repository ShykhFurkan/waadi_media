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
    <div className={cn('w-full divide-y divide-line border-y border-line', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `accordion-btn-${item.id}`;
        const panelId = `accordion-panel-${item.id}`;

        return (
          <div key={item.id} className="py-2">
            <button
              id={buttonId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(item.id)}
              className="w-full py-4 flex items-center justify-between gap-4 text-left font-sans text-lg font-medium text-ink hover:text-blue transition-colors cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-blue"
            >
              <span className="pr-4">{item.question}</span>
              <span
                className={cn(
                  'shrink-0 w-8 h-8 rounded-full border border-line flex items-center justify-center text-graphite transition-transform duration-300',
                  isOpen && 'rotate-45 text-blue border-blue'
                )}
                aria-hidden="true"
              >
                <Plus className="w-4 h-4 stroke-[1.5]" />
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                'grid transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-5 pr-12 text-graphite text-body leading-relaxed">
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
