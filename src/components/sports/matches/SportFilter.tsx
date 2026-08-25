'use client';

import React from 'react';
import { SPORT_CATEGORIES } from '@/lib/sports/constants';

interface SportFilterProps {
  activeSport: string;
  onSelectSport: (sportId: string) => void;
}

export const SportFilter: React.FC<SportFilterProps> = ({ activeSport, onSelectSport }) => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-1">
      <div className="flex items-center gap-2 text-xs font-bold whitespace-nowrap">
        {SPORT_CATEGORIES.map((cat) => {
          const isActive = activeSport === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectSport(cat.id)}
              className={`px-4 py-2 rounded-xl transition-all border ${
                isActive
                  ? 'bg-[#0757E8] text-white border-[#0757E8] shadow-sm'
                  : 'bg-white text-[#111827] border-[#E5EAF2] hover:bg-[#F1F4F8]'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
