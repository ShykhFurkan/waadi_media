'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Radio, Clock, CheckCircle2 } from 'lucide-react';

interface MatchControlBarProps {
  activeTab: 'live' | 'upcoming' | 'results' | 'all';
  onTabChange: (tab: 'live' | 'upcoming' | 'results' | 'all') => void;
  selectedDate?: string;
  onDateChange?: (date: string) => void;
}

export const MatchControlBar: React.FC<MatchControlBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  const [dayOffset, setDayOffset] = useState(0);

  const dates = [-1, 0, 1].map((offset) => {
    const d = new Date();
    d.setDate(d.getDate() + offset + dayOffset);
    const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = d.getDate();
    const month = d.toLocaleDateString('en-US', { month: 'short' });
    const isToday = offset + dayOffset === 0;
    return {
      label: isToday ? 'TODAY' : `${dayNum} ${month}`,
      sub: dayName,
      isToday,
      iso: d.toISOString().split('T')[0],
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-[#E5EAF2] p-3 sm:p-4 shadow-xs space-y-3 font-sans">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Date Selector */}
        <div className="flex items-center gap-2 bg-[#F1F4F8] p-1 rounded-xl">
          <button
            onClick={() => setDayOffset(dayOffset - 1)}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-white transition-colors"
            title="Previous Day"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1">
            {dates.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setDayOffset(dayOffset + (idx - 1))}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  item.isToday
                    ? 'bg-[#0757E8] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827] hover:bg-white/80'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => setDayOffset(dayOffset + 1)}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#111827] hover:bg-white transition-colors"
            title="Next Day"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Match Category Filters */}
        <div className="flex items-center gap-1.5 bg-[#F1F4F8] p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => onTabChange('all')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#0757E8] shadow-xs'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            All Matches
          </button>

          <button
            onClick={() => onTabChange('live')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'live'
                ? 'bg-[#EF233C] text-white shadow-xs'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            <span>Live</span>
          </button>

          <button
            onClick={() => onTabChange('upcoming')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'upcoming'
                ? 'bg-white text-[#0757E8] shadow-xs'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Clock size={13} />
            <span>Upcoming</span>
          </button>

          <button
            onClick={() => onTabChange('results')}
            className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'results'
                ? 'bg-white text-[#0757E8] shadow-xs'
                : 'text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <CheckCircle2 size={13} />
            <span>Results</span>
          </button>
        </div>
      </div>
    </div>
  );
};
