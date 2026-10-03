import { ImageResponse } from 'next/og';
import { projectsData } from '@/data/projects';

export const runtime = 'nodejs';
export const alt = 'Waadi Media Case Study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  const title = project?.name || 'Selected Project';
  const sector = project?.sector || 'Case Study';
  const summary = project?.summary || 'Built by Waadi Media in Kashmir.';

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
                fontSize: 28,
                fontWeight: 700,
                color: '#0057FF',
                letterSpacing: '-0.02em',
              }}
            >
              waadi
            </span>
            <span
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: '#000000',
              }}
            >
              media.com
            </span>
          </div>

          <div
            style={{
              padding: '6px 18px',
              backgroundColor: '#EAF1FF',
              color: '#0057FF',
              borderRadius: '9999px',
              fontSize: 14,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {sector} &bull; Case Study
          </div>
        </div>

        {/* Center Project Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', zIndex: 10, maxWidth: '1000px' }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 600,
              color: '#000000',
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 22, color: '#667085', fontWeight: 400, lineHeight: 1.4 }}>
            {summary}
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
            height="140"
            viewBox="0 0 1200 140"
            fill="none"
            style={{ position: 'absolute', bottom: 0, left: 0 }}
          >
            <path
              d="M0,140 L0,90 Q300,30 600,70 T1200,40 L1200,140 Z"
              fill="#E6EEFF"
            />
            <path
              d="M0,140 L0,105 Q350,55 700,95 T1200,75 L1200,140 Z"
              fill="#C9DAFF"
            />
            <path
              d="M0,140 L0,115 Q400,75 800,110 T1200,95 L1200,140 Z"
              fill="#9DBAFF"
            />
            <path
              d="M0,140 L0,128 Q450,100 900,122 T1200,115 L1200,140 Z"
              fill="#0057FF"
            />
          </svg>
        </div>
      </div>
    ),
    { ...size }
  );
}
