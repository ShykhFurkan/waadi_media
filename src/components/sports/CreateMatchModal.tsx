'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { createMatch, Tournament, Team, Sponsor } from '@/lib/supabase';

interface CreateMatchModalProps {
  tournaments: Tournament[];
  teams: Team[];
  sponsors: Sponsor[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateMatchModal: React.FC<CreateMatchModalProps> = ({
  tournaments,
  teams,
  sponsors,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tournamentId, setTournamentId] = useState('');
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [filteredSponsors, setFilteredSponsors] = useState<Sponsor[]>([]);
  const [homeTeamId, setHomeTeamId] = useState('');
  const [awayTeamId, setAwayTeamId] = useState('');

  // 12-Hour Date & Time Selector state
  const [matchDate, setMatchDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [hour, setHour] = useState('04');
  const [minute, setMinute] = useState('30');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('PM');

  const [venue, setVenue] = useState('Bakshi Stadium, Srinagar');
  const [sponsorId, setSponsorId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tournaments.length > 0 && (!tournamentId || !tournaments.some((t) => t.id === tournamentId))) {
      setTournamentId(tournaments[0].id);
    }
  }, [tournaments, isOpen]);

  useEffect(() => {
    if (tournamentId) {
      const selectedTour = tournaments.find((t) => t.id === tournamentId);
      const matchingTeams = teams.filter(
        (team) =>
          team.tournament_id === tournamentId ||
          (!team.tournament_id && selectedTour && team.sport_id === selectedTour.sport_id)
      );
      setFilteredTeams(matchingTeams);

      const matchingSponsors = sponsors.filter(
        (s) => !s.tournament_id || s.tournament_id === tournamentId
      );
      setFilteredSponsors(matchingSponsors);

      if (matchingTeams.length > 0) {
        setHomeTeamId(matchingTeams[0].id);
        setAwayTeamId(matchingTeams[1]?.id || matchingTeams[0].id);
      } else {
        setHomeTeamId('');
        setAwayTeamId('');
      }
    }
  }, [tournamentId, teams, sponsors]);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!homeTeamId || !awayTeamId) {
      setError('Please add teams to this tournament before scheduling a match.');
      return;
    }
    if (homeTeamId === awayTeamId) {
      setError('Home and Away teams must be different');
      return;
    }
    if (!matchDate) {
      setError('Kickoff date is required');
      return;
    }

    // Convert 12-hour clock (hour, minute, ampm) into ISO string
    let h = parseInt(hour, 10);
    if (ampm === 'PM' && h < 12) h += 12;
    if (ampm === 'AM' && h === 12) h = 0;

    const formattedHour = String(h).padStart(2, '0');
    const isoDateTime = `${matchDate}T${formattedHour}:${minute}:00`;
    const scheduledIso = new Date(isoDateTime).toISOString();

    setLoading(true);
    setError('');

    const selectedTour = tournaments.find((t) => t.id === tournamentId);

    const { error: err } = await createMatch({
      tournament_id: tournamentId || undefined,
      sport_id: selectedTour?.sport_id,
      home_team_id: homeTeamId,
      away_team_id: awayTeamId,
      status: 'upcoming',
      scheduled_at: scheduledIso,
      venue,
      home_score: 0,
      away_score: 0,
      status_detail: 'Scheduled',
      sponsor_id: sponsorId || undefined,
    });

    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      onSuccess();
      onClose();
    }
  }

  const hoursList = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const minutesList = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-display text-base text-[#0F2A1E]">SCHEDULE MATCH</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          {error && <div className="p-3 rounded bg-red-50 text-red-600 text-xs font-mono">{error}</div>}

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Select Tournament
            </label>
            <select
              value={tournamentId}
              onChange={(e) => setTournamentId(e.target.value)}
              className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium text-slate-900"
            >
              {tournaments.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.edition || '1st Edition'} · {t.season})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
                Home Team
              </label>
              {filteredTeams.length > 0 ? (
                <select
                  value={homeTeamId}
                  onChange={(e) => setHomeTeamId(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium text-slate-900"
                >
                  {filteredTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.short_name})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-2.5 rounded bg-yellow-50 text-yellow-800 text-xs font-mono">
                  No teams in tournament. Add teams first.
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
                Away Team
              </label>
              {filteredTeams.length > 0 ? (
                <select
                  value={awayTeamId}
                  onChange={(e) => setAwayTeamId(e.target.value)}
                  className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium text-slate-900"
                >
                  {filteredTeams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name} ({team.short_name})
                    </option>
                  ))}
                </select>
              ) : (
                <div className="p-2.5 rounded bg-yellow-50 text-yellow-800 text-xs font-mono">
                  No teams in tournament. Add teams first.
                </div>
              )}
            </div>
          </div>

          {/* 12-Hour Date & Time Picker */}
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Match Date & Kickoff Time (12-Hour AM/PM)
            </label>
            <div className="grid grid-cols-12 gap-2">
              <input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
                className="col-span-5 rounded border border-slate-300 p-2.5 bg-white font-mono text-slate-900"
                required
              />
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="col-span-2 rounded border border-slate-300 p-2.5 bg-white font-mono text-slate-900 text-center"
              >
                {hoursList.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="col-span-2 rounded border border-slate-300 p-2.5 bg-white font-mono text-slate-900 text-center"
              >
                {minutesList.map((m) => (
                  <option key={m} value={m}>
                    :{m}
                  </option>
                ))}
              </select>
              <select
                value={ampm}
                onChange={(e) => setAmpm(e.target.value as 'AM' | 'PM')}
                className="col-span-3 rounded border border-slate-300 p-2.5 bg-[#0F2A1E] text-[#E8A33D] font-mono font-bold text-center"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Venue
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Match Sponsor (Optional)
            </label>
            <select
              value={sponsorId}
              onChange={(e) => setSponsorId(e.target.value)}
              className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium text-slate-900"
            >
              <option value="">No Sponsor</option>
              {filteredSponsors.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.tier || 'Match Sponsor'})
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || filteredTeams.length === 0}
              className="px-5 py-2 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332]"
            >
              {loading ? 'Scheduling...' : 'Schedule Match'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
