'use client';

import React, { useEffect, useState } from 'react';

interface ScoreDisplayProps {
  homeScore: number;
  awayScore: number;
  isCompleted?: boolean;
  isLive?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  className?: string;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  homeScore,
  awayScore,
  isCompleted = false,
  isLive = false,
  size = 'md',
  className = '',
}) => {
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 400);
    return () => clearTimeout(timer);
  }, [homeScore, awayScore]);

  const sizeClasses = {
    sm: 'text-lg gap-2',
    md: 'text-2xl gap-3',
    lg: 'text-4xl gap-4',
    hero: 'text-6xl gap-6',
  };

  const isHomeLeading = homeScore > awayScore && (isCompleted || isLive);
  const isAwayLeading = awayScore > homeScore && (isCompleted || isLive);

  const homeColor = isHomeLeading ? 'text-[#E8A33D]' : 'text-[#F7F5F0]';
  const awayColor = isAwayLeading ? 'text-[#E8A33D]' : 'text-[#F7F5F0]';

  return (
    <div
      className={`inline-flex items-center font-display tracking-tight transition-colors duration-150 ${sizeClasses[size]} ${
        flash ? 'animate-score-flash' : ''
      } ${className}`}
    >
      <span className={homeColor}>{homeScore}</span>
      <span className="text-[#8A9A91] font-body opacity-50">-</span>
      <span className={awayColor}>{awayScore}</span>
    </div>
  );
};
