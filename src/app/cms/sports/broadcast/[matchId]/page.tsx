'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import Link from 'next/link';
import {
  Tv,
  Video,
  Smartphone,
  Play,
  Pause,
  RotateCcw,
  Square,
  Copy,
  Check,
  Activity,
  Layers,
  Target,
  AlertTriangle,
  AlertOctagon,
  UserPlus,
  Clock,
  Radio,
  Wifi,
  Maximize2,
  Sliders,
  Lock,
  Sparkles,
  Film,
  Image as ImageIcon,
  Repeat,
  Plus,
  Upload,
  X,
  Trash2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CMSPinGuard } from '@/components/sports/CMSPinGuard';
import { supabase, Match, Broadcast, MatchEvent, Sponsor } from '@/lib/supabase';
import { compressImageFile } from '@/lib/imageCompressor';

type OverlayPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

export interface AdItem {
  id: string;
  title: string;
  type: 'image' | 'video';
  url: string;
  sponsorName: string;
  durationSeconds: number;
}

export default function BroadcastConsolePage({ params }: { params: Promise<{ matchId: string }> }) {
  const resolvedParams = use(params);
  const matchId = resolvedParams.matchId;

  const [match, setMatch] = useState<Match | null>(null);
  const [broadcast, setBroadcast] = useState<Broadcast | null>(null);
  const [events, setEvents] = useState<MatchEvent[]>([]);

  // Camera Feeds
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  const [mainCamConnected, setMainCamConnected] = useState(false);
  const [activeCam, setActiveCam] = useState<'main' | 'guest1' | 'guest2'>('main');

  // Monitor Settings & Hardware Uptime
  const [showSafeArea, setShowSafeArea] = useState(false);
  const [uptimeSeconds, setUptimeSeconds] = useState(0);

  // Live Match Clock & Extra Time State
  const [matchSeconds, setMatchSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [extraTimeMinutes, setExtraTimeMinutes] = useState(0);
  const [periodName, setPeriodName] = useState('1st Half');

  // Overlay State & WYSIWYG Position
  const [overlayPosition, setOverlayPosition] = useState<OverlayPosition>('top-left');
  const [showGoalOverlay, setShowGoalOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('');

  // Guest Camera Link
  const [guestLinkId, setGuestLinkId] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);

  // Simulcast Toggles
  const [simulcastYT, setSimulcastYT] = useState(true);
  const [simulcastFB, setSimulcastFB] = useState(true);

  // --- ADVERTISEMENT MANAGEMENT STATE ---
  const [ads, setAds] = useState<AdItem[]>([]);
  const [selectedAdIndex, setSelectedAdIndex] = useState(0);
  const [adMode, setAdMode] = useState<'off' | 'play_once' | 'loop_single' | 'loop_playlist'>('off');
  const [adDisplayStyle, setAdDisplayStyle] = useState<'lower_third' | 'full_screen'>('full_screen');
  const [isAdUploading, setIsAdUploading] = useState(false);
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdSponsor, setNewAdSponsor] = useState('');
  const [newAdDuration, setNewAdDuration] = useState(8);
  const [showAddAdModal, setShowAddAdModal] = useState(false);

  // --- COLLAPSIBLE SECTIONS STATE ---
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    switcher: false,
    guestLink: false,
    ads: false,
    clock: false,
    overlay: false,
    events: false,
    simulcast: false,
  });

  const toggleSection = (key: string) => {
    setCollapsedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    fetchMatchAndBroadcast();
    initMainCamera();

    const randomId = Math.random().toString(36).substring(2, 9);
    setGuestLinkId(randomId);
  }, [matchId]);

  // Running Hardware Uptime Timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (broadcast?.status === 'live') {
      interval = setInterval(() => {
        setUptimeSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [broadcast?.status]);

  // Live Match Clock Interval
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setMatchSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  // Advertisement Playback Logic (Play Once / Loop Single / Loop Playlist)
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (adMode === 'play_once' && ads.length > 0) {
      const currentAd = ads[selectedAdIndex] || ads[0];
      const durationMs = (currentAd.durationSeconds || 8) * 1000;
      timer = setTimeout(() => {
        setAdMode('off');
      }, durationMs);
    } else if (adMode === 'loop_playlist' && ads.length > 0) {
      timer = setInterval(() => {
        setSelectedAdIndex((prev) => (prev + 1) % ads.length);
      }, 8000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(timer);
    };
  }, [adMode, selectedAdIndex, ads]);

  // Sync formatted clock string with match.status_detail in real-time
  useEffect(() => {
    if (!match) return;
    const formattedClock = getFormattedMatchClock();
    if (match.status_detail !== formattedClock) {
      setMatch((prev) => (prev ? { ...prev, status_detail: formattedClock } : null));
      supabase.from('matches').update({ status_detail: formattedClock }).eq('id', matchId).then();
    }
  }, [matchSeconds, extraTimeMinutes, periodName]);

  async function fetchMatchAndBroadcast() {
    const { data: mData } = await supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*), sponsor:sponsor_id(*)')
      .eq('id', matchId)
      .single();

    if (mData) {
      setMatch(mData);
      if (mData.status_detail) {
        if (mData.status_detail.includes('2nd Half')) setPeriodName('2nd Half');
      }

      // Fetch real sponsors from database for this tournament
      const { data: tourSponsors } = await supabase
        .from('sponsors')
        .select('*');

      if (tourSponsors && tourSponsors.length > 0) {
        const loadedAds: AdItem[] = tourSponsors.map((s) => ({
          id: `db-sponsor-${s.id}`,
          title: `${s.name} (${s.tier || 'Official Sponsor'})`,
          type: s.media_type === 'video' ? 'video' : 'image',
          url: s.media_url || s.logo_url,
          sponsorName: s.name,
          durationSeconds: 8,
        }));
        setAds(loadedAds);
      }
    }

    let { data: bData } = await supabase
      .from('broadcasts')
      .select('*')
      .eq('match_id', matchId)
      .single();

    if (!bData && mData) {
      const { data: newB } = await supabase
        .from('broadcasts')
        .insert({ match_id: matchId, status: mData.status === 'live' ? 'live' : 'idle' })
        .select()
        .single();
      bData = newB;
    }
    if (bData) setBroadcast(bData);

    const { data: eData } = await supabase
      .from('match_events')
      .select('*')
      .eq('match_id', matchId)
      .order('timestamp', { ascending: false });

    if (eData) setEvents(eData);
  }

  async function initMainCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (mainVideoRef.current) {
        mainVideoRef.current.srcObject = stream;
        setMainCamConnected(true);
      }
    } catch (err) {
      console.warn('Main camera permission denied or not found:', err);
    }
  }

  function getFormattedMatchClock() {
    const mins = Math.floor(matchSeconds / 60);
    const secs = matchSeconds % 60;
    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const extraStr = extraTimeMinutes > 0 ? ` +${extraTimeMinutes}'` : '';
    return `${timeStr}${extraStr} (${periodName})`;
  }

  async function updateScore(homeDelta: number, awayDelta: number) {
    if (!match) return;
    const newHome = Math.max(0, match.home_score + homeDelta);
    const newAway = Math.max(0, match.away_score + awayDelta);

    setMatch((prev) => (prev ? { ...prev, home_score: newHome, away_score: newAway } : null));

    await supabase
      .from('matches')
      .update({ home_score: newHome, away_score: newAway })
      .eq('id', matchId);
  }

  async function logEvent(type: string, label: string) {
    if (!match) return;

    setOverlayText(label);
    setShowGoalOverlay(true);
    setTimeout(() => setShowGoalOverlay(false), 3000);

    const currentClock = getFormattedMatchClock();
    const { data } = await supabase
      .from('match_events')
      .insert({
        match_id: matchId,
        event_type: type,
        match_time: currentClock,
      })
      .select()
      .single();

    if (data) {
      setEvents((prev) => [data as MatchEvent, ...prev]);
    }
  }

  const isGoLiveAllowed = React.useMemo(() => {
    if (!match?.scheduled_at) return true;
    if (broadcast?.status === 'live' || broadcast?.status === 'ended') return true;
    const matchTime = new Date(match.scheduled_at).getTime();
    const fiveMinsBefore = matchTime - 5 * 60 * 1000;
    return Date.now() >= fiveMinsBefore;
  }, [match?.scheduled_at, broadcast?.status]);

  const getMinutesUntilUnlock = () => {
    if (!match?.scheduled_at) return 0;
    const matchTime = new Date(match.scheduled_at).getTime();
    const fiveMinsBefore = matchTime - 5 * 60 * 1000;
    const diffMs = fiveMinsBefore - Date.now();
    if (diffMs <= 0) return 0;
    return Math.ceil(diffMs / 60000);
  };

  async function toggleGoLive() {
    if (!match || !broadcast) return;

    const isCurrentlyLive = broadcast.status === 'live';

    if (!isCurrentlyLive && !isGoLiveAllowed) {
      const matchTimeString = new Date(match.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      alert(`Broadcast control opens 5 minutes before scheduled match kickoff (${matchTimeString}). Please wait until the 5-minute pre-match window opens.`);
      return;
    }

    const newStatus = isCurrentlyLive ? 'ended' : 'live';
    const newMatchStatus = isCurrentlyLive ? 'completed' : 'live';

    setBroadcast((prev) => (prev ? { ...prev, status: newStatus } : null));

    if (!isCurrentlyLive) {
      // FRESH START: Auto-clear pre-match test scores, test timers, and test events
      const initialClock = '00:00 (1st Half)';
      setMatch((prev) => (prev ? { ...prev, home_score: 0, away_score: 0, status: 'live', status_detail: initialClock } : null));
      setMatchSeconds(0);
      setExtraTimeMinutes(0);
      setPeriodName('1st Half');
      setIsTimerRunning(true);
      setEvents([]);

      // Database sync
      await supabase.from('matches').update({ home_score: 0, away_score: 0, status: 'live', status_detail: initialClock }).eq('id', matchId);
      await supabase.from('match_events').delete().eq('match_id', matchId);
    } else {
      setMatch((prev) => (prev ? { ...prev, status: newMatchStatus } : null));
      setIsTimerRunning(false);
      await supabase.from('matches').update({ status: newMatchStatus }).eq('id', matchId);
    }

    await supabase.from('broadcasts').update({ status: newStatus }).eq('id', broadcast.id);
  }

  const copyGuestLink = () => {
    const link = `${window.location.origin}/cms/sports/broadcast/guest/${guestLinkId}`;
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formatUptime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Upload Custom Ad Media File (Video or Image)
  async function handleAdFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAdUploading(true);
      const isVideo = file.type.startsWith('video/');

      let mediaUrl = '';
      if (isVideo) {
        mediaUrl = URL.createObjectURL(file);
      } else {
        mediaUrl = await compressImageFile(file, 600, 600, 0.85);
      }

      const newAd: AdItem = {
        id: `custom-ad-${Date.now()}`,
        title: newAdTitle || file.name.replace(/\.[^/.]+$/, ''),
        type: isVideo ? 'video' : 'image',
        url: mediaUrl,
        sponsorName: newAdSponsor || 'Match Sponsor',
        durationSeconds: newAdDuration || 8,
      };

      setAds((prev) => [newAd, ...prev]);
      setSelectedAdIndex(0);
      setShowAddAdModal(false);
      setNewAdTitle('');
      setNewAdSponsor('');
    } catch (err) {
      alert('Failed to upload ad media. Please try another file.');
    } finally {
      setIsAdUploading(false);
    }
  }

  // Delete Ad Item
  function handleDeleteAd(adId: string) {
    setAds((prev) => {
      const updated = prev.filter((a) => a.id !== adId);
      if (updated.length === 0) {
        setAdMode('off');
        setSelectedAdIndex(0);
      } else if (selectedAdIndex >= updated.length) {
        setSelectedAdIndex(0);
      }
      return updated;
    });
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0] flex items-center justify-center font-mono">
        <div className="flex items-center gap-3">
          <Activity size={20} className="animate-spin text-[#E8A33D]" />
          <span>LOADING BROADCAST CONSOLE...</span>
        </div>
      </div>
    );
  }

  const isCricket = match.tournaments?.sports?.slug === 'cricket';

  const getScoreBugPositionClass = (pos: OverlayPosition) => {
    switch (pos) {
      case 'top-left':
        return 'top-4 left-4';
      case 'top-center':
        return 'top-4 left-1/2 -translate-x-1/2';
      case 'top-right':
        return 'top-4 right-4';
      case 'bottom-left':
        return 'bottom-12 left-4';
      case 'bottom-center':
        return 'bottom-12 left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-12 right-4';
      default:
        return 'top-4 left-4';
    }
  };

  const currentActiveAd = ads[selectedAdIndex] || ads[0];

  return (
    <CMSPinGuard>
      <div className="min-h-screen bg-[#091510] text-[#F7F5F0] flex flex-col font-sans selection:bg-[#E8A33D] selection:text-[#0F2A1E]">
      {/* 1. Header Bar: Dark hardware aesthetic (Sticky Fixed) */}
      <header className="sticky top-0 z-40 bg-[#0D1E16] text-[#F7F5F0] px-6 py-3 border-b border-[#1F332A] flex items-center justify-between shadow-md backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link
            href="/cms/sports"
            className="text-xs font-mono text-[#8A9A91] hover:text-[#E8A33D] transition-colors flex items-center gap-1.5"
          >
            ← Exit Console
          </Link>
          <div className="h-4 w-px bg-[#1F332A]" />
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E8A33D]" />
              <h1 className="font-display text-sm tracking-wide text-white uppercase">
                {match.home_team?.name} VS {match.away_team?.name}
              </h1>
            </div>
            <div className="flex items-center gap-3 mt-0.5">
              <span className="text-[11px] font-mono text-[#8A9A91]">
                {match.tournaments?.name} ({match.tournaments?.edition || '1st Edition'}) · {match.venue}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#132A1F] text-xs font-mono text-[#E8A33D] border border-[#22302B]">
                {getFormattedMatchClock()}
              </span>
            </div>
          </div>
        </div>

        {/* Go Live / End Broadcast Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSafeArea((prev) => !prev)}
            className={`px-3 py-1.5 rounded text-xs font-mono border transition-colors flex items-center gap-1.5 ${
              showSafeArea
                ? 'bg-[#1B4332] text-[#E8A33D] border-[#E8A33D]'
                : 'bg-[#132A1F] text-[#8A9A91] border-[#22302B] hover:text-white'
            }`}
          >
            <Maximize2 size={13} />
            <span>Safe Area (90%)</span>
          </button>

          <button
            onClick={toggleGoLive}
            disabled={broadcast?.status !== 'live' && !isGoLiveAllowed}
            className={`px-5 py-2 rounded font-display text-xs tracking-widest uppercase transition-all shadow-lg flex items-center gap-2 ${
              broadcast?.status === 'live'
                ? 'bg-[#D62828] text-white hover:bg-red-700'
                : !isGoLiveAllowed
                ? 'bg-[#132A1F] text-[#8A9A91] cursor-not-allowed border border-[#22302B]'
                : 'bg-[#E8A33D] text-[#0F2A1E] hover:bg-[#F2C878]'
            }`}
            title={
              broadcast?.status !== 'live' && !isGoLiveAllowed
                ? `Broadcast control unlocks 5 minutes before kickoff (${new Date(match.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`
                : ''
            }
          >
            {broadcast?.status === 'live' ? (
              <>
                <Square size={13} className="fill-current" />
                <span>END BROADCAST</span>
              </>
            ) : !isGoLiveAllowed ? (
              <>
                <Lock size={13} className="text-[#E8A33D]" />
                <span>LOCKED (OPENS IN {getMinutesUntilUnlock()}M)</span>
              </>
            ) : (
              <>
                <Play size={13} className="fill-current" />
                <span>GO LIVE ON AIR</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Studio Control Cockpit */}
      <div className="flex-1 grid grid-cols-12 p-4 gap-4 items-start">
        
        {/* LEFT COLUMN: FIXED ON-AIR PROGRAM FEED + TELEMETRY ONLY */}
        <div className="col-span-12 lg:col-span-7 xl:col-span-7 sticky top-[68px] z-20 space-y-3">
          
          {/* 2. Main Program Output Viewport & Monitor */}
          <div className="relative bg-black rounded-xl border border-[#22302B] aspect-video flex flex-col justify-between overflow-hidden shadow-2xl group">
            
            {/* Viewport Content: Video Feed or No Signal Pattern */}
            <div className="absolute inset-0 flex items-center justify-center bg-[#07130E]">
              {/* Full-Screen Commercial Break Takeover */}
              {adMode !== 'off' && adDisplayStyle === 'full_screen' && currentActiveAd ? (
                <div className="w-full h-full relative bg-black flex items-center justify-center z-30">
                  {currentActiveAd.type === 'video' ? (
                    <video
                      src={currentActiveAd.url}
                      autoPlay
                      loop={adMode !== 'play_once'}
                      muted
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={currentActiveAd.url}
                      alt={currentActiveAd.title}
                      className="w-full h-full object-contain bg-black"
                    />
                  )}
                  <div className="absolute top-4 right-4 z-40 bg-[#0F2A1E]/90 text-[#E8A33D] px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-[#E8A33D] uppercase flex items-center gap-2 shadow-2xl backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-[#E8A33D] animate-pulse" />
                    <span>COMMERCIAL BREAK: {currentActiveAd.sponsorName}</span>
                  </div>
                </div>
              ) : mainCamConnected && activeCam === 'main' ? (
                <video
                  ref={mainVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : activeCam === 'main' && !mainCamConnected ? (
                /* No Signal State */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0B1A13] relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: `repeating-linear-gradient(45deg, #1B4332 0, #1B4332 1px, transparent 0, transparent 50%)`,
                      backgroundSize: '16px 16px',
                    }}
                  />
                  <div className="w-16 h-16 rounded-full bg-[#132A1F] border border-[#22302B] flex items-center justify-center mb-4 text-[#8A9A91] shadow-inner z-10">
                    <Tv size={32} />
                  </div>
                  <h3 className="font-mono text-sm font-bold tracking-widest text-[#F7F5F0] uppercase z-10">
                    NO SIGNAL DETECTED
                  </h3>
                  <p className="text-xs font-mono text-[#8A9A91] mt-1 z-10">
                    Connect a camera source or select a secondary feed
                  </p>
                </div>
              ) : (
                /* Secondary Guest Feed Placeholder */
                <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0B1A13] text-center">
                  <Smartphone size={40} className="text-[#E8A33D] mb-2 animate-pulse" />
                  <div className="font-display text-sm text-[#F7F5F0] tracking-wide uppercase">
                    MOBILE GUEST FEED ({activeCam.toUpperCase()})
                  </div>
                  <div className="text-xs text-[#8A9A91] font-mono mt-1">WebRTC Signal Connected & Live</div>
                </div>
              )}
            </div>

            {/* Safe Area Guide Overlay (90%) */}
            {showSafeArea && (
              <div className="absolute inset-[5%] border border-dashed border-[#E8A33D]/40 pointer-events-none z-10 flex items-start justify-end p-2">
                <span className="font-mono text-[9px] text-[#E8A33D]/60 bg-black/60 px-1 rounded">
                  90% TITLE SAFE
                </span>
              </div>
            )}

            {/* ON AIR Badge */}
            <div className="relative z-20 flex items-center justify-between p-4 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D62828] text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>ON AIR: {activeCam.toUpperCase()} FEED</span>
              </div>

              {adMode !== 'off' && (
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8A33D] text-[#0F2A1E] text-xs font-mono font-bold uppercase tracking-wider shadow-lg">
                  <Sparkles size={12} />
                  <span>AD ACTIVE ({adMode.replace('_', ' ').toUpperCase()})</span>
                </div>
              )}
            </div>

            {/* Lower-Third PIP Ad Bug Overlay */}
            {adMode !== 'off' && adDisplayStyle === 'lower_third' && currentActiveAd && (
              <div className="absolute bottom-12 right-4 z-30 transition-all duration-300 pointer-events-none">
                <div className="bg-[#0F2A1E]/95 text-white border-2 border-[#E8A33D] p-2.5 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 max-w-xs animate-pulse">
                  {currentActiveAd.type === 'video' ? (
                    <video
                      src={currentActiveAd.url}
                      autoPlay
                      loop
                      muted
                      className="w-16 h-12 object-cover rounded border border-[#22302B]"
                    />
                  ) : (
                    <img
                      src={currentActiveAd.url}
                      alt={currentActiveAd.title}
                      className="w-16 h-12 object-contain bg-white/10 p-1 rounded border border-[#22302B]"
                    />
                  )}
                  <div className="min-w-0">
                    <div className="text-[9px] font-mono text-[#E8A33D] uppercase tracking-wider font-bold">
                      SPONSORED BY
                    </div>
                    <div className="text-xs font-display font-bold text-white uppercase truncate">
                      {currentActiveAd.sponsorName}
                    </div>
                    <div className="text-[9px] font-mono text-[#8A9A91] truncate">{currentActiveAd.title}</div>
                  </div>
                </div>
              </div>
            )}

            {/* WYSIWYG Composited Score Bug */}
            <div className={`absolute z-20 transition-all duration-300 pointer-events-none ${getScoreBugPositionClass(overlayPosition)}`}>
              <div className="bg-[#0F2A1E]/95 text-[#F7F5F0] border border-[#22302B] px-3.5 py-1.5 rounded-lg font-display text-xs flex items-center gap-3 shadow-2xl backdrop-blur-md">
                <div className="flex items-center gap-2">
                  {match.home_team?.logo_url && (
                    <img src={match.home_team.logo_url} alt="" className="w-5 h-5 object-contain" />
                  )}
                  <span className="font-bold">{match.home_team?.short_name}</span>
                  <span className="text-[#E8A33D] font-mono text-sm font-black">{match.home_score}</span>
                </div>
                <span className="text-[#8A9A91] text-xs font-mono">-</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#E8A33D] font-mono text-sm font-black">{match.away_score}</span>
                  <span className="font-bold">{match.away_team?.short_name}</span>
                  {match.away_team?.logo_url && (
                    <img src={match.away_team.logo_url} alt="" className="w-5 h-5 object-contain" />
                  )}
                </div>
                <span className="text-[#E8A33D] font-mono text-[10px] bg-[#142820] px-2 py-0.5 rounded border border-[#22302B] font-bold">
                  {Math.floor(matchSeconds / 60)}:{String(matchSeconds % 60).padStart(2, '0')}
                  {extraTimeMinutes > 0 ? ` +${extraTimeMinutes}'` : ''}
                </span>
              </div>
            </div>

            {/* Top Event Banner Overlay (Non-blocking) */}
            {showGoalOverlay && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-all duration-300">
                <div className={`px-5 py-2 rounded-full font-display text-xs font-bold flex items-center gap-2.5 shadow-2xl border-2 tracking-widest uppercase backdrop-blur-md ${
                  overlayText.includes('RED CARD')
                    ? 'bg-[#1A0A0B]/95 text-[#FF6B6B] border-[#D62828]'
                    : overlayText.includes('YELLOW CARD')
                    ? 'bg-[#1A140B]/95 text-[#E8A33D] border-[#E8A33D]'
                    : 'bg-[#0F2A1E]/95 text-[#F7F5F0] border-[#E8A33D]'
                }`}>
                  <span className="w-2 h-2 rounded-full bg-[#E8A33D] animate-pulse" />
                  <span>{overlayText}</span>
                </div>
              </div>
            )}

            {/* Timecode Burned-In Mirror Display */}
            <div className="relative z-20 flex items-center justify-between p-3 pointer-events-none">
              <div className="font-mono text-[10px] text-[#8A9A91] bg-black/80 px-2 py-0.5 rounded border border-[#22302B]">
                PROGRAM OUTPUT (1080p60)
              </div>
              <div className="font-mono text-xs text-[#E8A33D] bg-black/80 px-2.5 py-1 rounded border border-[#22302B] font-bold">
                TC {formatUptime(uptimeSeconds)}
              </div>
            </div>
          </div>

          {/* Hardware Telemetry Bar */}
          <div className="bg-[#0D2218] rounded-lg border border-[#22302B] px-4 py-2 flex items-center justify-between text-xs font-mono text-[#F7F5F0] shadow-md">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[#8A9A91]">SYSTEM HEALTH:</span>
              <span className="text-[#10B981] font-bold">OPTIMAL</span>
            </div>
            <div className="flex items-center gap-6">
              <div>
                <span className="text-[#8A9A91]">UPTIME: </span>
                <span className="text-[#E8A33D] font-bold">{formatUptime(uptimeSeconds)}</span>
              </div>
              <div>
                <span className="text-[#8A9A91]">BITRATE: </span>
                <span className="text-white font-bold">5800 kbps</span>
              </div>
              <div>
                <span className="text-[#8A9A91]">DROPPED: </span>
                <span className="text-[#10B981] font-bold">0 (0.0%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ALL SCROLLABLE & COLLAPSIBLE CONTROL PANELS */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5 flex flex-col gap-4">
          
          {/* 1. Multi-Camera Source Switcher (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 space-y-3 transition-all">
            <div
              onClick={() => toggleSection('switcher')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <Layers size={16} className="text-[#E8A33D]" />
                <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  MULTI-CAMERA SOURCE SWITCHER
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#8A9A91]">ON AIR: {activeCam.toUpperCase()}</span>
                <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                  {collapsedSections.switcher ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!collapsedSections.switcher && (
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {/* Main Camera Card */}
                <button
                  onClick={() => setActiveCam('main')}
                  className={`relative rounded-lg border p-2.5 flex flex-col items-center gap-1.5 transition-all ${
                    activeCam === 'main'
                      ? 'border-2 border-[#D62828] bg-[#1A0A0B] shadow-lg'
                      : 'border-[#22302B] bg-[#07130E] hover:border-[#1F332A]'
                  }`}
                >
                  <div className="w-full aspect-video rounded bg-[#0D1E16] flex items-center justify-center border border-[#1F332A]">
                    <Video size={18} className={activeCam === 'main' ? 'text-[#D62828]' : 'text-[#8A9A91]'} />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-mono font-bold text-white uppercase">MAIN CAM</div>
                    <div className="text-[9px] font-mono text-[#8A9A91]">
                      {mainCamConnected ? 'Capture Card' : 'Webcam Standby'}
                    </div>
                  </div>
                  {activeCam === 'main' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D62828] text-white text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ON AIR
                    </span>
                  )}
                </button>

                {/* Guest Cam 1 Card */}
                <button
                  onClick={() => setActiveCam('guest1')}
                  className={`relative rounded-lg border p-2.5 flex flex-col items-center gap-1.5 transition-all ${
                    activeCam === 'guest1'
                      ? 'border-2 border-[#D62828] bg-[#1A0A0B] shadow-lg'
                      : 'border-[#22302B] bg-[#07130E] hover:border-[#1F332A]'
                  }`}
                >
                  <div className="w-full aspect-video rounded bg-[#0D1E16] flex items-center justify-center border border-[#1F332A]">
                    <Smartphone size={18} className={activeCam === 'guest1' ? 'text-[#D62828]' : 'text-[#8A9A91]'} />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-mono font-bold text-white uppercase">GUEST CAM 1</div>
                    <div className="text-[9px] font-mono text-[#8A9A91]">Mobile Operator</div>
                  </div>
                  {activeCam === 'guest1' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D62828] text-white text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ON AIR
                    </span>
                  )}
                </button>

                {/* Guest Cam 2 Card */}
                <button
                  onClick={() => setActiveCam('guest2')}
                  className={`relative rounded-lg border p-2.5 flex flex-col items-center gap-1.5 transition-all ${
                    activeCam === 'guest2'
                      ? 'border-2 border-[#D62828] bg-[#1A0A0B] shadow-lg'
                      : 'border-[#22302B] bg-[#07130E] hover:border-[#1F332A]'
                  }`}
                >
                  <div className="w-full aspect-video rounded bg-[#0D1E16] flex items-center justify-center border border-[#1F332A]">
                    <Smartphone size={18} className={activeCam === 'guest2' ? 'text-[#D62828]' : 'text-[#8A9A91]'} />
                  </div>
                  <div className="text-center">
                    <div className="text-[11px] font-mono font-bold text-white uppercase">GUEST CAM 2</div>
                    <div className="text-[9px] font-mono text-[#8A9A91]">Mobile Operator</div>
                  </div>
                  {activeCam === 'guest2' && (
                    <span className="px-2 py-0.5 rounded-full bg-[#D62828] text-white text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      ON AIR
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 2. Mobile Camera Operator Link Generator (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 transition-all">
            <div
              onClick={() => toggleSection('guestLink')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#132A1F] border border-[#22302B] flex items-center justify-center text-[#E8A33D] shrink-0">
                  <Radio size={14} />
                </div>
                <h4 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  MOBILE OPERATOR LINK
                </h4>
              </div>
              <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                {collapsedSections.guestLink ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
            </div>

            {!collapsedSections.guestLink && (
              <div className="flex items-center justify-between gap-3 pt-3">
                <p className="text-[10px] font-mono text-[#8A9A91]">
                  Zero-install WebRTC mobile feed URL for field cameras.
                </p>
                <button
                  onClick={copyGuestLink}
                  className="px-3.5 py-1.5 rounded bg-[#E8A33D] text-[#0F2A1E] text-xs font-mono font-bold hover:bg-[#F2C878] transition-colors flex items-center gap-1.5 shrink-0 shadow"
                >
                  {copiedLink ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                </button>
              </div>
            )}
          </div>

          {/* 3. LIVE COMMERCIAL & SPONSOR ADVERTISEMENT CONSOLE (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 space-y-4 shadow-xl transition-all">
            <div
              onClick={() => toggleSection('ads')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2.5 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#E8A33D]" />
                <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  LIVE COMMERCIAL & SPONSOR ADVERTISEMENTS
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                  adMode !== 'off'
                    ? 'bg-[#E8A33D] text-[#0F2A1E] border-[#E8A33D] font-black animate-pulse'
                    : 'bg-[#132A1F] text-[#8A9A91] border-[#22302B]'
                }`}>
                  {adMode === 'off' ? '● OFF' : `ON AIR: ${adMode.replace('_', ' ').toUpperCase()}`}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowAddAdModal((prev) => !prev);
                  }}
                  className="px-2 py-0.5 rounded bg-[#132A1F] text-[#E8A33D] text-[11px] font-mono border border-[#22302B] hover:bg-[#1B4332] transition-colors flex items-center gap-1"
                >
                  <Plus size={12} />
                  <span>Add Ad</span>
                </button>

                <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                  {collapsedSections.ads ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!collapsedSections.ads && (
              <div className="space-y-4 pt-1">
                {/* Ad Add Form Modal inline */}
                {showAddAdModal && (
                  <div className="p-3 bg-[#07130E] rounded-lg border border-[#E8A33D]/40 space-y-3">
                    <div className="flex items-center justify-between border-b border-[#1F332A] pb-1.5 text-xs font-mono text-[#E8A33D] font-bold">
                      <span>UPLOAD NEW AD MEDIA (IMAGE / MP4 VIDEO)</span>
                      <button onClick={() => setShowAddAdModal(false)}>
                        <X size={14} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <input
                        type="text"
                        placeholder="Ad Title"
                        value={newAdTitle}
                        onChange={(e) => setNewAdTitle(e.target.value)}
                        className="p-2 rounded bg-[#091510] text-white border border-[#22302B] focus:border-[#E8A33D] focus:outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Sponsor Name"
                        value={newAdSponsor}
                        onChange={(e) => setNewAdSponsor(e.target.value)}
                        className="p-2 rounded bg-[#091510] text-white border border-[#22302B] focus:border-[#E8A33D] focus:outline-none"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <label className="flex-1 flex items-center justify-center gap-2 p-2 rounded border border-dashed border-[#22302B] bg-[#091510] cursor-pointer hover:border-[#E8A33D] text-xs font-mono text-[#8A9A91]">
                        <Upload size={14} className="text-[#E8A33D]" />
                        <span>{isAdUploading ? 'Uploading...' : 'Select Video (.mp4) or Image (.png/.jpg)'}</span>
                        <input
                          type="file"
                          accept="image/*,video/mp4,video/webm"
                          onChange={handleAdFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                )}

                {/* Display Mode & Global Controls */}
                <div className="grid grid-cols-2 gap-3 p-3 bg-[#07130E] rounded-lg border border-[#1F332A]">
                  <div>
                    <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1">AD DISPLAY STYLE</div>
                    <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                      <button
                        onClick={() => setAdDisplayStyle('full_screen')}
                        className={`p-1.5 rounded border transition-colors ${
                          adDisplayStyle === 'full_screen'
                            ? 'bg-[#1B4332] text-[#E8A33D] border-[#E8A33D] font-bold'
                            : 'bg-[#091510] text-[#8A9A91] border-[#22302B] hover:text-white'
                        }`}
                      >
                        Full Commercial
                      </button>
                      <button
                        onClick={() => setAdDisplayStyle('lower_third')}
                        className={`p-1.5 rounded border transition-colors ${
                          adDisplayStyle === 'lower_third'
                            ? 'bg-[#1B4332] text-[#E8A33D] border-[#E8A33D] font-bold'
                            : 'bg-[#091510] text-[#8A9A91] border-[#22302B] hover:text-white'
                        }`}
                      >
                        Lower-Third PIP
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1">GLOBAL PLAYBACK MODE</div>
                    <div className="flex gap-1.5 text-xs font-mono">
                      <button
                        onClick={() => {
                          if (ads.length > 0) setAdMode('loop_playlist');
                        }}
                        disabled={ads.length === 0}
                        className={`flex-1 p-1.5 rounded border transition-colors flex items-center justify-center gap-1 ${
                          adMode === 'loop_playlist'
                            ? 'bg-[#E8A33D] text-[#0F2A1E] border-[#E8A33D] font-bold shadow'
                            : ads.length === 0
                            ? 'bg-[#091510] text-[#8A9A91]/50 border-[#22302B] cursor-not-allowed'
                            : 'bg-[#091510] text-[#8A9A91] border-[#22302B] hover:text-white'
                        }`}
                      >
                        <Repeat size={13} />
                        <span>Loop All</span>
                      </button>
                      <button
                        onClick={() => setAdMode('off')}
                        className={`px-3 p-1.5 rounded border transition-colors font-bold ${
                          adMode === 'off'
                            ? 'bg-[#132A1F] text-[#8A9A91] border-[#22302B]'
                            : 'bg-[#D62828] text-white border-[#D62828] hover:bg-red-700'
                        }`}
                      >
                        STOP AD
                      </button>
                    </div>
                  </div>
                </div>

                {/* Ad Media Playlist Cards */}
                <div className="space-y-2">
                  <div className="text-[10px] font-mono text-[#8A9A91] uppercase flex justify-between">
                    <span>REGISTERED AD MEDIA ({ads.length})</span>
                    <span>Click mode to trigger on-air</span>
                  </div>

                  {ads.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {ads.map((ad, idx) => {
                        const isSelected = selectedAdIndex === idx && adMode !== 'off';
                        return (
                          <div
                            key={ad.id}
                            className={`p-2.5 rounded-lg border flex flex-col justify-between gap-2 transition-all ${
                              isSelected
                                ? 'border-2 border-[#E8A33D] bg-[#142820] shadow-lg'
                                : 'border-[#22302B] bg-[#07130E] hover:border-[#1F332A]'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2 min-w-0">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <div className="w-8 h-8 rounded bg-[#0D1E16] border border-[#1F332A] flex items-center justify-center shrink-0 overflow-hidden">
                                  {ad.type === 'video' ? (
                                    <Film size={15} className="text-[#E8A33D]" />
                                  ) : (
                                    <img src={ad.url} alt="" className="w-full h-full object-contain" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-xs font-mono font-bold text-white truncate">{ad.sponsorName}</div>
                                  <div className="text-[10px] font-mono text-[#8A9A91] truncate">{ad.title}</div>
                                </div>
                              </div>

                              <button
                                onClick={() => handleDeleteAd(ad.id)}
                                className="p-1 rounded text-[#8A9A91] hover:text-red-400 hover:bg-red-950/30 transition-colors shrink-0"
                                title="Delete Ad"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>

                            {/* Action Buttons for this Ad */}
                            <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                              <button
                                onClick={() => {
                                  setSelectedAdIndex(idx);
                                  setAdMode('play_once');
                                }}
                                className={`py-1 rounded border transition-colors flex items-center justify-center gap-1 ${
                                  isSelected && adMode === 'play_once'
                                    ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold border-[#E8A33D]'
                                    : 'bg-[#132A1F] text-[#F7F5F0] border-[#22302B] hover:bg-[#1B4332]'
                                }`}
                              >
                                <Play size={10} className="fill-current" />
                                <span>Play Once</span>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedAdIndex(idx);
                                  setAdMode('loop_single');
                                }}
                                className={`py-1 rounded border transition-colors flex items-center justify-center gap-1 ${
                                  isSelected && adMode === 'loop_single'
                                    ? 'bg-[#E8A33D] text-[#0F2A1E] font-bold border-[#E8A33D]'
                                    : 'bg-[#132A1F] text-[#F7F5F0] border-[#22302B] hover:bg-[#1B4332]'
                                }`}
                              >
                                <Repeat size={10} />
                                <span>Loop Ad</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-[#07130E] border border-[#1F332A] text-center space-y-1">
                      <div className="text-xs font-mono text-[#8A9A91]">No advertisements loaded</div>
                      <p className="text-[10px] font-mono text-[#8A9A91]/70">
                        Click "+ Add Ad" above to upload custom video/image ads or add sponsors in CMS.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 4. Live Match Clock & Stoppage / Extra Time Controller (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 space-y-3 shadow-md transition-all">
            <div
              onClick={() => toggleSection('clock')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#E8A33D]" />
                <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  MATCH CLOCK & EXTRA TIME
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#E8A33D]">
                  {isTimerRunning ? '● RUNNING' : 'PAUSED'}
                </span>
                <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                  {collapsedSections.clock ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!collapsedSections.clock && (
              <div className="space-y-3 pt-1">
                {/* Big Clock Display */}
                <div className="p-3 bg-[#07130E] rounded-lg border border-[#1F332A] flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-[#8A9A91] uppercase">{periodName}</div>
                    <div className="font-mono text-2xl font-bold text-[#E8A33D]">
                      {Math.floor(matchSeconds / 60)}:{String(matchSeconds % 60).padStart(2, '0')}
                      {extraTimeMinutes > 0 && (
                        <span className="text-lg text-[#FF6B6B] ml-2">+{extraTimeMinutes}'</span>
                      )}
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsTimerRunning((prev) => !prev)}
                      className={`p-2 rounded-lg font-mono text-xs font-bold transition-all shadow ${
                        isTimerRunning
                          ? 'bg-amber-600 text-white hover:bg-amber-700'
                          : 'bg-[#E8A33D] text-[#0F2A1E] hover:bg-[#F2C878]'
                      }`}
                      title={isTimerRunning ? 'Pause Clock' : 'Start Clock'}
                    >
                      {isTimerRunning ? <Pause size={16} /> : <Play size={16} className="fill-current" />}
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setMatchSeconds(0);
                        setExtraTimeMinutes(0);
                      }}
                      className="p-2 rounded-lg bg-[#132A1F] text-[#8A9A91] hover:text-white border border-[#22302B] transition-colors"
                      title="Reset Clock to 00:00"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>
                </div>

                {/* Quick Period Presets */}
                <div>
                  <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1">PERIOD PRESETS</div>
                  <div className="grid grid-cols-3 gap-1.5 text-xs font-mono">
                    <button
                      onClick={() => {
                        setPeriodName('1st Half');
                        setMatchSeconds(0);
                      }}
                      className={`p-1.5 rounded border transition-colors ${
                        periodName === '1st Half'
                          ? 'bg-[#1B4332] text-[#E8A33D] border-[#E8A33D]'
                          : 'bg-[#07130E] text-[#8A9A91] border-[#1F332A] hover:text-white'
                      }`}
                    >
                      1st Half (0')
                    </button>
                    <button
                      onClick={() => {
                        setPeriodName('2nd Half');
                        setMatchSeconds(45 * 60);
                      }}
                      className={`p-1.5 rounded border transition-colors ${
                        periodName === '2nd Half'
                          ? 'bg-[#1B4332] text-[#E8A33D] border-[#E8A33D]'
                          : 'bg-[#07130E] text-[#8A9A91] border-[#1F332A] hover:text-white'
                      }`}
                    >
                      2nd Half (45')
                    </button>
                    <button
                      onClick={() => {
                        setPeriodName('Extra Time ET1');
                        setMatchSeconds(90 * 60);
                      }}
                      className={`p-1.5 rounded border transition-colors ${
                        periodName === 'Extra Time ET1'
                          ? 'bg-[#1B4332] text-[#E8A33D] border-[#E8A33D]'
                          : 'bg-[#07130E] text-[#8A9A91] border-[#1F332A] hover:text-white'
                      }`}
                    >
                      ET1 (90')
                    </button>
                  </div>
                </div>

                {/* Stoppage / Extra Time Modifier */}
                <div>
                  <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1 flex items-center justify-between">
                    <span>STOPPAGE / EXTRA TIME</span>
                    <span className="text-[#E8A33D] font-bold">+{extraTimeMinutes} MINS</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-xs font-mono font-bold mb-2">
                    {[0, 2, 5, 8, 10, 12, 15].map((mins) => (
                      <button
                        key={mins}
                        onClick={() => setExtraTimeMinutes(mins)}
                        className={`py-1 rounded border transition-colors ${
                          extraTimeMinutes === mins
                            ? 'bg-[#D62828] text-white border-[#D62828] shadow'
                            : 'bg-[#07130E] text-[#8A9A91] border-[#1F332A] hover:text-white'
                        }`}
                      >
                        {mins === 0 ? 'Clear' : `+${mins}'`}
                      </button>
                    ))}
                  </div>

                  {/* Custom Input Stepper */}
                  <div className="flex items-center gap-2 p-1.5 bg-[#07130E] rounded border border-[#1F332A]">
                    <span className="text-[10px] font-mono text-[#8A9A91] flex-1">CUSTOM MINS:</span>
                    <button
                      type="button"
                      onClick={() => setExtraTimeMinutes((prev) => Math.max(0, prev - 1))}
                      className="px-2 py-0.5 rounded bg-[#132A1F] text-white font-mono font-bold border border-[#22302B] hover:bg-[#1B4332]"
                    >
                      -1
                    </button>
                    <input
                      type="number"
                      min={0}
                      max={60}
                      value={extraTimeMinutes}
                      onChange={(e) => setExtraTimeMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-12 text-center py-0.5 rounded bg-[#091510] text-[#E8A33D] font-mono font-bold border border-[#22302B] focus:outline-none focus:border-[#E8A33D]"
                    />
                    <button
                      type="button"
                      onClick={() => setExtraTimeMinutes((prev) => prev + 1)}
                      className="px-2 py-0.5 rounded bg-[#1B4332] text-white font-mono font-bold border border-[#22302B] hover:bg-[#E8A33D] hover:text-[#0F2A1E]"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 5. WYSIWYG Score & Overlay Position Controller (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 space-y-4 transition-all">
            <div
              onClick={() => toggleSection('overlay')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-[#E8A33D]" />
                <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  OVERLAY LAYOUT CONTROLLER
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#E8A33D] uppercase">{overlayPosition}</span>
                <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                  {collapsedSections.overlay ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!collapsedSections.overlay && (
              <div className="space-y-4 pt-1">
                {/* Live 16:9 Miniature Output Preview Canvas */}
                <div>
                  <div className="text-[11px] font-mono text-[#8A9A91] mb-1.5 flex justify-between">
                    <span>GRAPHIC POSITION PRESETS</span>
                    <span className="text-white font-bold uppercase">{overlayPosition}</span>
                  </div>
                  <div className="relative aspect-video rounded-lg bg-[#07130E] border border-[#1F332A] p-2 overflow-hidden shadow-inner">
                    {/* 6 Grid Position Presets */}
                    <div className="grid grid-cols-3 grid-rows-2 h-full gap-1">
                      {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as OverlayPosition[]).map(
                        (pos) => (
                          <button
                            key={pos}
                            onClick={() => setOverlayPosition(pos)}
                            className={`rounded border transition-all flex items-center justify-center p-1 ${
                              overlayPosition === pos
                                ? 'border-[#E8A33D] bg-[#E8A33D]/20 text-[#E8A33D] font-bold shadow'
                                : 'border-[#1F332A] bg-[#0D1E16] text-[#8A9A91] hover:border-[#22302B] hover:text-white'
                            }`}
                          >
                            <span className="text-[9px] font-mono uppercase">{pos.replace('-', ' ')}</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Score Modifier Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#1F332A]">
                  {/* Home Team Score Controls */}
                  <div className="p-3 bg-[#07130E] rounded-lg border border-[#1F332A] space-y-2 text-center">
                    <span className="text-xs font-mono font-bold text-white block truncate">
                      {match.home_team?.short_name}
                    </span>
                    <div className="font-display text-3xl text-[#E8A33D]">{match.home_score}</div>
                    <div className="flex gap-1.5 justify-center">
                      <button
                        onClick={() => updateScore(1, 0)}
                        className="flex-1 py-1 rounded bg-[#1B4332] text-white text-xs font-mono font-bold border border-[#22302B] hover:bg-[#E8A33D] hover:text-[#0F2A1E] transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateScore(-1, 0)}
                        className="flex-1 py-1 rounded bg-[#132A1F] text-[#8A9A91] text-xs font-mono font-bold border border-[#22302B] hover:text-white transition-colors"
                      >
                        -1
                      </button>
                    </div>
                  </div>

                  {/* Away Team Score Controls */}
                  <div className="p-3 bg-[#07130E] rounded-lg border border-[#1F332A] space-y-2 text-center">
                    <span className="text-xs font-mono font-bold text-white block truncate">
                      {match.away_team?.short_name}
                    </span>
                    <div className="font-display text-3xl text-[#E8A33D]">{match.away_score}</div>
                    <div className="flex gap-1.5 justify-center">
                      <button
                        onClick={() => updateScore(0, 1)}
                        className="flex-1 py-1 rounded bg-[#1B4332] text-white text-xs font-mono font-bold border border-[#22302B] hover:bg-[#E8A33D] hover:text-[#0F2A1E] transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateScore(0, -1)}
                        className="flex-1 py-1 rounded bg-[#132A1F] text-[#8A9A91] text-xs font-mono font-bold border border-[#22302B] hover:text-white transition-colors"
                      >
                        -1
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. Quick Event Logger (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 space-y-3 transition-all">
            <div
              onClick={() => toggleSection('events')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <Target size={16} className="text-[#E8A33D]" />
                <h3 className="font-display text-xs text-white uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  QUICK EVENT LOGGER ({isCricket ? 'CRICKET' : 'FOOTBALL'})
                </h3>
              </div>
              <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                {collapsedSections.events ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </button>
            </div>

            {!collapsedSections.events && (
              <div className="pt-1">
                {!isCricket ? (
                  <div className="space-y-3">
                    {/* Scoring */}
                    <div>
                      <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1">SCORING EVENTS</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            updateScore(1, 0);
                            logEvent('goal', 'GOAL!');
                          }}
                          className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] hover:border-[#E8A33D] hover:text-[#E8A33D] transition-colors flex items-center gap-2"
                        >
                          <Target size={14} className="text-[#E8A33D]" />
                          <span>Goal ({match.home_team?.short_name})</span>
                        </button>
                        <button
                          onClick={() => {
                            updateScore(0, 1);
                            logEvent('goal', 'GOAL!');
                          }}
                          className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] hover:border-[#E8A33D] hover:text-[#E8A33D] transition-colors flex items-center gap-2"
                        >
                          <Target size={14} className="text-[#E8A33D]" />
                          <span>Goal ({match.away_team?.short_name})</span>
                        </button>
                      </div>
                    </div>

                    {/* Discipline */}
                    <div>
                      <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1">DISCIPLINE</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => logEvent('card_yellow', 'YELLOW CARD')}
                          className="p-2.5 rounded-lg bg-[#142820] text-[#E8A33D] font-mono text-xs font-semibold border border-[#E8A33D]/60 hover:bg-amber-950/30 transition-colors flex items-center gap-2"
                        >
                          <AlertTriangle size={14} className="text-[#E8A33D]" />
                          <span>Yellow Card</span>
                        </button>
                        <button
                          onClick={() => logEvent('card_red', 'RED CARD')}
                          className="p-2.5 rounded-lg bg-[#142820] text-[#FF6B6B] font-mono text-xs font-semibold border border-[#D62828] hover:bg-red-950/30 transition-colors flex items-center gap-2"
                        >
                          <AlertOctagon size={14} className="text-[#D62828]" />
                          <span>Red Card</span>
                        </button>
                      </div>
                    </div>

                    {/* Match Flow */}
                    <div>
                      <div className="text-[10px] font-mono text-[#8A9A91] uppercase mb-1">MATCH FLOW</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => logEvent('substitution', 'SUBSTITUTION')}
                          className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] hover:border-[#8A9A91] transition-colors flex items-center gap-2"
                        >
                          <UserPlus size={14} className="text-[#8A9A91]" />
                          <span>Substitution</span>
                        </button>
                        <button
                          onClick={() => logEvent('period_end', 'FULL TIME')}
                          className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] hover:border-[#8A9A91] transition-colors flex items-center gap-2"
                        >
                          <Clock size={14} className="text-[#8A9A91]" />
                          <span>Period End</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        updateScore(1, 0);
                        logEvent('four', 'FOUR!');
                      }}
                      className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] hover:border-[#E8A33D] flex items-center gap-2"
                    >
                      <Target size={14} className="text-[#E8A33D]" />
                      <span>4 Runs</span>
                    </button>
                    <button
                      onClick={() => {
                        updateScore(1, 0);
                        logEvent('six', 'SIX!');
                      }}
                      className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] hover:border-[#E8A33D] flex items-center gap-2"
                    >
                      <Target size={14} className="text-[#E8A33D]" />
                      <span>6 Runs</span>
                    </button>
                    <button
                      onClick={() => logEvent('wicket', 'WICKET!')}
                      className="p-2.5 rounded-lg bg-[#142820] text-[#FF6B6B] font-mono text-xs font-semibold border border-[#D62828] flex items-center gap-2"
                    >
                      <AlertOctagon size={14} className="text-[#D62828]" />
                      <span>Wicket Out</span>
                    </button>
                    <button
                      onClick={() => logEvent('over', 'OVER END')}
                      className="p-2.5 rounded-lg bg-[#142820] text-white font-mono text-xs font-semibold border border-[#22302B] flex items-center gap-2"
                    >
                      <Clock size={14} className="text-[#8A9A91]" />
                      <span>Over Complete</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 7. Simulcast Destinations Panel (Collapsible) */}
          <div className="bg-[#0D2218] rounded-xl border border-[#22302B] p-4 space-y-3 transition-all">
            <div
              onClick={() => toggleSection('simulcast')}
              className="flex items-center justify-between border-b border-[#1F332A] pb-2 cursor-pointer select-none group"
            >
              <div className="flex items-center gap-2">
                <Wifi size={16} className="text-[#E8A33D]" />
                <h4 className="font-display text-xs text-[#F7F5F0] uppercase tracking-wider group-hover:text-[#E8A33D] transition-colors">
                  SIMULCAST DESTINATIONS
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#8A9A91]">RTMPS Live Feed</span>
                <button className="p-1 rounded text-[#8A9A91] hover:text-white transition-colors">
                  {collapsedSections.simulcast ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                </button>
              </div>
            </div>

            {!collapsedSections.simulcast && (
              <div className="space-y-2.5 pt-1">
                {/* YouTube Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07130E] border border-[#1F332A]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF0000]" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">YouTube Live</div>
                      <div className="text-[10px] font-mono text-[#8A9A91]">
                        {simulcastYT ? (broadcast?.status === 'live' ? 'Streaming (1080p)' : 'Ready (RTMPS)') : 'Disabled'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSimulcastYT((prev) => !prev)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      simulcastYT ? 'bg-[#E8A33D]' : 'bg-[#1F332A]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-[#0F2A1E] transition-transform ${
                        simulcastYT ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Facebook Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#07130E] border border-[#1F332A]">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]" />
                    <div>
                      <div className="text-xs font-mono font-bold text-white">Facebook Live</div>
                      <div className="text-[10px] font-mono text-[#8A9A91]">
                        {simulcastFB ? (broadcast?.status === 'live' ? 'Streaming (1080p)' : 'Ready (Live API)') : 'Disabled'}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSimulcastFB((prev) => !prev)}
                    className={`w-10 h-5 rounded-full p-0.5 transition-colors ${
                      simulcastFB ? 'bg-[#E8A33D]' : 'bg-[#1F332A]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full bg-[#0F2A1E] transition-transform ${
                        simulcastFB ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </CMSPinGuard>
  );
}
