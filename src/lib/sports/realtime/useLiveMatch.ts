'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { SportMatch } from '../types';
import { mapDbMatch } from '../mappers';

export function useLiveMatch(initialMatch: SportMatch | null): SportMatch | null {
  const [match, setMatch] = useState<SportMatch | null>(initialMatch);

  useEffect(() => {
    if (!match?.id) return;

    const channel = supabase
      .channel(`public-sports-match-${match.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'matches',
          filter: `id=eq.${match.id}`,
        },
        (payload) => {
          if (payload.new) {
            setMatch(mapDbMatch(payload.new));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [match?.id]);

  return match;
}
