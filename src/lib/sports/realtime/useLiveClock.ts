'use client';

import { useState, useEffect } from 'react';
import { MatchStatus } from '../types';

export function useLiveClock(startedAt?: string, status?: MatchStatus, fallbackText?: string): string {
  const [clockText, setClockText] = useState<string>(fallbackText || '00:00');

  useEffect(() => {
    if (status !== 'live' || !startedAt) {
      if (fallbackText) setClockText(fallbackText);
      return;
    }

    const calculateTime = () => {
      const startMs = new Date(startedAt).getTime();
      const nowMs = Date.now();
      const elapsedSeconds = Math.max(0, Math.floor((nowMs - startMs) / 1000));

      const minutes = Math.floor(elapsedSeconds / 60);
      const seconds = elapsedSeconds % 60;

      const formatted = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      setClockText(formatted);
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);

    return () => clearInterval(interval);
  }, [startedAt, status, fallbackText]);

  return clockText;
}
