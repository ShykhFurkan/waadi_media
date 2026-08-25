import { supabase } from './supabase';

export interface FastPathStatus {
  mode: 'local' | 'relayed' | 'probing';
  latencyMs?: number;
  localCandidate?: string;
  error?: string;
}

const PROBE_TIMEOUT_MS = 2500; // 2.5 second fast-path timeout

/**
 * Host engine running on the Studio Broadcast Console.
 * Listens for incoming guest cameras probing for direct local LAN connection.
 */
export class LocalFastPathHost {
  private matchId: string;
  private peerConnections: Map<string, RTCPeerConnection> = new Map();
  private channel: any = null;
  private onTrackCallback: (sourceId: string, stream: MediaStream, latencyMs: number) => void;
  private onStatusCallback: (sourceId: string, status: FastPathStatus) => void;

  constructor(
    matchId: string,
    onTrack: (sourceId: string, stream: MediaStream, latencyMs: number) => void,
    onStatus: (sourceId: string, status: FastPathStatus) => void
  ) {
    this.matchId = matchId;
    this.onTrackCallback = onTrack;
    this.onStatusCallback = onStatus;
  }

  public init() {
    const channelName = `local_fastpath_host_${this.matchId}`;
    this.channel = supabase.channel(channelName);

    this.channel
      .on('broadcast', { event: 'probe_offer' }, async ({ payload }: any) => {
        if (!payload || !payload.sourceId || !payload.sdp) return;
        await this.handleOffer(payload.sourceId, payload.sdp, payload.candidates);
      })
      .on('broadcast', { event: 'probe_candidate' }, async ({ payload }: any) => {
        if (!payload || !payload.sourceId || !payload.candidate) return;
        const pc = this.peerConnections.get(payload.sourceId);
        if (pc && pc.remoteDescription) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
          } catch (e) {}
        }
      })
      .subscribe();
  }

  private async handleOffer(sourceId: string, sdp: string, remoteCandidates?: any[]) {
    this.onStatusCallback(sourceId, { mode: 'probing' });

    if (this.peerConnections.has(sourceId)) {
      this.peerConnections.get(sourceId)?.close();
    }

    // Configure RTCPeerConnection allowing local host candidates
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      iceTransportPolicy: 'all',
    });
    this.peerConnections.set(sourceId, pc);

    let isConnected = false;
    const startTime = Date.now();

    const timeoutTimer = setTimeout(() => {
      if (!isConnected) {
        // Local path probe timed out (client isolation or separate subnets)
        pc.close();
        this.peerConnections.delete(sourceId);
        this.onStatusCallback(sourceId, {
          mode: 'relayed',
          error: 'Local LAN probe timed out after 2.5s (likely AP client isolation). Falling back to SFU.',
        });
      }
    }, PROBE_TIMEOUT_MS);

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        const stream = event.streams[0];
        const rtt = Math.max(8, Date.now() - startTime);
        isConnected = true;
        clearTimeout(timeoutTimer);

        this.onStatusCallback(sourceId, { mode: 'local', latencyMs: rtt });
        this.onTrackCallback(sourceId, stream, rtt);
      }
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.channel.send({
          type: 'broadcast',
          event: 'host_candidate',
          payload: { sourceId, candidate: event.candidate.toJSON() },
        }).catch(() => {});
      }
    };

    pc.oniceconnectionstatechange = () => {
      if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
        if (!isConnected) {
          clearTimeout(timeoutTimer);
          pc.close();
          this.peerConnections.delete(sourceId);
          this.onStatusCallback(sourceId, {
            mode: 'relayed',
            error: 'Local LAN connection failed. Using LiveKit SFU.',
          });
        }
      }
    };

    try {
      await pc.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp }));
      if (remoteCandidates) {
        for (const cand of remoteCandidates) {
          try {
            await pc.addIceCandidate(new RTCIceCandidate(cand));
          } catch (e) {}
        }
      }
      const answer = await pc.createAnswer();
      if ((pc.signalingState as string) === 'have-remote-offer') {
        try {
          await pc.setLocalDescription(answer);
        } catch (err) {
          console.warn('[LocalFastPath] Ignored setLocalDescription in wrong state:', err);
        }
      }

      this.channel.send({
        type: 'broadcast',
        event: 'probe_answer',
        payload: { sourceId, sdp: answer.sdp },
      }).catch(() => {});
    } catch (e: any) {
      clearTimeout(timeoutTimer);
      this.onStatusCallback(sourceId, { mode: 'relayed', error: e.message });
    }
  }

  public destroy() {
    this.peerConnections.forEach((pc) => pc.close());
    this.peerConnections.clear();
    if (this.channel) {
      supabase.removeChannel(this.channel);
    }
  }
}

/**
 * Client engine running on the Mobile Guest Camera page.
 * Probes for a local LAN peer connection with studio before LiveKit SFU connection completes.
 */
export class LocalFastPathClient {
  private matchId: string;
  private sourceId: string;
  private pc: RTCPeerConnection | null = null;
  private channel: any = null;
  private statusCallback: (status: FastPathStatus) => void;

  constructor(
    matchId: string,
    sourceId: string,
    onStatus: (status: FastPathStatus) => void
  ) {
    this.matchId = matchId;
    this.sourceId = sourceId;
    this.statusCallback = onStatus;
  }

  public async startProbe(stream: MediaStream): Promise<FastPathStatus> {
    return new Promise((resolve) => {
      this.statusCallback({ mode: 'probing' });

      const channelName = `local_fastpath_host_${this.matchId}`;
      this.channel = supabase.channel(channelName);

      const candidates: any[] = [];
      const pc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });
      this.pc = pc;

      stream.getTracks().forEach((t) => pc.addTrack(t, stream));

      let resolved = false;
      const startTime = Date.now();

      const finish = (status: FastPathStatus) => {
        if (resolved) return;
        resolved = true;
        clearTimeout(timer);
        this.statusCallback(status);
        resolve(status);
      };

      const timer = setTimeout(() => {
        finish({
          mode: 'relayed',
          error: 'Local probe timed out (2.5s). Defaulting to LiveKit SFU route.',
        });
      }, PROBE_TIMEOUT_MS);

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          const cand = event.candidate.toJSON();
          candidates.push(cand);
          if (this.channel) {
            this.channel.send({
              type: 'broadcast',
              event: 'probe_candidate',
              payload: { sourceId: this.sourceId, candidate: cand },
            }).catch(() => {});
          }
        }
      };

      pc.oniceconnectionstatechange = () => {
        if (pc.iceConnectionState === 'connected' || pc.iceConnectionState === 'completed') {
          const rtt = Math.max(10, Date.now() - startTime);
          finish({ mode: 'local', latencyMs: rtt });
        } else if (pc.iceConnectionState === 'failed') {
          finish({ mode: 'relayed', error: 'Local network ICE failed.' });
        }
      };

      this.channel
        .on('broadcast', { event: 'probe_answer' }, async ({ payload }: any) => {
          if (!payload || payload.sourceId !== this.sourceId || !payload.sdp) return;
          try {
            await pc.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: payload.sdp }));
          } catch (e) {}
        })
        .on('broadcast', { event: 'host_candidate' }, async ({ payload }: any) => {
          if (!payload || payload.sourceId !== this.sourceId || !payload.candidate) return;
          try {
            await pc.addIceCandidate(new RTCIceCandidate(payload.candidate));
          } catch (e) {}
        })
        .subscribe(async (status: string) => {
          if (status === 'SUBSCRIBED') {
            try {
              const offer = await pc.createOffer();
              if ((pc.signalingState as string) === 'stable' || (pc.signalingState as string) === 'have-local-offer') {
                await pc.setLocalDescription(offer);
              }

              // Send offer with gathered host candidates
              this.channel.send({
                type: 'broadcast',
                event: 'probe_offer',
                payload: {
                  sourceId: this.sourceId,
                  sdp: offer.sdp,
                  candidates,
                },
              }).catch(() => {});
            } catch (e: any) {
              finish({ mode: 'relayed', error: e.message });
            }
          }
        });
    });
  }

  public destroy() {
    if (this.pc) {
      this.pc.close();
      this.pc = null;
    }
    if (this.channel) {
      supabase.removeChannel(this.channel);
    }
  }
}
