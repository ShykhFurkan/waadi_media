'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Shield, Users, Trophy, MapPin, Award, Check } from 'lucide-react';
import { createCompetition } from '@/lib/sports/repositories/competitions';
import { getSponsors } from '@/lib/sports/repositories/sponsors';
import { Sponsor } from '@/lib/supabase';
import { compressImageFile } from '@/lib/imageCompressor';

interface CreateCompetitionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateCompetitionModal: React.FC<CreateCompetitionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'Tournament' | 'League'>('League');
  const [format, setFormat] = useState('11-a-side');
  const [squadSizeRequired, setSquadSizeRequired] = useState(18);
  const [maxSubstitutes, setMaxSubstitutes] = useState(5);
  const [season, setSeason] = useState('2026');
  const [edition, setEdition] = useState('1st Edition');
  const [location, setLocation] = useState('');
  const [prizePool, setPrizePool] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [sponsorsList, setSponsorsList] = useState<Sponsor[]>([]);
  const [selectedSponsorNames, setSelectedSponsorNames] = useState<string[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadSponsors();
    }
  }, [isOpen]);

  async function loadSponsors() {
    const sp = await getSponsors();
    setSponsorsList(sp);
  }

  if (!isOpen) return null;

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      setError('');
      const compressedDataUrl = await compressImageFile(file, 400, 400, 0.85);
      setLogoUrl(compressedDataUrl);
    } catch (err) {
      setError('Failed to compress image file. Please try another image.');
    } finally {
      setCompressing(false);
    }
  }

  function toggleSponsor(sponsorName: string) {
    if (selectedSponsorNames.includes(sponsorName)) {
      setSelectedSponsorNames(selectedSponsorNames.filter((s) => s !== sponsorName));
    } else {
      setSelectedSponsorNames([...selectedSponsorNames, sponsorName]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Competition name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: err } = await createCompetition({
        name,
        type,
        format,
        squadSizeRequired: Number(squadSizeRequired) || 18,
        maxSubstitutes: Number(maxSubstitutes) || 5,
        season,
        edition,
        location,
        prizePool,
        logoUrl: logoUrl || undefined,
        description,
        sponsors: selectedSponsorNames,
      });

      setLoading(false);

      if (err) {
        setError(err.message);
      } else {
        setName('');
        setLogoUrl('');
        setDescription('');
        setLocation('');
        setPrizePool('');
        setSelectedSponsorNames([]);
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Error creating competition');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xl max-w-3xl w-full overflow-hidden text-[#111827] flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-3.5 border-b border-[#004ED0] flex items-center justify-between bg-[#0757E8] text-white shrink-0">
          <div>
            <h3 className="font-display font-extrabold text-base tracking-wide">CREATE FOOTBALL COMPETITION</h3>
            <p className="text-[11px] text-white/80 font-mono">Set up tournament format, squad rules, venue & sponsors</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Form Container */}
        <form id="create-comp-form" onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs font-sans overflow-y-auto flex-1">
          {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 font-mono text-xs border border-red-200">{error}</div>}

          {/* Row 1: Competition Name & Season */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-3">
              <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                Competition Name *
              </label>
              <input
                type="text"
                placeholder="e.g. Kashmir Premier League 2026"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                Season / Year
              </label>
              <input
                type="text"
                placeholder="2026"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
              />
            </div>
          </div>

          {/* Row 2: Competition System Type Selector */}
          <div>
            <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
              Competition System Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('League')}
                className={`h-11 rounded-xl border flex items-center justify-center gap-2.5 font-display font-extrabold text-xs transition-all ${
                  type === 'League'
                    ? 'border-[#0757E8] bg-[#EAF2FF] text-[#0757E8] shadow-xs'
                    : 'border-[#E5EAF2] bg-[#F7F9FC] text-[#64748B] hover:border-[#0757E8]/40'
                }`}
              >
                <Trophy size={16} />
                <span>League System (Points Table)</span>
              </button>

              <button
                type="button"
                onClick={() => setType('Tournament')}
                className={`h-11 rounded-xl border flex items-center justify-center gap-2.5 font-display font-extrabold text-xs transition-all ${
                  type === 'Tournament'
                    ? 'border-[#0757E8] bg-[#EAF2FF] text-[#0757E8] shadow-xs'
                    : 'border-[#E5EAF2] bg-[#F7F9FC] text-[#64748B] hover:border-[#0757E8]/40'
                }`}
              >
                <Award size={16} />
                <span>Knockout Cup / Tournament</span>
              </button>
            </div>
          </div>

          {/* Row 3: Match Format & Squad Rules */}
          <div className="bg-[#F7F9FC] rounded-2xl p-4 border border-[#E5EAF2] space-y-2.5">
            <h4 className="font-display font-extrabold text-xs text-[#0757E8] uppercase tracking-wider flex items-center gap-1.5">
              <Users size={15} />
              <span>MATCH FORMAT & SQUAD RULES</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                  Match Format / Side *
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                >
                  <option value="11-a-side">11-a-side (Standard)</option>
                  <option value="9-a-side">9-a-side</option>
                  <option value="7-a-side">7-a-side</option>
                  <option value="5-a-side">5-a-side (Futsal / Mini)</option>
                </select>
              </div>

              <div>
                <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                  Required Squad Size
                </label>
                <input
                  type="number"
                  min={5}
                  max={30}
                  value={squadSizeRequired}
                  onChange={(e) => setSquadSizeRequired(Number(e.target.value))}
                  className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                  placeholder="18"
                />
              </div>

              <div>
                <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                  Max Substitutes Allowed
                </label>
                <input
                  type="number"
                  min={0}
                  max={12}
                  value={maxSubstitutes}
                  onChange={(e) => setMaxSubstitutes(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#E5EAF2] h-10 px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                  placeholder="5"
                />
              </div>
            </div>
          </div>

          {/* Row 4: Primary Venue & Financial Rewards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                Primary Venue / Stadium Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Bakshi Stadium, Srinagar"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                />
                <MapPin size={16} className="absolute left-3 top-3 text-[#64748B]" />
              </div>
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                Prize Pool / Rewards
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. ₹500,000 + Golden Trophy"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                />
                <Award size={16} className="absolute left-3 top-3 text-[#0757E8]" />
              </div>
            </div>
          </div>

          {/* Row 5: Tournament Sponsors & Logo Dropzone */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
            <div className="sm:col-span-2">
              <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                Assign Tournament Sponsors
              </label>
              {sponsorsList.length > 0 ? (
                <div className="flex flex-wrap gap-1.5 pt-0.5">
                  {sponsorsList.map((sp) => {
                    const isChecked = selectedSponsorNames.includes(sp.name);
                    return (
                      <button
                        key={sp.id}
                        type="button"
                        onClick={() => toggleSponsor(sp.name)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                          isChecked
                            ? 'border-[#0757E8] bg-[#EAF2FF] text-[#0757E8] shadow-xs'
                            : 'border-[#E5EAF2] bg-[#F7F9FC] text-[#64748B] hover:border-[#0757E8]/40'
                        }`}
                      >
                        <Shield size={13} />
                        <span>{sp.name}</span>
                        {isChecked && <Check size={13} className="text-[#0757E8]" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-[11px] font-mono text-[#64748B]">No registered sponsors available yet.</p>
              )}
            </div>

            <div>
              <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                Competition Logo
              </label>
              <label className="flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-[#0757E8]/40 bg-[#EAF2FF]/50 cursor-pointer hover:bg-[#EAF2FF] transition-colors">
                <Upload size={15} className="text-[#0757E8]" />
                <span className="text-xs font-mono font-bold text-[#0757E8]">
                  {compressing ? 'Compressing...' : logoUrl ? '✓ Logo Uploaded' : 'Upload Image'}
                </span>
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Row 6: Description & Rules */}
          <div>
            <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
              Description & Rules
            </label>
            <textarea
              rows={2}
              placeholder="Tournament format, yellow card suspension rules, prize distribution details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-[#E5EAF2] p-2.5 bg-white font-medium text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
            />
          </div>
        </form>

        {/* Modal Fixed Footer Action Bar */}
        <div className="px-6 py-3.5 border-t border-[#E5EAF2] bg-[#F7F9FC] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E5EAF2] text-xs font-bold text-[#64748B] bg-white hover:bg-[#F1F4F8] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-comp-form"
            disabled={loading || compressing}
            className="px-5 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors shadow-sm"
          >
            {loading ? 'Creating...' : 'Create Competition'}
          </button>
        </div>
      </div>
    </div>
  );
};
