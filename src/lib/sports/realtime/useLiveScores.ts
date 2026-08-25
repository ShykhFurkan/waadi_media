'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SportMatch } from '../types';
import { mapDbMatch } from '../mappers';

export function useLiveScores(initialMatches: SportMatch[]): SportMatch[] {
  const [matches, setMatches] = useState<SportMatch[]>(initialMatches);

  useEffect(() => {
    // Only subscribe if there are live matches
    const liveMatchIds = matches.filter((m) => m.status === 'live').map((m) => m.id);

    const channel = supabase
      .channel('public-sports-live-scores')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'matches' },
        (payload) => {
          if (payload.new) {
            const updatedMatch = mapDbMatch(payload.new);
            setMatches((prev) =>
              prev.map((m) => (m.id === updatedMatch.id ? updatedMatch : m))
            );
          }
        }
      )
      .subscribe();

    // Clean up subscription on unmount or re-render
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return matches;
}
