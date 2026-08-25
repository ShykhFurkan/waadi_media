import React from 'react';
import { TennisScore as TennisScoreType } from '@/lib/sports/types';

interface Props {
  homeScore: TennisScoreType;
  awayScore: TennisScoreType;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const TennisScore: React.FC<Props> = ({ homeScore, awayScore }) => {
  return (
    <div className="flex flex-col items-center gap-1 font-mono text-sm">
      <div className="flex items-center gap-2">
        {homeScore.sets.map((set, idx) => (
          <span key={idx} className="bg-[#F1F4F8] px-1.5 py-0.5 rounded text-xs font-bold text-[#111827]">
            {set.home}-{set.away}
          </span>
        ))}
      </div>
      {homeScore.currentGame && (
        <div className="text-xs text-[#0757E8] font-bold">
          Game: {homeScore.currentGame.home} - {homeScore.currentGame.away}
        </div>
      )}
    </div>
  );
};
