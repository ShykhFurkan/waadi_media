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
  Sparkles
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { LiveBadge } from './LiveBadge';

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

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // WebRTC Stream Receiver for Viewers from Studio Console (live_stream_${matchId})
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
      if (!data || data.viewerId !== viewerId) return;

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
          src={streamUrl}
          autoPlay
          playsInline
          muted={isMuted}
          onTimeUpdate={() => {
            if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
          }}
          onLoadedMetadata={() => {
            if (videoRef.current) setDuration(videoRef.current.duration);
          }}
          className={`w-full h-full object-cover ${streamUrl || hasWebRTCStream ? 'block' : 'hidden'}`}
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
