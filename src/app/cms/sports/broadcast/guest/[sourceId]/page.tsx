'use client';

import React, { useEffect, useRef, useState, use } from 'react';
import { supabase } from '@/lib/supabase';

export default function GuestCameraPage({ params }: { params: Promise<{ sourceId: string }> }) {
  const resolvedParams = use(params);
  const sourceId = resolvedParams.sourceId;

  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [connected, setConnected] = useState(false);
  const [streamSent, setStreamSent] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      pcRef.current?.close();
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [sourceId]);

  async function startCamera() {
    try {
      setPermissionError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
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
      console.error('Camera access error:', err);
      setPermissionError('Camera access denied or unreadable. Please allow browser camera permissions.');
    }
  }

  function setupWebRTC(stream: MediaStream) {
    const channelName = `guest_cam_${sourceId}`;
    const channel = supabase.channel(channelName);
    const bc = typeof window !== 'undefined' && 'BroadcastChannel' in window ? new BroadcastChannel(channelName) : null;

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ],
    });
    pcRef.current = pc;

    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        const payload = { type: 'candidate', candidate: event.candidate };
        channel.send({ type: 'broadcast', event: 'webrtc', payload });
        bc?.postMessage(payload);
      }
    };

    const handleSignal = async (data: any) => {
      if (!data) return;
      if (data.type === 'offer' && data.offer) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        const payload = { type: 'answer', answer };
        channel.send({ type: 'broadcast', event: 'webrtc', payload });
        bc?.postMessage(payload);
        setStreamSent(true);
      } else if (data.type === 'candidate' && data.candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (e) {}
      } else if (data.type === 'request_offer') {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);

        const payload = { type: 'offer', offer };
        channel.send({ type: 'broadcast', event: 'webrtc', payload });
        bc?.postMessage(payload);
        setStreamSent(true);
      }
    };

    channel.on('broadcast', { event: 'webrtc' }, ({ payload }) => handleSignal(payload)).subscribe();

    if (bc) {
      bc.onmessage = (e) => handleSignal(e.data);
    }

    // Announce guest presence
    setTimeout(() => {
      const payload = { type: 'guest_ready', sourceId };
      channel.send({ type: 'broadcast', event: 'webrtc', payload });
      bc?.postMessage(payload);
    }, 500);
  }

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0] flex flex-col justify-between p-4 max-w-md mx-auto font-sans">
      {/* Top Bar */}
      <div className="text-center space-y-1 py-2 border-b border-[#22302B]">
        <div className="font-display text-lg text-[#E8A33D] font-bold tracking-wide">WAADI TV GUEST CAMERA</div>
        <div className="text-xs font-mono text-[#8A9A91]">Source ID: {sourceId}</div>
      </div>

      {/* Video Viewport */}
      <div className="relative rounded-xl border-2 border-[#22302B] bg-black aspect-3/4 overflow-hidden shadow-2xl flex items-center justify-center my-4">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {!connected && !permissionError && (
          <div className="absolute inset-0 bg-[#0F2A1E]/90 backdrop-blur-xs flex items-center justify-center p-6 text-center space-y-3">
            <button
              onClick={startCamera}
              className="px-6 py-3 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display text-sm font-bold shadow-lg hover:bg-[#F2C878] transition-all"
            >
              📹 Tap to Allow Camera Permission
            </button>
          </div>
        )}

        {permissionError && (
          <div className="absolute inset-0 bg-red-950/95 p-6 text-center text-xs font-mono text-white flex flex-col justify-center gap-3">
            <div>⚠️ {permissionError}</div>
            <button
              onClick={startCamera}
              className="px-4 py-2.5 rounded bg-white text-black font-bold uppercase text-[11px] shadow-md"
            >
              Retry Camera Connection
            </button>
          </div>
        )}

        {connected && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D62828] text-white font-mono text-xs font-bold flex items-center gap-2 animate-pulse shadow-md">
            <span className="w-2 h-2 rounded-full bg-white" />
            CAMERA FEED LIVE {streamSent ? '(STREAMING TO CONSOLE)' : '(READY)'}
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div className="text-center space-y-2 py-4 bg-[#1B4332] rounded-xl border border-[#22302B] p-4 shadow-md">
        <div className="font-display text-sm text-[#F7F5F0] font-bold">
          {connected ? "✅ You're Connected — Stay on this page" : 'Connecting camera feed...'}
        </div>
        <p className="text-xs text-[#8A9A91]">
          Your mobile camera is streaming live to the Waadi TV Broadcast Console. Keep your phone steady.
        </p>
      </div>
    </div>
  );
}
