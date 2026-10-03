'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';
import { easeCustom } from '@/components/ui/MotionHelpers';

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
  const shouldReduceMotion = useReducedMotion();

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
              'relative px-5 py-2 rounded-full text-sm font-medium transition-colors duration-200 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-blue',
              isActive ? 'text-white' : 'text-graphite hover:text-ink'
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-blue rounded-full shadow-sm"
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: easeCustom }}
                style={{ zIndex: 0 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
