import React from 'react';
import { BasketballScore as BasketballScoreType } from '@/lib/sports/types';

interface Props {
  homeScore: BasketballScoreType;
  awayScore: BasketballScoreType;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const BasketballScore: React.FC<Props> = ({ homeScore, awayScore, size = 'md' }) => {
  let scoreClass = 'text-xl font-extrabold';
  if (size === 'sm') scoreClass = 'text-lg font-bold';
  if (size === 'lg') scoreClass = 'text-2xl font-extrabold';
  if (size === 'hero') scoreClass = 'text-5xl font-black';

  return (
    <div className={`flex items-center gap-3 font-mono text-[#111827] ${scoreClass}`}>
      <span>{homeScore.points}</span>
      <span className="text-[#94A3B8] font-normal">-</span>
      <span>{awayScore.points}</span>
    </div>
  );
};
