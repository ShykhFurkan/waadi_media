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
        'inline-flex p-1 bg-snow border border-line rounded-full gap-1 overflow-x-auto max-w-full',
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
              'relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-blue',
              isActive
                ? 'bg-blue text-white shadow-sm'
                : 'text-graphite hover:text-ink hover:bg-paper'
            )}
          >
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
