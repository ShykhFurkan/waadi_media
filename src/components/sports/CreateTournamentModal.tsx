'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload } from 'lucide-react';
import { createTournament, supabase, Sport } from '@/lib/supabase';
import { compressImageFile } from '@/lib/imageCompressor';

interface CreateTournamentModalProps {
  sports: Sport[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTournamentModal: React.FC<CreateTournamentModalProps> = ({
  sports: initialSports,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [sportsList, setSportsList] = useState<Sport[]>(initialSports);
  const [sportId, setSportId] = useState('');
  const [name, setName] = useState('');
  const [edition, setEdition] = useState('1st Edition');
  const [season, setSeason] = useState('2026');
  const [logoUrl, setLogoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [compressing, setCompressing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadSports();
    }
  }, [isOpen, initialSports]);

  async function loadSports() {
    let list = initialSports;
    if (list.length === 0) {
      const { data } = await supabase.from('sports').select('*');
      if (data && data.length > 0) {
        list = data;
      } else {
        const { data: seeded } = await supabase
          .from('sports')
          .upsert(
            [
              { name: 'Cricket', slug: 'cricket', icon: '🏏' },
              { name: 'Football', slug: 'football', icon: '⚽' },
            ],
            { onConflict: 'slug' }
          )
          .select();
        if (seeded) list = seeded;
      }
    }

    setSportsList(list);
    if (list.length > 0) {
      setSportId(list[0].id);
    }
  }

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
      setError('Failed to process image file. Please try another image.');
    } finally {
      setCompressing(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError('Tournament name is required');
      return;
    }

    const targetSportId = sportId || (sportsList[0] ? sportsList[0].id : '');
    if (!targetSportId) {
      setError('Please select a sport');
      return;
    }

    setLoading(true);
    setError('');

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const { error: err } = await createTournament({
      sport_id: targetSportId,
      name,
      slug: `${slug}-${season}`,
      season,
      edition,
      logo_url: logoUrl || undefined,
      description,
    });

    setLoading(false);

    if (err) {
      setError(err.message);
    } else {
      setName('');
      setLogoUrl('');
      setDescription('');
      onSuccess();
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden text-slate-900">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <h3 className="font-display text-base text-[#0F2A1E]">CREATE NEW TOURNAMENT</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-sm">
          {error && <div className="p-3 rounded bg-red-50 text-red-600 text-xs font-mono">{error}</div>}

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Select Sport
            </label>
            <select
              value={sportId}
              onChange={(e) => setSportId(e.target.value)}
              className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium text-slate-900"
            >
              {sportsList.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Tournament Name
            </label>
            <input
              type="text"
              placeholder="e.g. Valley Champions League"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
                Edition
              </label>
              <input
                type="text"
                placeholder="e.g. 1st Edition"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
                Season / Year
              </label>
              <input
                type="text"
                placeholder="2026"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium"
              />
            </div>
          </div>

          {/* Logo Image Upload */}
          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Tournament Logo (PNG/JPG/WebP)
            </label>
            <label className="flex items-center justify-center gap-2 p-2.5 rounded border border-dashed border-slate-300 bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <Upload size={16} className="text-slate-500" />
              <span className="text-xs font-mono text-slate-600">
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

          {/* Logo Preview */}
          {logoUrl && (
            <div className="flex items-center gap-3 p-2 border border-slate-200 rounded bg-slate-50">
              <img src={logoUrl} alt="Logo Preview" className="w-10 h-10 object-contain rounded bg-white p-1 border border-slate-200" />
              <div className="text-xs text-slate-600 font-mono">
                ✓ Image compressed & ready to save
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-mono uppercase font-bold text-slate-600 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Brief details about tournament format, prize pool, or teams..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded border border-slate-300 p-2.5 bg-white font-medium"
            />
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
              disabled={loading || compressing}
              className="px-5 py-2 rounded bg-[#0F2A1E] text-white font-display text-xs hover:bg-[#1B4332]"
            >
              {loading ? 'Creating...' : 'Create Tournament'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
