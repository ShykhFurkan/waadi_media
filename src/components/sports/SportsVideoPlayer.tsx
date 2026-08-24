'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  Settings,
  Tv,
  Check,
  Radio,
  Sparkles,
  Award,
  Trophy
} from 'lucide-react';
import { Room, RoomEvent, RemoteVideoTrack, Track } from 'livekit-client';
import Hls from 'hls.js';
import { supabase, Match } from '@/lib/supabase';
import { LiveBadge } from './LiveBadge';

export interface AdState {
  active: boolean;
  currentAd: {
    id?: string;
    title?: string;
    type?: 'image' | 'video';
    url?: string;
    sponsorName?: string;
    durationSeconds?: number;
  } | null;
  adDisplayStyle?: 'lower_third' | 'full_screen';
}

export interface OverlayState {
  showGoalOverlay: boolean;
  overlayText: string;
  overlayPosition: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export interface ScoreboardState {
  homeTeamName?: string;
  homeTeamShort?: string;
  homeScore?: number;
  awayTeamName?: string;
  awayTeamShort?: string;
  awayScore?: number;
  matchClock?: string;
  statusDetail?: string;
  tournamentName?: string;
  venue?: string;
}

interface SportsVideoPlayerProps {
  matchId?: string;
  streamUrl?: string;
  title: string;
  subtitle?: string;
  sponsorName?: string;
  isLive?: boolean;
}

export function SportsVideoPlayer({
  matchId,
  streamUrl,
  title,
  subtitle,
  sponsorName,
  isLive = true,
}: SportsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(1);
  const [quality, setQuality] = useState<'1080p' | '720p' | '480p' | '360p' | 'auto'>('1080p');
  const [showQualityMenu, setShowQualityMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [hasWebRTCStream, setHasWebRTCStream] = useState(false);

  // Advertisement, Overlay, and Scoreboard State from Broadcast Console / Supabase
  const [adState, setAdState] = useState<AdState | null>(null);
  const [overlayState, setOverlayState] = useState<OverlayState | null>(null);
  const [scoreboardState, setScoreboardState] = useState<ScoreboardState | null>(null);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initial Match Fetch for Scoreboard if matchId is provided
  useEffect(() => {
    if (!matchId) return;
    supabase
      .from('matches')
      .select('*, tournaments(*, sports(*)), home_team:home_team_id(*), away_team:away_team_id(*)')
      .eq('id', matchId)
      .single()
      .then(({ data }) => {
        if (data) {
          setScoreboardState({
            homeTeamName: data.home_team?.name,
            homeTeamShort: data.home_team?.short_name || 'HOME',
            homeScore: data.home_score,
            awayTeamName: data.away_team?.name,
            awayTeamShort: data.away_team?.short_name || 'AWAY',
            awayScore: data.away_score,
            matchClock: data.status_detail || '00:00 (1st Half)',
            tournamentName: data.tournaments?.name,
            venue: data.venue,
          });
        }
      });
  }, [matchId]);

  const livekitRoomRef = useRef<Room | null>(null);

  // Connect Viewer to LiveKit Cloud Room as subscriber
  useEffect(() => {
    if (!matchId) return;

    let isSubscribed = true;

    async function connectViewerLiveKit() {
      try {
        const roomName = `waadi_match_${matchId}`;
        const identity = `viewer_${Math.random().toString(36).substring(2, 7)}`;
        const res = await fetch(`/api/livekit/token?room=${encodeURIComponent(roomName)}&identity=${encodeURIComponent(identity)}&role=subscriber`);
        const data = await res.json();

        if (!isSubscribed) return;

        if (data.token) {
          const room = new Room({
            adaptiveStream: true,
            dynacast: true,
          });
          livekitRoomRef.current = room;

          const attachTrackToVideo = (track: Track | RemoteVideoTrack) => {
            const videoEl = videoRef.current;
            if (videoEl && track) {
              try {
                track.attach(videoEl);
                videoEl.muted = true;
                videoEl
                  .play()
                  .then(() => {
                    setHasWebRTCStream(true);
                  })
                  .catch(() => {
                    videoEl.muted = true;
                    videoEl.play().catch(() => {});
                    setHasWebRTCStream(true);
                  });
              } catch (e) {
                if (track.mediaStreamTrack) {
                  videoEl.srcObject = new MediaStream([track.mediaStreamTrack]);
                  videoEl.play().catch(() => {});
                  setHasWebRTCStream(true);
                }
              }
            }
          };

          room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
            if (track.kind === Track.Kind.Video) {
              attachTrackToVideo(track as RemoteVideoTrack);
            }
          });

          const wsUrl = data.wsUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL;
          await room.connect(wsUrl, data.token);

          // Check if studio stream is already published in room
          room.remoteParticipants.forEach((participant) => {
            participant.trackPublications.forEach((pub) => {
              if (pub.kind === Track.Kind.Video) {
                if (!pub.isSubscribed) {
                  pub.setSubscribed(true);
                }
                if (pub.track) {
                  attachTrackToVideo(pub.track as RemoteVideoTrack);
                }
              }
            });
          });
        }
      } catch (e) {
        console.warn('LiveKit viewer subscriber connection notice:', e);
      }
    }

    connectViewerLiveKit();

    return () => {
      isSubscribed = false;
      if (livekitRoomRef.current) livekitRoomRef.current.disconnect();
    };
  }, [matchId]);

  // WebRTC Stream Receiver & Realtime Ad/Overlay/Scoreboard Listener for Viewers
  useEffect(() => {
    if (!matchId || !isLive) return;

    const viewerId = Math.random().toString(36).substring(2, 9);
    const channelName = `live_stream_${matchId}`;
    const channel = supabase.channel(channelName);
    const bc = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel(channelName) : null;

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' },
        { urls: 'stun:stun3.l.google.com:19302' },
        { urls: 'stun:stun4.l.google.com:19302' },
      ],
    });

    let pendingCandidates: RTCIceCandidateInit[] = [];

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        const stream = event.streams[0];
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
          setHasWebRTCStream(true);
        }
      }
    };

    const sendSignal = (payload: any) => {
      const fullPayload = { ...payload, viewerId };
      channel.send({ type: 'broadcast', event: 'stream', payload: fullPayload }).catch(() => {});
      bc?.postMessage(fullPayload);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const candJSON = event.candidate.toJSON
          ? event.candidate.toJSON()
          : { candidate: event.candidate.candidate, sdpMid: event.candidate.sdpMid, sdpMLineIndex: event.candidate.sdpMLineIndex };
        sendSignal({ type: 'candidate', candidate: candJSON });
      }
    };

    const handleSignal = async (data: any) => {
      if (!data) return;

      if (data.adState) {
        setAdState((prev) => {
          if (prev?.active && !data.adState.active) {
            // Ad closed: immediately resume camera stream without delay
            setTimeout(() => {
              if (videoRef.current) {
                videoRef.current.play().catch(() => {});
              }
            }, 10);
          }
          return data.adState;
        });
      }
      if (data.overlayState) {
        setOverlayState(data.overlayState);
      }
      if (data.scoreboardState) {
        setScoreboardState((prev) => ({ ...prev, ...data.scoreboardState }));
      }

      if (data.type === 'camera_switched') {
        if (videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }

      if (data.viewerId !== viewerId) return;

      if (data.type === 'offer' && data.offer) {
        try {
          if (pc.signalingState === 'stable' || pc.signalingState === 'have-local-offer') {
            await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            sendSignal({ type: 'answer', answer: { type: answer.type, sdp: answer.sdp } });

            for (const cand of pendingCandidates) {
              await pc.addIceCandidate(new RTCIceCandidate(cand));
            }
            pendingCandidates = [];
          }
        } catch (e) {
          console.error('Error handling offer on viewer:', e);
        }
      } else if (data.type === 'candidate' && data.candidate) {
        try {
          if (pc.remoteDescription && pc.remoteDescription.type) {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } else {
            pendingCandidates.push(data.candidate);
          }
        } catch (e) {}
      }
    };

    channel
      .on('broadcast', { event: 'stream' }, ({ payload }) => handleSignal(payload))
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          sendSignal({ type: 'viewer_ready' });
        }
      });

    if (bc) {
      bc.onmessage = (e) => handleSignal(e.data);
    }

    // Periodic heartbeat until stream attaches
    const heartbeat = setInterval(() => {
      if (pc.connectionState !== 'connected') {
        sendSignal({ type: 'viewer_ready' });
      }
    }, 2500);

    return () => {
      clearInterval(heartbeat);
      pc.close();
      supabase.removeChannel(channel);
      bc?.close();
    };
  }, [matchId, isLive]);

  // Low-Latency HLS (LL-HLS) Playback Engine for Public Viewers (§6)
  useEffect(() => {
    if (!streamUrl || !videoRef.current) return;
    const videoEl = videoRef.current;

    let hls: Hls | null = null;
    if (Hls.isSupported()) {
      hls = new Hls({
        lowLatencyMode: true,
        backBufferLength: 90,
        liveSyncDurationCount: 5, // 5-second target broadcast delay
        liveMaxLatencyDurationCount: 7,
        liveDurationInfinity: true,
        highBufferWatchdogPeriod: 1,
        enableWorker: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoEl.play().catch(() => {});
      });
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = streamUrl;
      videoEl.play().catch(() => {});
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [streamUrl]);

  // Ensure Active Playback on WebRTC Stream Arrival (§6)
  useEffect(() => {
    if (!hasWebRTCStream || !videoRef.current) return;
    const vid = videoRef.current;
    if (vid.paused) {
      vid.play().catch(() => {});
    }
  }, [hasWebRTCStream]);

  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3500);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('touchstart', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('touchstart', handleMouseMove);
      }
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const skipSeconds = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + seconds);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative rounded-2xl border border-[#22302B] bg-black aspect-video flex flex-col justify-between overflow-hidden shadow-2xl group selection:bg-[#E8A33D] selection:text-[#0F2A1E]"
    >
      {/* Video Viewport / Stream Feed Canvas */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#07130E]" onClick={togglePlay}>
        {/* Render video element if WebRTC stream or URL stream is active */}
        <video
          ref={videoRef}
          {...(streamUrl ? { src: streamUrl } : {})}
          autoPlay
          playsInline
          muted={isMuted}
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          className={`w-full h-full object-cover transition-opacity duration-200 ${streamUrl || hasWebRTCStream ? 'block' : 'hidden'}`}
        />

        {!streamUrl && !hasWebRTCStream && (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#0B1A13] relative overflow-hidden text-center space-y-3">
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, #1B4332 0, #1B4332 1px, transparent 0, transparent 50%)`,
                backgroundSize: '16px 16px',
              }}
            />
            <div className="w-16 h-16 rounded-full bg-[#132A1F] border border-[#E8A33D] flex items-center justify-center text-[#E8A33D] shadow-xl z-10 animate-pulse">
              <Tv size={32} />
            </div>
            <div className="z-10">
              <h3 className="font-display text-base sm:text-lg tracking-wide text-white uppercase font-bold">
                {title}
              </h3>
              <p className="text-xs font-mono text-[#8A9A91] mt-1 max-w-md">
                {subtitle || 'Waadi TV 1080p Ultra-Low Latency Live Broadcast Stream'}
              </p>
            </div>
            <div className="z-10 px-3 py-1 rounded-full bg-[#132A1F] border border-[#22302B] text-[11px] font-mono text-[#E8A33D] font-bold uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>CONNECTING LIVE 1080p STREAM...</span>
            </div>
          </div>
        )}

        {/* --- PRO BROADCAST SCOREBOARD OVERLAY BANNER --- */}
        {scoreboardState && (
          <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center bg-[#07130E]/95 border border-[#22302B] rounded-xl overflow-hidden shadow-2xl backdrop-blur-md font-display pointer-events-none text-xs sm:text-sm">
            <div className="bg-[#132A1F] px-2.5 py-1.5 border-r border-[#22302B] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[9px] sm:text-[10px] font-mono text-[#E8A33D] font-bold uppercase tracking-wider hidden sm:inline">
                {scoreboardState.tournamentName || 'WAADI TV'}
              </span>
            </div>
            <div className="px-3 py-1.5 flex items-center gap-2 text-white font-bold">
              <span>{scoreboardState.homeTeamShort || 'HOME'}</span>
              <span className="bg-[#0F2A1E] px-2 py-0.5 rounded text-[#E8A33D] font-mono font-bold">
                {scoreboardState.homeScore ?? 0} - {scoreboardState.awayScore ?? 0}
              </span>
              <span>{scoreboardState.awayTeamShort || 'AWAY'}</span>
            </div>
            <div className="bg-[#07130E] px-2.5 py-1.5 border-l border-[#22302B] text-[10px] sm:text-xs font-mono text-[#E8A33D] font-semibold">
              {scoreboardState.matchClock || '00:00 (1st Half)'}
            </div>
          </div>
        )}

        {/* --- ADVERTISEMENT OVERLAY SYSTEM --- */}

        {/* Fullscreen Ad Overlay */}
        {adState?.active && adState.currentAd && adState.adDisplayStyle === 'full_screen' && (
          <div className="absolute inset-0 z-30 bg-black/95 flex flex-col items-center justify-center p-4 animate-fade-in pointer-events-auto">
            {adState.currentAd.type === 'video' ? (
              <video
                src={adState.currentAd.url}
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-[80%] rounded-xl shadow-2xl object-contain border border-[#22302B]"
              />
            ) : (
              <img
                src={adState.currentAd.url}
                alt={adState.currentAd.title}
                className="max-w-full max-h-[80%] rounded-xl shadow-2xl object-contain border border-[#22302B]"
              />
            )}
            <div className="mt-3 text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-[#E8A33D] text-[#0F2A1E] font-mono text-[11px] font-bold uppercase tracking-wider shadow">
                OFFICIAL SPONSOR AD · {adState.currentAd.sponsorName || 'SPONSOR'}
              </span>
              <h4 className="font-display text-base text-white font-bold">{adState.currentAd.title}</h4>
            </div>
          </div>
        )}

        {/* Lower Third Ad Overlay */}
        {adState?.active && adState.currentAd && adState.adDisplayStyle === 'lower_third' && (
          <div className="absolute bottom-16 left-4 right-4 z-30 bg-[#07130E]/95 border-2 border-[#E8A33D] rounded-xl p-3 flex items-center justify-between shadow-2xl backdrop-blur-md animate-slide-up pointer-events-auto">
            <div className="flex items-center gap-3">
              {adState.currentAd.url ? (
                adState.currentAd.type === 'video' ? (
                  <video src={adState.currentAd.url} autoPlay loop muted playsInline className="w-14 h-14 object-cover rounded bg-black border border-[#22302B]" />
                ) : (
                  <img src={adState.currentAd.url} alt="Ad Logo" className="w-14 h-14 object-contain rounded bg-black/60 p-1 border border-[#22302B]" />
                )
              ) : (
                <div className="w-12 h-12 rounded bg-[#132A1F] border border-[#E8A33D] flex items-center justify-center text-[#E8A33D]">
                  <Award size={24} />
                </div>
              )}
              <div>
                <span className="text-[10px] font-mono text-[#E8A33D] font-bold uppercase tracking-widest block">
                  SPONSORED ADVERTISEMENT
                </span>
                <h4 className="font-display text-sm text-white font-bold">{adState.currentAd.title}</h4>
                <span className="text-xs font-mono text-[#8A9A91]">{adState.currentAd.sponsorName}</span>
              </div>
            </div>
            <span className="px-3 py-1 rounded bg-[#E8A33D] text-[#0F2A1E] font-mono text-[10px] font-bold uppercase tracking-wider shadow">
              SPONSOR
            </span>
          </div>
        )}

        {/* --- GOAL & GRAPHIC OVERLAY SYSTEM --- */}
        {overlayState?.showGoalOverlay && (
          <div
            className={`absolute z-30 ${
              overlayState.overlayPosition === 'top-left'
                ? 'top-14 left-4'
                : overlayState.overlayPosition === 'top-center'
                ? 'top-14 left-1/2 -translate-x-1/2'
                : overlayState.overlayPosition === 'top-right'
                ? 'top-14 right-4'
                : overlayState.overlayPosition === 'bottom-left'
                ? 'bottom-16 left-4'
                : overlayState.overlayPosition === 'bottom-right'
                ? 'bottom-16 right-4'
                : 'bottom-16 left-1/2 -translate-x-1/2'
            } animate-bounce pointer-events-none`}
          >
            <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#E8A33D] via-[#F2C878] to-[#E8A33D] text-[#0F2A1E] font-display text-lg sm:text-xl font-black uppercase tracking-widest shadow-2xl border-2 border-white flex items-center gap-2">
              <Sparkles size={24} />
              <span>{overlayState.overlayText || '⚽ GOAL!'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Top Banner Overlay */}
      <div className={`relative z-20 flex items-center justify-between p-3 sm:p-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center gap-2.5">
          <LiveBadge size="sm" />
          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider hidden sm:inline">
            WAADI SPORTS 1080p
          </span>
        </div>

        <div className="flex items-center gap-2">
          {sponsorName && (
            <span className="text-[10px] font-mono bg-[#0F2A1E]/90 text-[#E8A33D] border border-[#E8A33D]/40 px-2.5 py-0.5 rounded-full uppercase font-bold backdrop-blur-md">
              PRESENTED BY {sponsorName}
            </span>
          )}
          <span className="px-2.5 py-0.5 rounded-full bg-[#D62828] text-white text-[10px] font-mono font-bold uppercase tracking-wider">
            {quality.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Center Play/Pause Overlay Indicator on Hover/Tap */}
      <div
        className={`absolute inset-0 z-10 flex items-center justify-center pointer-events-none transition-opacity duration-200 ${
          showControls ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button
          onClick={togglePlay}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/60 text-[#E8A33D] border-2 border-[#E8A33D] flex items-center justify-center backdrop-blur-md shadow-2xl pointer-events-auto hover:scale-105 transition-transform cursor-pointer"
        >
          {isPlaying ? <Pause size={28} /> : <Play size={28} className="ml-1 fill-current" />}
        </button>
      </div>

      {/* Bottom Control Bar */}
      <div className={`relative z-20 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-3 sm:p-4 space-y-2 transition-opacity duration-300 ${
        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Progress Bar (Scrubber) */}
        <div className="w-full bg-[#132A1F] h-1.5 rounded-full overflow-hidden cursor-pointer relative group/timeline">
          <div
            className="bg-[#E8A33D] h-full transition-all"
            style={{ width: `${duration ? (currentTime / duration) * 100 : 100}%` }}
          />
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-2 pt-1 text-white">
          {/* Left Controls: Play, Seek -10s / +10s, Volume */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={togglePlay}
              className="p-1.5 rounded-lg text-[#E8A33D] hover:bg-white/10 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current" />}
            </button>

            {/* Skip Back 10s */}
            <button
              onClick={() => skipSeconds(-10)}
              className="p-1.5 rounded-lg text-[#8A9A91] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-0.5 text-[10px] font-mono cursor-pointer"
              title="Skip Back 10 Seconds"
            >
              <RotateCcw size={16} />
              <span>10s</span>
            </button>

            {/* Skip Forward 10s */}
            <button
              onClick={() => skipSeconds(10)}
              className="p-1.5 rounded-lg text-[#8A9A91] hover:text-white hover:bg-white/10 transition-colors flex items-center gap-0.5 text-[10px] font-mono cursor-pointer"
              title="Skip Forward 10 Seconds"
            >
              <RotateCw size={16} />
              <span>10s</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-1.5 group/vol">
              <button
                onClick={toggleMute}
                className="p-1.5 rounded-lg text-[#8A9A91] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? <VolumeX size={18} className="text-red-400" /> : <Volume2 size={18} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-14 sm:w-20 h-1 accent-[#E8A33D] bg-[#1F332A] rounded cursor-pointer hidden sm:block"
              />
            </div>
          </div>

          {/* Right Controls: Quality Selector, Fullscreen */}
          <div className="flex items-center gap-2 relative">
            {/* Quality Menu Button */}
            <div className="relative">
              <button
                onClick={() => setShowQualityMenu((prev) => !prev)}
                className={`px-2.5 py-1 rounded border text-xs font-mono font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showQualityMenu
                    ? 'bg-[#E8A33D] text-[#0F2A1E] border-[#E8A33D]'
                    : 'bg-[#0D1E16] text-[#E8A33D] border-[#22302B] hover:border-[#E8A33D]'
                }`}
              >
                <Settings size={13} />
                <span>{quality.toUpperCase()}</span>
              </button>

              {/* Quality Dropdown Menu */}
              {showQualityMenu && (
                <div className="absolute bottom-full right-0 mb-2 w-40 rounded-xl bg-[#0D2218] border border-[#22302B] p-1.5 shadow-2xl space-y-0.5 z-50 font-mono text-xs backdrop-blur-md">
                  <div className="px-2 py-1 text-[9px] text-[#8A9A91] uppercase font-bold border-b border-[#1F332A] mb-1">
                    STREAM QUALITY
                  </div>
                  {(['1080p', '720p', '480p', '360p', 'auto'] as const).map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setQuality(q);
                        setShowQualityMenu(false);
                      }}
                      className={`w-full px-2.5 py-1.5 rounded flex items-center justify-between text-left transition-colors cursor-pointer ${
                        quality === q
                          ? 'bg-[#1B4332] text-[#E8A33D] font-bold'
                          : 'text-[#F7F5F0] hover:bg-[#132A1F]'
                      }`}
                    >
                      <span>{q === 'auto' ? 'Auto (Adaptive)' : `${q} ${q === '1080p' ? 'Full HD' : q === '720p' ? 'HD' : ''}`}</span>
                      {quality === q && <Check size={13} className="text-[#E8A33D]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-[#8A9A91] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Fullscreen"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
