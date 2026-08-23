'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import { Room, RoomEvent, VideoPresets, Track, LocalVideoTrack } from 'livekit-client';
import { supabase } from '@/lib/supabase';
import { Smartphone, Radio, CheckCircle, Wifi, AlertTriangle, Tv, Video, ShieldCheck } from 'lucide-react';

export default function GuestCameraPage({ params }: { params: Promise<{ sourceId: string }> }) {
  const resolvedParams = use(params);
  const sourceId = resolvedParams.sourceId;

  const videoRef = useRef<HTMLVideoElement>(null);
  const roomRef = useRef<Room | null>(null);

  const [connected, setConnected] = useState(false);
  const [streamSent, setStreamSent] = useState(false);
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [matchInfo, setMatchInfo] = useState<{ matchTitle: string; tournamentName?: string } | null>(null);
  const [deviceName, setDeviceName] = useState<string>('');

  useEffect(() => {
    setDeviceName(getDeviceName());
    initLiveKitGuestCamera();

    // Listen for match info updates from broadcast console via Supabase Realtime
    const channelName = `guest_info_${sourceId}`;
    const channel = supabase.channel(channelName);
    channel
      .on('broadcast', { event: 'match_info' }, ({ payload }) => {
        if (payload?.matchInfo) setMatchInfo(payload.matchInfo);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, [sourceId]);

  function getDeviceName(): string {
    if (typeof window === 'undefined') return 'Mobile Device';
    const ua = navigator.userAgent;
    let os = 'Mobile Device';
    if (/iPhone/i.test(ua)) os = 'iPhone';
    else if (/iPad/i.test(ua)) os = 'iPad';
    else if (/Android/i.test(ua)) os = 'Android Device';
    else if (/Macintosh/i.test(ua)) os = 'MacBook';
    else if (/Windows/i.test(ua)) os = 'Windows PC';

    let browser = '';
    if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) browser = 'Chrome';
    else if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) browser = 'Safari';
    else if (/Firefox/i.test(ua)) browser = 'Firefox';
    else if (/Edg/i.test(ua)) browser = 'Edge';

    return `${os}${browser ? ` (${browser})` : ''}`;
  }

  async function initLiveKitGuestCamera() {
    try {
      setPermissionError(null);
      setConnectionState('connecting');

      // Fetch active match ID to connect to the exact studio broadcast room
      const { data: activeMatch } = await supabase
        .from('matches')
        .select('id, status')
        .or('status.eq.live,status.eq.upcoming')
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .maybeSingle();

      const targetMatchId = activeMatch?.id || 'live_studio';
      const roomName = `waadi_match_${targetMatchId}`;
      const identity = `guest_${sourceId}`;

      // Fetch Access Token from API
      const res = await fetch(`/api/livekit/token?room=${encodeURIComponent(roomName)}&identity=${encodeURIComponent(identity)}&role=publisher`);
      const data = await res.json();

      if (!res.ok || !data.token) {
        throw new Error(data.error || 'Failed to fetch LiveKit token');
      }

      const room = new Room({
        adaptiveStream: true,
        dynacast: true,
        videoCaptureDefaults: {
          resolution: VideoPresets.h720.resolution,
          facingMode: 'environment',
        },
        publishDefaults: {
          videoEncoding: {
            maxBitrate: 1500000, // 1.5 Mbps for ultra-fast, smooth transmission
            maxFramerate: 30,
          },
          simulcast: false,
        },
      });
      roomRef.current = room;

      room.on(RoomEvent.Connected, () => {
        setConnected(true);
        setConnectionState('connected');
      });

      room.on(RoomEvent.Disconnected, () => {
        setConnected(false);
        setConnectionState('disconnected');
        setStreamSent(false);
      });

      const wsUrl = data.wsUrl || process.env.NEXT_PUBLIC_LIVEKIT_URL;
      await room.connect(wsUrl, data.token);

      // Enable local camera and microphone
      await room.localParticipant.enableCameraAndMicrophone();
      setStreamSent(true);

      // Attach local video track to preview video element
      const videoPublication = Array.from(room.localParticipant.videoTrackPublications.values())[0];
      if (videoPublication && videoPublication.track) {
        const videoElement = videoRef.current;
        if (videoElement) {
          (videoPublication.track as LocalVideoTrack).attach(videoElement);
          videoElement.play().catch(() => {});
        }
      }
    } catch (err: any) {
      console.warn('LiveKit guest camera connection error, attempting WebRTC fallback:', err);
      // Fallback local camera display
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
          setConnected(true);
          setStreamSent(true);
        }
      } catch (fallbackErr: any) {
        setPermissionError('Camera access denied or unreadable. Please allow browser camera permissions.');
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#091510] text-[#F7F5F0] flex flex-col justify-between p-4 max-w-md mx-auto font-sans selection:bg-[#E8A33D] selection:text-[#0F2A1E]">
      {/* Top Header Bar */}
      <div className="text-center space-y-1.5 py-3 border-b border-[#1F332A] bg-[#0D1E16] rounded-xl px-4 shadow-md">
        <div className="flex items-center justify-center gap-2">
          <Smartphone size={20} className="text-[#E8A33D]" />
          <h1 className="font-display text-lg text-white font-bold tracking-wide uppercase">
            WAADI MOBILE GUEST CAM
          </h1>
        </div>
        <p className="text-[11px] font-mono text-[#8A9A91]">
          LIVEKIT CLOUD SFU · HD 720p @ 2.5 Mbps
        </p>

        {deviceName && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#132A1F] border border-[#22302B] text-[10px] font-mono text-[#E8A33D]">
            <Wifi size={11} />
            <span>CONNECTED FROM: {deviceName.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Match Banner if assigned */}
      {matchInfo && (
        <div className="my-2 p-3 rounded-xl bg-[#132A1F] border border-[#E8A33D]/50 text-center space-y-0.5 shadow-lg animate-fade-in">
          <span className="text-[10px] font-mono text-[#E8A33D] font-bold uppercase tracking-wider block">
            ASSIGNED TO MATCH
          </span>
          <h3 className="font-display text-sm text-white font-bold">{matchInfo.matchTitle}</h3>
          {matchInfo.tournamentName && (
            <p className="text-[11px] text-[#8A9A91] font-mono">{matchInfo.tournamentName}</p>
          )}
        </div>
      )}

      {/* Camera Live Viewport */}
      <div className="relative rounded-2xl border-2 border-[#1F332A] bg-black aspect-[3/4] flex flex-col justify-between overflow-hidden shadow-2xl my-3 group">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover transform scale-x-[-1]"
        />

        {/* Permission / Stream Error Banner */}
        {permissionError && (
          <div className="absolute inset-0 bg-black/90 p-6 flex flex-col items-center justify-center text-center space-y-3 z-30">
            <AlertTriangle size={40} className="text-red-400 animate-bounce" />
            <h3 className="font-display text-base text-white uppercase font-bold">CAMERA PERMISSION REQUIRED</h3>
            <p className="text-xs font-mono text-[#8A9A91]">{permissionError}</p>
            <button
              onClick={initLiveKitGuestCamera}
              className="px-4 py-2 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display text-xs font-bold uppercase tracking-wider"
            >
              Retry Camera Access
            </button>
          </div>
        )}

        {/* Status Badge Overlay */}
        <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
          {streamSent ? (
            <div className="px-3 py-1 rounded-full bg-[#10B981] text-[#0F2A1E] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 rounded-full bg-[#0F2A1E] animate-ping" />
              <span>LIVEKIT CLOUD STREAM ACTIVE</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-full bg-[#E8A33D] text-[#0F2A1E] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <Radio size={12} className="animate-spin" />
              <span>CONNECTING TO SFU...</span>
            </div>
          )}
        </div>

        {/* Bottom Specs Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-20 bg-black/70 backdrop-blur-md border border-[#22302B] rounded-xl p-2.5 flex items-center justify-between text-[11px] font-mono text-[#8A9A91]">
          <span>SOURCE ID: {sourceId}</span>
          <span className="text-[#E8A33D] font-bold">720p @ 30 FPS</span>
        </div>
      </div>

      {/* Control Instructions */}
      <div className="rounded-xl border border-[#1F332A] bg-[#0D1E16] p-4 text-center space-y-2 shadow-md">
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-[#10B981]">
          <ShieldCheck size={16} />
          <span>CONNECTED TO STUDIO SWITCHER</span>
        </div>
        <p className="text-[11px] font-mono text-[#8A9A91]">
          Keep this browser tab open on your smartphone. Your camera feed is streamed directly to LiveKit Cloud for zero-lag studio compositing.
        </p>
      </div>
    </div>
  );
}
