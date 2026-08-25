'use client';

import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { SportTeam } from '@/lib/sports/types';
import { getTeams } from '@/lib/sports/repositories/teams';
import { registerTeamsToCompetition, getRegisteredTeams } from '@/lib/sports/repositories/competitions';

interface RegisterTeamModalProps {
  competitionId: string;
  competitionName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const RegisterTeamModal: React.FC<RegisterTeamModalProps> = ({
  competitionId,
  competitionName,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [allTeams, setAllTeams] = useState<SportTeam[]>([]);
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && competitionId) {
      loadData();
    }
  }, [isOpen, competitionId]);

  async function loadData() {
    setLoading(true);
    const [teams, regTeams] = await Promise.all([
      getTeams(),
      getRegisteredTeams(competitionId),
    ]);

    const regSet = new Set(regTeams.map((t) => t.id));
    setAllTeams(teams);
    setRegisteredIds(regSet);
    setSelectedIds(new Set(regSet)); // Pre-check already registered teams
    setLoading(false);
  }

  function toggleTeam(teamId: string) {
    const next = new Set(selectedIds);
    if (next.has(teamId)) {
      next.delete(teamId);
    } else {
      next.add(teamId);
    }
    setSelectedIds(next);
  }

  async function handleSave() {
    setSubmitting(true);
    await registerTeamsToCompetition(competitionId, Array.from(selectedIds));
    setSubmitting(false);
    onSuccess();
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xl max-w-lg w-full overflow-hidden text-[#111827]">
        <div className="px-6 py-4 border-b border-[#004ED0] flex items-center justify-between bg-[#0757E8] text-white">
          <div>
            <h3 className="font-display font-extrabold text-base">REGISTER TEAMS INTO COMPETITION</h3>
            <p className="text-xs text-white/80 font-mono">{competitionName}</p>
          </div>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4 text-sm font-sans max-h-[60vh] overflow-y-auto">
          <p className="text-xs text-[#64748B] font-medium">
            Select existing global teams to register into this competition. Only registered teams can be scheduled in matches.
          </p>

          {loading ? (
            <div className="p-8 text-center text-xs font-mono text-[#64748B]">Loading teams...</div>
          ) : (
            <div className="space-y-2">
              {allTeams.map((team) => {
                const isSelected = selectedIds.has(team.id);
                const isAlreadyRegistered = registeredIds.has(team.id);

                return (
                  <div
                    key={team.id}
                    onClick={() => toggleTeam(team.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'border-[#0757E8] bg-[#EAF2FF]/50 text-[#111827]'
                        : 'border-[#E5EAF2] bg-[#F7F9FC] text-[#64748B] hover:border-[#0757E8]/40'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#0757E8] text-white font-display flex items-center justify-center text-xs font-bold">
                        {team.shortName}
                      </div>
                      <div>
                        <div className="font-bold text-sm text-[#111827]">{team.name}</div>
                        {isAlreadyRegistered && (
                          <div className="text-[10px] font-mono text-emerald-600 font-bold">✓ Already Registered</div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                        isSelected ? 'bg-[#0757E8] border-[#0757E8] text-white' : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isSelected && <Check size={14} />}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-[#E5EAF2] bg-[#F7F9FC] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E5EAF2] text-xs font-semibold text-[#64748B] hover:bg-[#F1F4F8]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={submitting}
            className="px-5 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] shadow-xs"
          >
            {submitting ? 'Saving...' : `Save Registration (${selectedIds.size} Teams)`}
          </button>
        </div>
      </div>
    </div>
  );
};
