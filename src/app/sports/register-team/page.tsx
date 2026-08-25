'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Shield, Lock, CheckCircle2, Upload, FileText, Plus, Trash2, MapPin, UserCheck, Mail, Phone, ArrowLeft, Trophy, Users } from 'lucide-react';
import { verifyTeamInvite, getTeamInvite, TeamInvite } from '@/lib/sports/repositories/invites';
import { createTeam } from '@/lib/sports/repositories/teams';
import { compressImageFile } from '@/lib/imageCompressor';

interface DraftPlayer {
  id: string;
  name: string;
  jerseyNumber: number;
  position: string;
}

export default function PublicTeamRegistrationPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || 'demo-invite-token';

  const [passcode, setPasscode] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [inviteData, setInviteData] = useState<TeamInvite | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // Form Fields
  const [name, setName] = useState('');
  const [shortName, setShortName] = useState('');
  const [location, setLocation] = useState('');
  const [manager, setManager] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  // Roster
  const [draftPlayers, setDraftPlayers] = useState<DraftPlayer[]>([]);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newJerseyNumber, setNewJerseyNumber] = useState<number | ''>('');
  const [newPosition, setNewPosition] = useState('Forward');

  const [compressing, setCompressing] = useState(false);
  const [parsingFile, setParsingFile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (token) {
      loadInviteDetails();
    }
  }, [token]);

  async function loadInviteDetails() {
    const inv = await getTeamInvite(token);
    if (inv) {
      setInviteData(inv);
    }
  }

  async function handleVerifyPasscode(e: React.FormEvent) {
    e.preventDefault();
    if (!passcode.trim()) {
      setVerifyError('Please enter the 6-digit access passcode.');
      return;
    }

    setVerifying(true);
    setVerifyError('');

    const res = await verifyTeamInvite(token, passcode);
    setVerifying(false);

    if (res.valid && res.invite) {
      setIsVerified(true);
      setInviteData(res.invite);
    } else {
      setVerifyError(res.error || 'Invalid passcode.');
    }
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setCompressing(true);
      setFormError('');
      const compressedDataUrl = await compressImageFile(file, 300, 300, 0.85);
      setLogoUrl(compressedDataUrl);
    } catch (err) {
      setFormError('Failed to process crest logo. Please try another image.');
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
    setFormError('');

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
        setFormError('Could not extract player rows from file. Please add players manually.');
      }
    } catch (err) {
      setFormError('Error reading squad document file.');
    } finally {
      setParsingFile(false);
    }
  }

  async function handleFinalSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !shortName.trim()) {
      setFormError('Team name and short tag are required.');
      return;
    }

    setSubmitting(true);
    setFormError('');

    try {
      const res = await createTeam({
        tournament_id: inviteData?.competitionId,
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

      setSubmitting(false);

      if (res.error) {
        setFormError(res.error.message);
      } else {
        setSubmittedSuccess(true);
      }
    } catch (err: any) {
      setSubmitting(false);
      setFormError(err.message || 'Error submitting team registration.');
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] text-[#111827] flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-[#071426] text-white border-b border-[#1E293B] py-4 px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/sports" className="flex items-center gap-2">
            <span className="bg-[#0757E8] text-white font-black px-2.5 py-1 rounded-lg text-sm tracking-wider">
              WAADI SPORTS
            </span>
            <span className="text-xs text-white/70 font-mono hidden sm:inline">Team Manager Portal</span>
          </Link>

          <Link href="/sports" className="text-xs font-mono text-white/70 hover:text-white flex items-center gap-1">
            <ArrowLeft size={14} />
            <span>Public Sports Hub</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex-1 space-y-6">
        {/* SUCCESS SCREEN */}
        {submittedSuccess ? (
          <div className="bg-white rounded-3xl border border-[#E5EAF2] p-8 sm:p-12 text-center space-y-5 shadow-lg">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-2xl text-[#111827]">
                TEAM REGISTRATION SUBMITTED!
              </h1>
              <p className="text-xs font-mono text-[#64748B] max-w-md mx-auto">
                <strong>{name}</strong> has been successfully registered for <strong>{inviteData?.competitionName || 'Tournament'}</strong> with {draftPlayers.length} squad players.
              </p>
            </div>

            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/sports"
                className="px-6 py-2.5 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0]"
              >
                Return to Sports Hub
              </Link>
            </div>
          </div>
        ) : !isVerified ? (
          /* PASSCODE VERIFICATION STEP */
          <div className="bg-white rounded-3xl border border-[#E5EAF2] p-6 sm:p-10 shadow-lg max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#EAF2FF] text-[#0757E8] flex items-center justify-center mx-auto">
                <Lock size={26} />
              </div>
              <h1 className="font-display font-extrabold text-xl text-[#111827]">
                TEAM MANAGER INVITE ACCESS
              </h1>
              <p className="text-xs font-mono text-[#64748B]">
                {inviteData ? (
                  <>You are registering a team for <strong className="text-[#0757E8]">{inviteData.competitionName}</strong></>
                ) : (
                  'Please enter the 6-digit access passcode shared by your tournament admin.'
                )}
              </p>
            </div>

            <form onSubmit={handleVerifyPasscode} className="space-y-4">
              {verifyError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-600 font-mono text-xs border border-red-200">
                  {verifyError}
                </div>
              )}

              <div>
                <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1.5 text-center">
                  Enter 6-Digit Passcode
                </label>
                <input
                  type="text"
                  maxLength={6}
                  placeholder="e.g. 849201"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full h-12 rounded-2xl border border-[#E5EAF2] text-center font-mono font-black text-2xl tracking-widest text-[#111827] focus:border-[#0757E8] focus:outline-hidden"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={verifying}
                className="w-full h-11 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] transition-colors shadow-md"
              >
                {verifying ? 'Verifying Passcode...' : 'Unlock Registration Form →'}
              </button>
            </form>
          </div>
        ) : (
          /* UNLOCKED REGISTRATION FORM */
          <div className="space-y-6">
            {/* Header Info Card */}
            <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 shadow-xs flex items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#0757E8] font-bold">
                  <Trophy size={15} />
                  <span>{inviteData?.competitionName}</span>
                </div>
                <h1 className="font-display font-extrabold text-xl text-[#111827] mt-1">
                  OFFICIAL TEAM & SQUAD ROSTER FORM
                </h1>
              </div>
              <span className="text-xs font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
                ✓ Invite Passcode Verified
              </span>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleFinalSubmit} className="space-y-6">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 text-red-600 font-mono text-xs border border-red-200">
                  {formError}
                </div>
              )}

              {/* Section 1: Team Details */}
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
                <h3 className="font-display font-extrabold text-sm text-[#0757E8] uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={16} />
                  <span>1. TEAM & CLUB PROFILE</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div className="sm:col-span-3">
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Team Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Pahalgam United Football Club"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 font-semibold text-xs text-[#111827]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Short Tag *
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="PUFC"
                      value={shortName}
                      onChange={(e) => setShortName(e.target.value)}
                      className="w-full h-10 rounded-xl border border-[#E5EAF2] px-3 font-mono uppercase font-bold text-xs text-[#111827]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Home Stadium / City
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Kehribal Ground, Anantnag"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 font-semibold text-xs text-[#111827]"
                      />
                      <MapPin size={16} className="absolute left-3 top-3 text-[#64748B]" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Head Coach / Manager Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Coach Hilal Ahmed"
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 font-semibold text-xs text-[#111827]"
                      />
                      <UserCheck size={16} className="absolute left-3 top-3 text-[#0757E8]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Contact Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        placeholder="manager@pahalgamfc.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 font-semibold text-xs text-[#111827]"
                      />
                      <Mail size={16} className="absolute left-3 top-3 text-[#64748B]" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Contact Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 99061 00000"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full h-10 rounded-xl border border-[#E5EAF2] pl-9 pr-3 font-semibold text-xs text-[#111827]"
                      />
                      <Phone size={16} className="absolute left-3 top-3 text-[#64748B]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Description & Kit Colors
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Kit colors, home ground details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full rounded-xl border border-[#E5EAF2] p-2.5 font-medium text-xs text-[#111827]"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#64748B] mb-1">
                      Team Logo Crest
                    </label>
                    <label className="flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-[#0757E8]/40 bg-[#EAF2FF]/50 cursor-pointer hover:bg-[#EAF2FF]">
                      <Upload size={15} className="text-[#0757E8]" />
                      <span className="text-xs font-mono font-bold text-[#0757E8]">
                        {compressing ? 'Compressing...' : logoUrl ? '✓ Logo Uploaded' : 'Upload Image'}
                      </span>
                      <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 2: Squad Roster */}
              <div className="bg-white rounded-2xl border border-[#E5EAF2] p-6 space-y-4 shadow-xs">
                <h3 className="font-display font-extrabold text-sm text-[#0757E8] uppercase tracking-wider flex items-center gap-1.5">
                  <Users size={16} />
                  <span>2. SQUAD PLAYERS ROSTER</span>
                </h3>

                {/* Squad File Importer */}
                <div className="bg-[#EAF2FF]/60 rounded-2xl p-4 border border-[#0757E8]/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-display font-extrabold text-xs text-[#0757E8] uppercase flex items-center gap-1.5">
                      <FileText size={15} />
                      <span>IMPORT SQUAD FILE (PDF, WORD, EXCEL, CSV)</span>
                    </span>
                    <span className="text-[10px] font-mono text-[#0757E8] font-bold">Automatic Parsing</span>
                  </div>
                  <p className="text-[11px] text-[#64748B]">
                    Upload a squad list document. The system automatically reads player names and jersey numbers!
                  </p>
                  <label className="flex items-center justify-center gap-2 h-10 rounded-xl border border-dashed border-[#0757E8] bg-white cursor-pointer hover:bg-[#F7F9FC]">
                    <Upload size={15} className="text-[#0757E8]" />
                    <span className="text-xs font-mono font-bold text-[#0757E8]">
                      {parsingFile ? 'Parsing Roster Document...' : 'Choose File (.xlsx, .csv, .docx, .pdf, .txt)'}
                    </span>
                    <input
                      type="file"
                      accept=".csv, .txt, .xlsx, .docx, .doc, .pdf"
                      onChange={handleRosterFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Manual Player Entry */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end pt-2">
                  <div className="sm:col-span-2">
                    <label className="block font-mono text-[10px] uppercase font-bold text-[#64748B] mb-1">
                      Player Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sameer Ahmad"
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      className="w-full h-9 rounded-xl border border-[#E5EAF2] px-3 font-semibold text-xs text-[#111827]"
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
                      className="w-full h-9 rounded-xl border border-[#E5EAF2] px-3 font-mono font-bold text-xs text-[#111827]"
                    />
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={handleAddManualPlayer}
                      className="w-full h-9 rounded-xl bg-[#0757E8] text-white font-display font-bold text-xs hover:bg-[#004ED0] flex items-center justify-center gap-1 shadow-xs"
                    >
                      <Plus size={15} />
                      <span>+ Add Player</span>
                    </button>
                  </div>
                </div>

                {/* Squad Roster Table */}
                {draftPlayers.length > 0 && (
                  <div className="bg-white rounded-xl border border-[#E5EAF2] overflow-hidden max-h-48 overflow-y-auto mt-2">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#F1F4F8] font-mono text-[#64748B] uppercase text-[10px]">
                        <tr>
                          <th className="p-2.5">#</th>
                          <th className="p-2.5">Player Name</th>
                          <th className="p-2.5">Position</th>
                          <th className="p-2.5 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E5EAF2]">
                        {draftPlayers.map((p) => (
                          <tr key={p.id} className="hover:bg-[#F7F9FC]">
                            <td className="p-2.5 font-mono font-bold text-[#0757E8]">#{p.jerseyNumber}</td>
                            <td className="p-2.5 font-bold text-[#111827]">{p.name}</td>
                            <td className="p-2.5 font-mono text-[#64748B]">{p.position}</td>
                            <td className="p-2.5 text-right">
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
                )}
              </div>

              {/* Submit Action */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={submitting || compressing}
                  className="px-8 py-3 rounded-2xl bg-[#0757E8] text-white font-display font-extrabold text-sm hover:bg-[#004ED0] transition-colors shadow-lg"
                >
                  {submitting ? 'Submitting Registration...' : 'Submit Official Team & Squad Roster →'}
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
