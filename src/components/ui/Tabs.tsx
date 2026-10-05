'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
}

export function Tabs({
  tabs,
  activeTab,
  onChange,
  className,
}: {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      className={cn(
        'inline-flex p-1.5 bg-paper-2 border-[2px] border-ink rounded-full gap-2 overflow-x-auto max-w-full',
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative px-5 h-11 min-h-[44px] flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-blue',
              isActive
                ? 'bg-ink text-white shadow-hard-sm'
                : 'text-ink/80 hover:text-ink hover:bg-paper'
            )}
          >
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
