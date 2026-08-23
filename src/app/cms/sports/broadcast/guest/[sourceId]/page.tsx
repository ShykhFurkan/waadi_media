'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import { supabase } from '@/lib/supabase';
import { Smartphone, Radio, CheckCircle, Wifi, AlertTriangle, Tv } from 'lucide-react';

export default function GuestCameraPage({ params }: { params: Promise<{ sourceId: string }> }) {
  const resolvedParams = use(params);
  const sourceId = resolvedParams.sourceId;

  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [connected, setConnected] = useState(false);
  const [streamSent, setStreamSent] = useState(false);
  const [connectionState, setConnectionState] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [matchInfo, setMatchInfo] = useState<{ matchTitle: string; tournamentName?: string } | null>(null);
  const [deviceName, setDeviceName] = useState<string>('');

  useEffect(() => {
    setDeviceName(getDeviceName());
    startCamera();
    return () => {
      pcRef.current?.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
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

  async function startCamera() {
    try {
      setPermissionError(null);
      // Request 1080p Full HD camera stream
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 },
        },
        audio: true,
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
        setConnected(true);
      }

      setupWebRTC(stream);
    } catch (err: any) {
      console.error('1080p Camera access error, falling back:', err);
      try {
        const fallbackStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        streamRef.current = fallbackStream;
        if (videoRef.current) {
          videoRef.current.srcObject = fallbackStream;
          videoRef.current.play().catch(() => {});
          setConnected(true);
        }
        setupWebRTC(fallbackStream);
      } catch (fallbackErr: any) {
        setPermissionError('Camera access denied or unreadable. Please allow browser camera permissions.');
      }
    }
  }

  function setupWebRTC(stream: MediaStream) {
    const channelName = `guest_cam_${sourceId}`;
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
    pcRef.current = pc;

    let pendingCandidates: RTCIceCandidateInit[] = [];

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'connected') {
        setConnected(true);
        setConnectionState('connected');
      } else if (pc.connectionState === 'connecting') {
        setConnectionState('connecting');
      } else if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed' || pc.connectionState === 'closed') {
        setConnectionState('disconnected');
      }
    };

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    const currentDevice = getDeviceName();

    const sendSignal = (payload: any) => {
      const fullPayload = { ...payload, deviceInfo: currentDevice, sourceId };
      channel.send({ type: 'broadcast', event: 'webrtc', payload: fullPayload }).catch(() => {});
      bc?.postMessage(fullPayload);
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        sendSignal({ type: 'candidate', candidate: event.candidate });
      }
    };

    const createAndSendOffer = async () => {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        sendSignal({ type: 'offer', offer });
        setStreamSent(true);
      } catch (err) {
        console.error('Error creating WebRTC offer:', err);
      }
    };

    const handleSignal = async (data: any) => {
      if (!data) return;

      if (data.matchInfo) {
        setMatchInfo(data.matchInfo);
      }

      if (data.type === 'answer' && data.answer) {
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(data.answer));
          setStreamSent(true);
          setConnectionState('connected');
          for (const cand of pendingCandidates) {
            await pc.addIceCandidate(new RTCIceCandidate(cand));
          }
          pendingCandidates = [];
        } catch (e) {
          console.error('Error setting remote description from answer:', e);
        }
      } else if (data.type === 'candidate' && data.candidate) {
        try {
          if (pc.remoteDescription) {
            await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
          } else {
            pendingCandidates.push(data.candidate);
          }
        } catch (e) {}
      } else if (data.type === 'request_offer') {
        await createAndSendOffer();
      } else if (data.type === 'match_info' && data.matchInfo) {
        setMatchInfo(data.matchInfo);
      }
    };

    channel
      .on('broadcast', { event: 'webrtc' }, ({ payload }) => handleSignal(payload))
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          sendSignal({ type: 'guest_ready', sourceId });
          createAndSendOffer();
        }
      });

    if (bc) {
      bc.onmessage = (e) => handleSignal(e.data);
    }

    // Periodic Heartbeat while disconnected to ensure late console connections lock in immediately
    const heartbeatInterval = setInterval(() => {
      if (pc.connectionState !== 'connected') {
        sendSignal({ type: 'guest_ready', sourceId });
      }
    }, 3000);

    return () => clearInterval(heartbeatInterval);
  }

  return (
    <div className="min-h-screen bg-[#091510] text-[#F7F5F0] flex flex-col justify-between p-4 max-w-md mx-auto font-sans selection:bg-[#E8A33D] selection:text-[#0F2A1E]">
      {/* Top Header Bar */}
      <div className="text-center space-y-1.5 py-3 border-b border-[#1F332A] bg-[#0D1E16] rounded-xl px-4 shadow-md">
        <div className="font-display text-sm text-[#E8A33D] font-bold tracking-wider uppercase flex items-center justify-center gap-2">
          <Radio size={16} className="animate-pulse" />
          <span>WAADI TV GUEST CAMERA (1080p HD)</span>
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#8A9A91] pt-1">
          <span>Source ID: <strong className="text-white">{sourceId}</strong></span>
          <span className="px-2 py-0.5 rounded bg-[#132A1F] border border-[#22302B] text-[#E8A33D] font-bold">
            {deviceName || 'Mobile Camera'}
          </span>
        </div>
      </div>

      {/* Live Match Connection Banner */}
      <div className="my-3 p-3 bg-[#0D2218] border border-[#22302B] rounded-xl shadow-lg space-y-1">
        <div className="text-[10px] font-mono text-[#8A9A91] uppercase flex items-center justify-between">
          <span>CONNECTED MATCH</span>
          <span className="text-[#E8A33D] font-bold">LIVE BROADCAST</span>
        </div>
        <div className="font-display text-sm font-bold text-white uppercase truncate flex items-center gap-2">
          <Tv size={15} className="text-[#E8A33D] shrink-0" />
          <span>{matchInfo ? matchInfo.matchTitle : 'Connecting to Match Console...'}</span>
        </div>
        {matchInfo?.tournamentName && (
          <div className="text-[11px] font-mono text-[#8A9A91] truncate">
            {matchInfo.tournamentName}
          </div>
        )}
      </div>

      {/* Video Viewport */}
      <div className="relative rounded-xl border-2 border-[#22302B] bg-black aspect-3/4 overflow-hidden shadow-2xl flex items-center justify-center my-1">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {!connected && !permissionError && (
          <div className="absolute inset-0 bg-[#0F2A1E]/90 backdrop-blur-xs flex items-center justify-center p-6 text-center space-y-3">
            <button
              onClick={startCamera}
              className="px-6 py-3 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display text-sm font-bold shadow-lg hover:bg-[#F2C878] transition-all cursor-pointer"
            >
              📹 Tap to Allow 1080p Camera Permission
            </button>
          </div>
        )}

        {permissionError && (
          <div className="absolute inset-0 bg-red-950/95 p-6 text-center text-xs font-mono text-white flex flex-col justify-center gap-3">
            <div className="flex items-center justify-center gap-2 text-red-400 font-bold">
              <AlertTriangle size={20} />
              <span>{permissionError}</span>
            </div>
            <button
              onClick={startCamera}
              className="px-4 py-2.5 rounded bg-white text-black font-bold uppercase text-[11px] shadow-md cursor-pointer"
            >
              Retry Camera Connection
            </button>
          </div>
        )}

        {connected && (
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className={`px-3 py-1 rounded-full text-white font-mono text-xs font-bold flex items-center gap-1.5 shadow-md ${
              connectionState === 'connected' ? 'bg-[#D62828] animate-pulse' : 'bg-amber-600'
            }`}>
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>
                {connectionState === 'connected'
                  ? 'LIVE TO CONSOLE (1080p)'
                  : connectionState === 'connecting'
                  ? 'CONNECTING...'
                  : 'READY (WAITING CONSOLE)'}
              </span>
            </div>
            <span className="bg-black/70 text-[#E8A33D] text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-[#22302B]">
              FHD 1080p
            </span>
          </div>
        )}
      </div>

      {/* Detailed Connection Status Footer */}
      <div className="text-center space-y-2 py-3 bg-[#0D2218] rounded-xl border border-[#22302B] p-4 shadow-md mt-2">
        <div className="flex items-center justify-center gap-2">
          {connectionState === 'connected' ? (
            <CheckCircle size={16} className="text-[#10B981]" />
          ) : (
            <Wifi size={16} className="text-[#E8A33D] animate-pulse" />
          )}
          <span className="font-display text-xs text-[#F7F5F0] font-bold uppercase">
            {connectionState === 'connected'
              ? 'CONNECTED TO BROADCAST CONSOLE'
              : connectionState === 'connecting'
              ? 'ESTABLISHING WEBRTC HANDSHAKE...'
              : 'WAITING FOR CONSOLE HANDSHAKE'}
          </span>
        </div>
        <p className="text-[11px] text-[#8A9A91] font-mono">
          {connectionState === 'connected'
            ? 'Your 1080p camera stream is live on the Waadi TV Studio Console. Keep phone steady.'
            : 'Keep this browser tab open on your phone while the studio console attaches.'}
        </p>
      </div>
    </div>
  );
}
