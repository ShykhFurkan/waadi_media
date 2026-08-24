import { VideoPresets } from 'livekit-client';

export const PUBLISHER_VIDEO_CONFIG = {
  resolution: { width: 1280, height: 720 },
  frameRate: 30,
  maxBitrate: 2_000_000, // 2 Mbps target max bitrate
  simulcast: false, // Explicitly disabled: single receiver (switcher), no fan-out re-encode
} as const;

export const VENUE_REGION_MAP: Record<string, { regionCode: string; regionName: string }> = {
  dubai: { regionCode: 'me-central-1', regionName: 'Middle East (Dubai)' },
  riyadh: { regionCode: 'me-central-1', regionName: 'Middle East (Riyadh)' },
  abu_dhabi: { regionCode: 'me-central-1', regionName: 'Middle East (Abu Dhabi)' },
  london: { regionCode: 'eu-west-1', regionName: 'Europe (London)' },
  frankfurt: { regionCode: 'eu-central-1', regionName: 'Europe (Frankfurt)' },
  new_york: { regionCode: 'us-east-1', regionName: 'US East (N. Virginia)' },
  san_francisco: { regionCode: 'us-west-1', regionName: 'US West (N. California)' },
  mumbai: { regionCode: 'ap-south-1', regionName: 'Asia Pacific (Mumbai)' },
  singapore: { regionCode: 'ap-southeast-1', regionName: 'Asia Pacific (Singapore)' },
  tokyo: { regionCode: 'ap-northeast-1', regionName: 'Asia Pacific (Tokyo)' },
};

/**
 * Derives the optimal LiveKit edge region code based on match venue string.
 */
export function getLiveKitRegionForVenue(venue?: string): { regionCode: string; regionName: string } {
  if (!venue) {
    return { regionCode: 'auto', regionName: 'Closest Edge (Auto-Detect)' };
  }
  const cleanVenue = venue.toLowerCase();
  for (const [key, val] of Object.entries(VENUE_REGION_MAP)) {
    if (cleanVenue.includes(key) || key.includes(cleanVenue)) {
      return val;
    }
  }
  return { regionCode: 'auto', regionName: 'Closest Edge (Auto-Detect)' };
}

/**
 * Returns region-aware LiveKit WebSocket connection URL based on venue location.
 */
export function getLiveKitRegionWsUrl(baseUrl: string, venue?: string): string {
  const { regionCode } = getLiveKitRegionForVenue(venue);
  if (!baseUrl) return '';
  if (regionCode === 'auto') return baseUrl;
  
  try {
    const urlObj = new URL(baseUrl);
    urlObj.searchParams.set('region', regionCode);
    return urlObj.toString();
  } catch (e) {
    return baseUrl;
  }
}
