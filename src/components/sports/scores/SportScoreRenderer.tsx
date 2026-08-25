import React from 'react';
import { SportScore, SportType } from '@/lib/sports/types';
import { FootballScore } from './FootballScore';
import { CricketScore } from './CricketScore';
import { BasketballScore } from './BasketballScore';
import { HockeyScore } from './HockeyScore';
import { TennisScore } from './TennisScore';

interface Props {
  sport: SportType;
  homeScore: SportScore;
  awayScore: SportScore;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const SportScoreRenderer: React.FC<Props> = ({
  sport,
  homeScore,
  awayScore,
  size = 'md',
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      {sport === 'football' && (
        <FootballScore
          homeScore={homeScore as any}
          awayScore={awayScore as any}
          size={size}
        />
      )}
      {sport === 'cricket' && (
        <CricketScore
          homeScore={homeScore as any}
          awayScore={awayScore as any}
          size={size}
        />
      )}
      {sport === 'basketball' && (
        <BasketballScore
          homeScore={homeScore as any}
          awayScore={awayScore as any}
          size={size}
        />
      )}
      {sport === 'hockey' && (
        <HockeyScore
          homeScore={homeScore as any}
          awayScore={awayScore as any}
          size={size}
        />
      )}
      {sport === 'tennis' && (
        <TennisScore
          homeScore={homeScore as any}
          awayScore={awayScore as any}
          size={size}
        />
      )}
    </div>
  );
};
