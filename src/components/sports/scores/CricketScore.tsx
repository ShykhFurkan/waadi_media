import React from 'react';
import { CricketScore as CricketScoreType } from '@/lib/sports/types';

interface Props {
  homeScore: CricketScoreType;
  awayScore: CricketScoreType;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const CricketScore: React.FC<Props> = ({ homeScore, awayScore, size = 'md' }) => {
  const homeOvers = `${Math.floor(homeScore.balls / 6)}.${homeScore.balls % 6}`;
  const awayOvers = `${Math.floor(awayScore.balls / 6)}.${awayScore.balls % 6}`;

  let titleClass = 'text-base font-bold';
  if (size === 'sm') titleClass = 'text-sm font-semibold';
  if (size === 'hero') titleClass = 'text-3xl sm:text-4xl font-extrabold';

  return (
    <div className="flex flex-col items-center text-center gap-0.5 font-mono text-[#111827]">
      <div className={`flex items-baseline gap-2 ${titleClass}`}>
        <span>{homeScore.runs}/{homeScore.wickets}</span>
        {homeScore.balls > 0 && (
          <span className="text-xs font-normal text-[#64748B]">({homeOvers})</span>
        )}
      </div>
      {awayScore.runs > 0 && (
        <div className="text-xs text-[#64748B]">
          vs {awayScore.runs}/{awayScore.wickets} ({awayOvers})
        </div>
      )}
    </div>
  );
};
