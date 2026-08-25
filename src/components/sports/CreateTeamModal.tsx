'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Users, Shield, FileText, Plus, Trash2, Check, MapPin, Mail, Phone, UserCheck, Link as LinkIcon, Copy, Share2 } from 'lucide-react';
import { createTeam } from '@/lib/sports/repositories/teams';
import { createTeamInvite, TeamInvite } from '@/lib/sports/repositories/invites';
import { Tournament } from '@/lib/supabase';
import { compressImageFile } from '@/lib/imageCompressor';

interface DraftPlayer {
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
}

interface CreateTeamModalProps {
  tournaments: Tournament[];
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateTeamModal: React.FC<CreateTeamModalProps> = ({
  tournaments,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'direct' | 'invite'>('direct');
  const [activeTab, setActiveTab] = useState<'profile' | 'roster'>('profile');

  // Team Profile Fields
  const [tournamentId, setTournamentId] = useState('');
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [location, setLocation] = useState('');
  const [manager, setManager] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // Player Roster Fields
  const [draftPlayers, setDraftPlayers] = useState<DraftPlayer[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newJerseyNumber, setNewJerseyNumber] = useState<number | ''>('');
  const [newPosition, setNewPosition] = useState('Forward');

  // Shareable Link State
  const [generatedInvite, setGeneratedInvite] = useState<TeamInvite | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const [compressing, setCompressing] = useState(false);
  const [parsingFile, setParsingFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (tournaments.length > 0 && (!tournamentId || !tournaments.some((t) => t.id === tournamentId))) {
      setTournamentId(tournaments[0].id);
    }
  }, [tournaments, isOpen]);

  if (!isOpen) return null;

  async function copyTextToClipboard(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (e) {
      // fallback
    }
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }

  async function handleGenerateShareLink() {
    const selectedTour = tournaments.find((t) => t.id === tournamentId) || tournaments[0];
    if (!selectedTour) {
      setError('Please select a tournament first.');
      return;
    }

    setLoading(true);
    const invite = await createTeamInvite(selectedTour.id, selectedTour.name);
    setGeneratedInvite(invite);
    setLoading(false);
  }

  async function handleCopyOnlyUrl() {
    if (!generatedInvite) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const inviteUrl = `${origin}/sports/register-team?token=${generatedInvite.token}`;

    const ok = await copyTextToClipboard(inviteUrl);
    if (ok) {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  }

  async function handleCopyInviteMessage() {
    if (!generatedInvite) return;
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const inviteUrl = `${origin}/sports/register-team?token=${generatedInvite.token}`;

    const text = `⚽ ${generatedInvite.competitionName} - Official Team Registration Invite\n\nPlease use the link & access passcode below to register your team and squad roster:\n\n🔗 Link: ${inviteUrl}\n🔑 Access Passcode: ${generatedInvite.passcode}`;

    const ok = await copyTextToClipboard(text);
    if (ok) {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 3000);
    }
  }

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

  function handleAddManualPlayer() {
    if (!newPlayerName.trim()) return;

    const newP: DraftPlayer = {
      id: `dp-${Date.now()}-${Math.random()}`,
      name: newPlayerName.trim(),
      jerseyNumber: typeof newJerseyNumber === 'number' ? newJerseyNumber : draftPlayers.length + 1,
      position: newPosition,
    };

    setDraftPlayers([...draftPlayers, newP]);
    setNewPlayerName('');
    setNewJerseyNumber('');
  }

  function handleRemovePlayer(id: string) {
    setDraftPlayers(draftPlayers.filter((p) => p.id !== id));
  }

  async function handleRosterFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setParsingFile(true);
    setError('');

    try {
      const text = await file.text();
      const lines = text.split(/\r?\n/);
      const parsed: DraftPlayer[] = [];

      lines.forEach((line, idx) => {
        const clean = line.trim();
        if (!clean || clean.toLowerCase().includes('jersey') || clean.toLowerCase().includes('player name')) return;

        const parts = clean.split(/[,;\t]/).map((p) => p.trim()).filter(Boolean);
        
        let pName = '';
        let pNum = idx + 1;
        let pPos = 'Forward';

        if (parts.length >= 2) {
          if (!isNaN(Number(parts[0]))) {
            pNum = Number(parts[0]);
            pName = parts[1];
            if (parts[2]) pPos = parts[2];
          } else {
            pName = parts[0];
            if (!isNaN(Number(parts[1]))) {
              pNum = Number(parts[1]);
              if (parts[2]) pPos = parts[2];
            } else {
              pPos = parts[1];
            }
          }
        } else {
          const numMatch = clean.match(/#?(\d+)/);
          if (numMatch) {
            pNum = Number(numMatch[1]);
            pName = clean.replace(numMatch[0], '').trim();
          } else {
            pName = clean;
          }
        }

        if (pName && pName.length >= 2) {
          parsed.push({
            id: `dp-file-${idx}-${Date.now()}`,
            name: pName,
            jerseyNumber: pNum,
            position: pPos,
          });
        }
      });

      if (parsed.length > 0) {
        setDraftPlayers((prev) => [...prev, ...parsed]);
      } else {
        setError('Could not extract player rows from file. Please add players manually.');
      }
    } catch (err) {
      setError('Error reading roster document file.');
    } finally {
      setParsingFile(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (mode === 'invite') return;

    if (!name.trim() || !shortName.trim()) {
      setError('Team name and short name are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { error: err } = await createTeam({
        tournament_id: tournamentId || undefined,
        name,
        short_name: shortName.toUpperCase(),
        location,
        manager,
        contact_email: contactEmail,
        contact_phone: contactPhone,
        description,
        logo_url: logoUrl || undefined,
        players: draftPlayers.map((p) => ({
          name: p.name,
          jerseyNumber: p.jerseyNumber,
          position: p.position,
        })),
      });

      setLoading(false);

      if (err) {
        setError(err.message);
      } else {
        setName('');
        setShortName('');
        setLocation('');
        setManager('');
        setContactEmail('');
        setContactPhone('');
        setDescription('');
        setLogoUrl('');
        setDraftPlayers([]);
        onSuccess();
        onClose();
      }
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Error creating team');
    }
  }

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const fullInviteUrl = generatedInvite ? `${currentOrigin}/sports/register-team?token=${generatedInvite.token}` : '';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="bg-white rounded-2xl border border-[#E5EAF2] shadow-2xl max-w-3xl w-full overflow-hidden text-[#111827] flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-3.5 border-b border-[#004ED0] flex items-center justify-between bg-[#0757E8] text-white shrink-0">
          <div>
            <h3 className="font-display font-extrabold text-base tracking-wide">REGISTER TEAM / SHARE MANAGER INVITE</h3>
            <p className="text-[11px] text-white/80 font-mono">Create team directly or send a secure registration link & PIN to manager</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Mode Selector Toggle */}
        <div className="flex border-b border-[#E5EAF2] bg-[#F7F9FC] px-6 pt-3 shrink-0 gap-4">
          <button
            type="button"
            onClick={() => setMode('direct')}
            className={`pb-2.5 text-xs font-mono font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              mode === 'direct'
                ? 'border-[#0757E8] text-[#0757E8]'
                : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Shield size={15} />
            <span>Option 1: Add Team Directly</span>
          </button>

          <button
            type="button"
            onClick={() => setMode('invite')}
            className={`pb-2.5 text-xs font-mono font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              mode === 'invite'
                ? 'border-[#0757E8] text-[#0757E8]'
                : 'border-transparent text-[#64748B] hover:text-[#111827]'
            }`}
          >
            <Share2 size={15} />
            <span>Option 2: 🔗 Share Registration Link & Passcode</span>
          </button>
        </div>

        {/* MODE 2: SHAREABLE INVITE LINK GENERATOR */}
        {mode === 'invite' ? (
          <div className="p-6 space-y-5 flex-1 overflow-y-auto font-sans">
            <div className="bg-[#EAF2FF]/60 rounded-2xl p-5 border border-[#0757E8]/30 space-y-3">
              <h4 className="font-display font-extrabold text-sm text-[#0757E8] flex items-center gap-2">
                <LinkIcon size={16} />
                <span>GENERATE MANAGER SELF-REGISTRATION LINK</span>
              </h4>
              <p className="text-xs text-[#64748B]">
                Generate a unique registration URL and a 6-digit access passcode. Share the link with the team manager so they can submit their own team profile and upload their player roster!
              </p>

              {tournaments.length > 0 && (
                <div>
                  <label className="block font-mono uppercase text-[10px] font-bold text-[#64748B] mb-1">
                    Select Competition For Invite
                  </label>
                  <select
                    value={tournamentId}
                    onChange={(e) => setTournamentId(e.target.value)}
                    className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-xs text-[#111827]"
                  >
                    {tournaments.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} ({t.season})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerateShareLink}
                disabled={loading}
                className="px-5 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors shadow-sm flex items-center gap-2"
              >
                <Share2 size={15} />
                <span>{loading ? 'Generating Link...' : 'Generate Invite Link & Passcode'}</span>
              </button>
            </div>

            {/* Generated Invite Card */}
            {generatedInvite && (
              <div className="bg-white rounded-2xl border-2 border-[#0757E8] p-5 space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#E5EAF2] pb-3">
                  <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1.5">
                    <Check size={16} />
                    <span>Invite Link & Passcode Ready!</span>
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    Competition: {generatedInvite.competitionName}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                  {/* Selectable Full Registration URL Box with dedicated Copy Link button */}
                  <div className="sm:col-span-2 p-3 bg-[#F7F9FC] rounded-xl border border-[#E5EAF2] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[#64748B] text-[10px] uppercase font-bold">REGISTRATION URL</span>
                      <button
                        type="button"
                        onClick={handleCopyOnlyUrl}
                        className="text-[11px] font-mono font-bold text-[#0757E8] hover:underline flex items-center gap-1"
                      >
                        <Copy size={13} />
                        <span>{copiedLink ? '✓ Link Copied!' : 'Copy Link Only'}</span>
                      </button>
                    </div>

                    <input
                      type="text"
                      readOnly
                      value={fullInviteUrl}
                      onClick={(e) => (e.target as HTMLInputElement).select()}
                      className="w-full bg-white border border-[#E5EAF2] rounded-lg px-2.5 py-1.5 font-mono text-xs font-bold text-[#0757E8] outline-hidden cursor-pointer"
                    />
                  </div>

                  <div className="p-3 bg-[#FEF3C7] rounded-xl border border-[#F59E0B]/30 text-center flex flex-col justify-center">
                    <span className="text-[#92400E] text-[10px] uppercase font-bold block mb-0.5">Access Passcode</span>
                    <p className="font-black text-[#92400E] text-lg tracking-widest">{generatedInvite.passcode}</p>
                  </div>
                </div>

                {/* WhatsApp & Email Full Message Button */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={handleCopyOnlyUrl}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl border border-[#0757E8] text-[#0757E8] bg-white font-mono font-bold text-xs hover:bg-[#EAF2FF] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Copy size={14} />
                    <span>{copiedLink ? '✓ Link Copied!' : 'Copy Link'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyInviteMessage}
                    className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Copy size={15} />
                    <span>{copiedMessage ? '✓ Copied Full Message!' : 'Copy WhatsApp / Email Message (with PIN)'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* MODE 1: DIRECT TEAM CREATION FORM */
          <>
            <div className="p-1 bg-[#F1F4F8] rounded-xl flex gap-1 mx-6 mt-4 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'profile'
                    ? 'bg-white text-[#0757E8] shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                <Shield size={14} />
                <span>1. Team Profile & Club Details</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('roster')}
                className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'roster'
                    ? 'bg-[#0757E8] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#111827]'
                }`}
              >
                <Users size={14} />
                <span>2. Squad Roster ({draftPlayers.length} Players)</span>
              </button>
            </div>

            <form id="create-team-form" onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5 text-xs font-sans overflow-y-auto flex-1">
              {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 font-mono text-xs border border-red-200">{error}</div>}

              {activeTab === 'profile' && (
                <div className="space-y-3.5">
                  {tournaments.length > 0 && (
                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        REGISTER INTO COMPETITION / LEAGUE
                      </label>
                      <select
                        value={tournamentId}
                        onChange={(e) => setTournamentId(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                      >
                        {tournaments.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name} ({t.season})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div className="sm:col-span-3">
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        TEAM FULL NAME *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Pahalgam United Football Club"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                        required
                      />
                    </div>

                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1 truncate">
                        SHORT TAG *
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="PUFC"
                        value={shortName}
                        onChange={(e) => setShortName(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 bg-white font-mono uppercase font-bold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        HOME STADIUM / CITY LOCATION
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Kehribal Ground, Anantnag"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                        />
                        <MapPin size={16} className="absolute left-3 top-3 text-[#64748B]" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        HEAD COACH / CLUB MANAGER
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="e.g. Coach Hilal Ahmed"
                          value={manager}
                          onChange={(e) => setManager(e.target.value)}
                          className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                        />
                        <UserCheck size={16} className="absolute left-3 top-3 text-[#0757E8]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        OFFICIAL CONTACT EMAIL
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          placeholder="club@pahalgamfc.com"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                        />
                        <Mail size={16} className="absolute left-3 top-3 text-[#64748B]" />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        CONTACT PHONE NUMBER
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="+91 99061 00000"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 bg-white font-semibold text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                        />
                        <Phone size={16} className="absolute left-3 top-3 text-[#64748B]" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                    <div className="sm:col-span-2">
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        TEAM DESCRIPTION & KIT COLORS
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Club history, kit colors (e.g. Royal Blue & Gold), home stadium details..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full rounded-xl border border-[#E5EAF2] p-2.5 bg-white font-medium text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                      />
                    </div>

                    <div>
                      <label className="block font-mono uppercase font-bold text-[#64748B] mb-1">
                        TEAM LOGO / CREST
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

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('roster')}
                      className="w-full py-2.5 rounded-xl bg-[#F1F4F8] border border-[#E5EAF2] text-[#0757E8] font-mono font-bold text-xs hover:bg-[#EAF2FF] transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Next: Add Player Roster →</span>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'roster' && (
                <div className="space-y-3.5">
                  <div className="bg-[#EAF2FF]/60 rounded-2xl p-4 border border-[#0757E8]/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-extrabold text-xs text-[#0757E8] uppercase tracking-wider flex items-center gap-1.5">
                        <FileText size={15} />
                        <span>IMPORT SQUAD ROSTER FILE (PDF, WORD, EXCEL, CSV, TXT)</span>
                      </h4>
                      <span className="text-[10px] font-mono text-[#0757E8] font-bold">Automatic Name & Jersey Parsing</span>
                    </div>
                    <p className="text-[11px] text-[#64748B]">
                      Upload a PDF, Word document, Excel spreadsheet, or CSV/TXT team sheet. The system automatically extracts player names and jersey numbers!
                    </p>

                    <label className="flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-[#0757E8] bg-white cursor-pointer hover:bg-[#F7F9FC] transition-colors">
                      <Upload size={15} className="text-[#0757E8]" />
                      <span className="text-xs font-mono font-bold text-[#0757E8]">
                        {parsingFile ? 'Parsing Roster Document...' : 'Choose Squad File (.xlsx, .csv, .docx, .pdf, .txt)'}
                      </span>
                      <input
                        type="file"
                        accept=".csv, .txt, .xlsx, .docx, .doc, .pdf"
                        onChange={handleRosterFileUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="bg-white rounded-2xl p-4 border border-[#E5EAF2] space-y-2">
                    <h4 className="font-display font-extrabold text-xs text-[#111827] uppercase tracking-wider">
                      MANUAL PLAYER ENTRY
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
                      <div className="sm:col-span-2">
                        <label className="block font-mono text-[10px] uppercase font-bold text-[#64748B] mb-1">
                          Player Full Name
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Sameer Ahmad"
                          value={newPlayerName}
                          onChange={(e) => setNewPlayerName(e.target.value)}
                          className="w-full h-9 rounded-xl border border-[#E5EAF2] px-3 bg-white font-semibold text-[#111827]"
                        />
                      </div>

                      <div>
                        <label className="block font-mono text-[10px] uppercase font-bold text-[#64748B] mb-1">
                          Jersey #
                        </label>
                        <input
                          type="number"
                          min={1}
                          max={99}
                          placeholder="10"
                          value={newJerseyNumber}
                          onChange={(e) => setNewJerseyNumber(e.target.value ? Number(e.target.value) : '')}
                          className="w-full h-9 rounded-xl border border-[#E5EAF2] px-3 bg-white font-mono font-bold text-[#111827]"
                        />
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={handleAddManualPlayer}
                          className="w-full h-9 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Plus size={15} />
                          <span>+ Add Player</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-display font-extrabold text-xs text-[#111827] uppercase tracking-wider">
                        SQUAD ROSTER PREVIEW ({draftPlayers.length} PLAYERS)
                      </h4>
                      {draftPlayers.length > 0 && (
                        <button
                          type="button"
                          onClick={() => setDraftPlayers([])}
                          className="text-[10px] font-mono text-[#EF233C] hover:underline"
                        >
                          Clear All
                        </button>
                      )}
                    </div>

                    {draftPlayers.length > 0 ? (
                      <div className="bg-white rounded-xl border border-[#E5EAF2] overflow-hidden max-h-40 overflow-y-auto">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-[#F1F4F8] font-mono text-[#64748B] uppercase text-[10px]">
                            <tr>
                              <th className="p-2">#</th>
                              <th className="p-2">Player Name</th>
                              <th className="p-2">Position</th>
                              <th className="p-2 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#E5EAF2]">
                            {draftPlayers.map((p) => (
                              <tr key={p.id} className="hover:bg-[#F7F9FC]">
                                <td className="p-2 font-mono font-bold text-[#0757E8]">#{p.jerseyNumber}</td>
                                <td className="p-2 font-bold text-[#111827]">{p.name}</td>
                                <td className="p-2 font-mono text-[#64748B]">{p.position}</td>
                                <td className="p-2 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleRemovePlayer(p.id)}
                                    className="p-1 rounded-md text-[#EF233C] hover:bg-red-50"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="p-5 rounded-xl border border-[#E5EAF2] bg-[#F7F9FC] text-center text-xs font-mono text-[#64748B]">
                        No players added to squad yet. Add players above or upload a team sheet file.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </form>
          </>
        )}

        {/* Modal Fixed Footer Action Bar */}
        <div className="px-6 py-3 border-t border-[#E5EAF2] bg-[#F7F9FC] flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs font-mono text-[#64748B]">
            {mode === 'invite' ? (
              <span>Share link & PIN with team manager</span>
            ) : draftPlayers.length > 0 ? (
              <span className="text-emerald-600 font-bold">✓ {draftPlayers.length} Players in Squad</span>
            ) : (
              <span>Optional squad roster can be added anytime</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E5EAF2] text-xs font-bold text-[#64748B] bg-white hover:bg-[#F1F4F8] transition-colors"
            >
              Close
            </button>
            {mode === 'direct' && (
              <button
                type="submit"
                form="create-team-form"
                disabled={loading || compressing}
                className="px-5 py-2 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors shadow-sm"
              >
                {loading ? 'Registering Team...' : 'Save Team & Roster'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
