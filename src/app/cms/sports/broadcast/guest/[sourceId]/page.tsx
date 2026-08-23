'use client';

import React, { useEffect, useRef, useState, use } from 'react';

export default function GuestCameraPage({ params }: { params: Promise<{ sourceId: string }> }) {
  const resolvedParams = use(params);
  const sourceId = resolvedParams.sourceId;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [connected, setConnected] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
  }, []);

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' },
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setConnected(true);
      }
    } catch (err: any) {
      setPermissionError('Camera access denied or unreadable. Please allow browser camera permissions.');
    }
  }

  return (
    <div className="min-h-screen bg-[#0F2A1E] text-[#F7F5F0] flex flex-col justify-between p-4 max-w-md mx-auto">
      {/* Top Bar */}
      <div className="text-center space-y-1 py-2 border-b border-[#22302B]">
        <div className="font-display text-lg text-[#E8A33D]">WAADI TV GUEST CAMERA</div>
        <div className="text-xs font-mono text-[#8A9A91]">Source ID: {sourceId}</div>
      </div>

      {/* Video Viewport */}
      <div className="relative rounded-xl border-2 border-[#22302B] bg-black aspect-3/4 overflow-hidden shadow-2xl flex items-center justify-center my-4">
        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />

        {!connected && !permissionError && (
          <div className="absolute inset-0 bg-[#0F2A1E]/80 backdrop-blur-xs flex items-center justify-center p-6 text-center space-y-3">
            <button
              onClick={startCamera}
              className="px-6 py-3 rounded-lg bg-[#E8A33D] text-[#0F2A1E] font-display text-sm"
            >
              📹 Tap to Allow Camera Permission
            </button>
          </div>
        )}

        {permissionError && (
          <div className="absolute inset-0 bg-red-950/90 p-6 text-center text-xs font-mono text-white flex flex-col justify-center gap-3">
            <div>⚠️ {permissionError}</div>
            <button
              onClick={startCamera}
              className="px-4 py-2 rounded bg-white text-black font-bold uppercase text-[11px]"
            >
              Retry Camera Connection
            </button>
          </div>
        )}

        {connected && (
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#D62828] text-white font-display text-xs flex items-center gap-2 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white" />
            CAMERA FEED LIVE
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div className="text-center space-y-2 py-4 bg-[#1B4332] rounded-xl border border-[#22302B] p-4">
        <div className="font-display text-sm text-[#F7F5F0]">
          {connected ? "✅ You're Connected — Stay on this page" : 'Connecting feed...'}
        </div>
        <p className="text-xs text-[#8A9A91]">
          Your video is live-streamed directly to the broadcast director's switcher console. Keep your phone steady.
        </p>
      </div>
    </div>
  );
}
