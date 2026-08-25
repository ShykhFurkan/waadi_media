'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { createSponsor, Tournament } from '@/lib/supabase';
import { compressImageFile } from '@/lib/imageCompressor';

interface CreateSponsorModalProps {
  tournaments: Tournament[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateSponsorModal: React.FC<CreateSponsorModalProps> = ({
  tournaments,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tournamentId, setTournamentId] = useState('');
  const [name, setName] = useState('');
  const [tier, setTier] = useState('Match Sponsor');
  const [logoUrl, setLogoUrl] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tournaments.length > 0 && (!tournamentId || !tournaments.some((t) => t.id === tournamentId))) {
      setTournamentId(tournaments[0].id);
    }
  }, [tournaments, isOpen]);

  if (!isOpen) return null;

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      setError('');
      const compressedDataUrl = await compressImageFile(file, 300, 300, 0.85);
      setLogoUrl(compressedDataUrl);
    } catch (err: any) {
      setError('Failed to process logo image. Please try another file.');
    } finally {
      setCompressing(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Sponsor name is required');
      return;
    }
    if (!logoUrl) {
      setError('Sponsor logo image is required');
      return;
    }

    const selectedTour = tournaments.find((t) => t.id === tournamentId) || tournaments[0];
    if (!selectedTour) {
      setError('Please create a tournament first');
      return;
    }

    setLoading(true);
    setError('');

    const { error: err } = await createSponsor({
      tournament_id: selectedTour.id,
      name,
      tier,
      logo_url: logoUrl,
      website_url: websiteUrl || undefined,
    });

    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setName('');
      setLogoUrl('');
      setWebsiteUrl('');
      onSuccess();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xl max-w-md w-full overflow-hidden text-[#111827]">
        <div className="px-6 py-4 border-b border-[#004ED0] flex items-center justify-between bg-[#0757E8] text-white">
          <h3 className="font-display font-extrabold text-base">ADD SPONSOR TO TOURNAMENT</h3>
          <button onClick={onClose} className="p-1 text-white/80 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm font-sans">
          {error && <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs font-mono">{error}</div>}

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#64748B] mb-1">
              Select Tournament
            </label>
            {tournaments.length > 0 ? (
              <select
                value={tournamentId}
                onChange={(e) => setTournamentId(e.target.value)}
                className="w-full rounded-xl border border-[#E5EAF2] p-2.5 bg-white font-medium text-[#111827]"
              >
                {tournaments.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.edition || '1st Edition'} · {t.season})
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-2.5 rounded-lg bg-yellow-50 text-yellow-800 text-xs font-mono">
                No tournaments found. Please create a tournament first.
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#64748B] mb-1">
              Sponsor Brand / Business Name
            </label>
            <input
              type="text"
              placeholder="e.g. Kashmir Willow Crafts"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[#E5EAF2] p-2.5 bg-white font-medium text-[#111827]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#64748B] mb-1">
                Sponsorship Tier
              </label>
              <select
                value={tier}
                onChange={(e) => setTier(e.target.value)}
                className="w-full rounded-xl border border-[#E5EAF2] p-2.5 bg-white font-medium text-[#111827]"
              >
                <option value="Title Sponsor">Title Sponsor</option>
                <option value="Match Sponsor">Match Sponsor</option>
                <option value="Official Partner">Official Partner</option>
                <option value="Broadcast Partner">Broadcast Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-[#64748B] mb-1">
                Sponsor Logo (PNG/JPG/WebP)
              </label>
              <label className="flex items-center justify-center gap-2 p-2.5 rounded-xl border border-dashed border-[#E5EAF2] bg-[#F7F9FC] cursor-pointer hover:bg-[#F1F4F8] transition-colors">
                <Upload size={16} className="text-[#64748B]" />
                <span className="text-xs font-mono text-[#64748B]">
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

          {logoUrl && (
            <div className="flex items-center gap-3 p-2 border border-[#E5EAF2] rounded-xl bg-[#F7F9FC]">
              <img src={logoUrl} alt="Sponsor Logo Preview" className="w-10 h-10 object-contain rounded-lg bg-white p-1 border border-[#E5EAF2]" />
              <div className="text-xs text-[#64748B] font-mono">
                ✓ Logo compressed & ready to save
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-[#64748B] mb-1">
              Website URL (Optional)
            </label>
            <input
              type="url"
              placeholder="https://example.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full rounded-xl border border-[#E5EAF2] p-2.5 bg-white font-mono text-[#111827]"
            />
          </div>

          <div className="pt-4 border-t border-[#E5EAF2] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E5EAF2] text-xs font-semibold text-[#64748B] hover:bg-[#F1F4F8]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || compressing || tournaments.length === 0}
              className="px-5 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] shadow-sm"
            >
              {loading ? 'Adding...' : 'Add Sponsor to Tournament'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
