import React from 'react';
import { FootballScore as FootballScoreType } from '@/lib/sports/types';

interface Props {
  homeScore: FootballScoreType;
  awayScore: FootballScoreType;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const FootballScore: React.FC<Props> = ({ homeScore, awayScore, size = 'md' }) => {
  let scoreClass = 'text-xl font-extrabold';
  if (size === 'sm') scoreClass = 'text-lg font-bold';
  if (size === 'lg') scoreClass = 'text-2xl font-extrabold';
  if (size === 'hero') scoreClass = 'text-5xl sm:text-6xl md:text-7xl font-black tracking-tight';

  return (
    <div className={`flex items-center gap-2 sm:gap-4 font-mono text-[#111827] ${scoreClass}`}>
      <span>{homeScore.goals}</span>
      <span className="text-[#94A3B8] font-normal">-</span>
      <span>{awayScore.goals}</span>
    </div>
  );
};
