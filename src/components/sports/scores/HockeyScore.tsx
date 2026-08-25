import React from 'react';
import { HockeyScore as HockeyScoreType } from '@/lib/sports/types';

interface Props {
  homeScore: HockeyScoreType;
  awayScore: HockeyScoreType;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const HockeyScore: React.FC<Props> = ({ homeScore, awayScore, size = 'md' }) => {
  let scoreClass = 'text-xl font-extrabold';
  if (size === 'sm') scoreClass = 'text-lg font-bold';
  if (size === 'hero') scoreClass = 'text-5xl font-black';

  return (
    <div className={`flex items-center gap-3 font-mono text-[#111827] ${scoreClass}`}>
      <span>{homeScore.goals}</span>
      <span className="text-[#94A3B8] font-normal">-</span>
      <span>{awayScore.goals}</span>
    </div>
  );
};
