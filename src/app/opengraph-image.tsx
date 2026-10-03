import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Waadi Media - Web Design and Digital Agency in Kashmir';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#F5F8FC',
          padding: '60px 70px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#0057FF',
                letterSpacing: '-0.02em',
              }}
            >
              waadi
            </span>
            <span
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: '#000000',
              }}
            >
              media.com
            </span>
          </div>

          <div
            style={{
              padding: '8px 20px',
              backgroundColor: '#EAF1FF',
              color: '#0057FF',
              borderRadius: '9999px',
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: '0.04em',
            }}
          >
            Digital Agency &bull; Kashmir
          </div>
        </div>

        {/* Center Tagline / Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10, maxWidth: '1000px' }}>
          <div
            style={{
              fontSize: 58,
              fontWeight: 600,
              color: '#000000',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            Built in the valley. Made for your business.
          </div>
          <div style={{ fontSize: 24, color: '#667085', fontWeight: 400 }}>
            Websites, SEO, branding, ads and software for Kashmir&apos;s businesses.
          </div>
        </div>

        {/* Bottom Decorative Ridgeline SVG Representation */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '140px',
            opacity: 0.9,
          }}
        >
          <svg
            width="1200"
            height="150"
            viewBox="0 0 1440 400"
            fill="none"
            style={{ position: 'absolute', bottom: 0, left: 0, width: '1200px', height: '150px' }}
          >
            <path
              d="M0,230 L0,150 Q180,90 320,135 T680,105 Q860,60 1040,115 T1440,130 L1440,400 L0,400 Z"
              fill="#E6EEFF"
            />
            <path
              d="M0,250 L0,180 Q140,130 360,175 T760,140 Q940,120 1160,165 T1440,170 L1440,400 L0,400 Z"
              fill="#C9DAFF"
            />
            <path
              d="M0,280 L0,210 Q240,170 480,225 T920,195 Q1120,185 1320,220 T1440,215 L1440,400 L0,400 Z"
              fill="#9DBAFF"
            />
            <path
              d="M0,310 L0,250 Q160,225 420,265 T880,240 Q1100,230 1340,265 T1440,260 L1440,400 L0,400 Z"
              fill="#5C8DFF"
            />
            <path
              d="M0,340 L0,290 Q220,270 520,305 T1020,285 Q1220,280 1440,300 L1440,400 L0,400 Z"
              fill="#0057FF"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
