'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ValleySceneProps {
  variant?: 'hero' | 'footer' | 'mini';
  className?: string;
}

function subscribeReducedMotion(callback: () => void) {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

export function ValleyScene({ variant = 'hero', className }: ValleySceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Parallax scroll tracking
  useEffect(() => {
    if (reducedMotion || variant !== 'hero') return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const top = rect.top;
            const height = rect.height || 500;
            const progress = Math.min(Math.max(-top / height, 0), 1);
            setScrollYProgress(progress);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [reducedMotion, variant]);

  // Pointer depth on desktop (max 10px per brief)
  useEffect(() => {
    if (reducedMotion || variant !== 'hero') return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth < 1024) return; // Desktop only

      const normalizedX = (e.clientX / innerWidth - 0.5) * 2;
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2;

      setMouseOffset({
        x: normalizedX * 10,
        y: normalizedY * 5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion, variant]);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Heights per variant to preserve zero CLS
  const heightClasses = {
    hero: 'h-[160px] sm:h-[320px] md:h-[480px] lg:h-[540px] w-full',
    footer: 'h-[120px] sm:h-[180px] md:h-[220px] w-full',
    mini: 'h-[80px] sm:h-[120px] w-full',
  }[variant];

  // Parallax translation rates per brief
  // Mobile: maximum 3 moving layers (layers 4, 6, 8 only), no pointer effects, reduced movement
  const getLayerTransform = (layerIndex: number, rate: number, pointerMultiplier: number) => {
    if (reducedMotion || variant !== 'hero') return undefined;
    if (isMobile) {
      // Only 3 moving layers on mobile
      if (![4, 6, 8].includes(layerIndex)) return undefined;
      const yShift = scrollYProgress * rate * 30;
      return `translate3d(0px, ${yShift.toFixed(1)}px, 0)`;
    }
    const yShift = scrollYProgress * rate * 70 + mouseOffset.y * pointerMultiplier;
    const xShift = mouseOffset.x * pointerMultiplier;
    return `translate3d(${xShift.toFixed(1)}px, ${yShift.toFixed(1)}px, 0)`;
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden pointer-events-none select-none', heightClasses, className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full block"
        focusable="false"
      >
        <defs>
          {/* Halftone / Stipple dot pattern */}
          <pattern id="stipple-dots" width="12" height="12" patternUnits="userSpaceOnUse">
            <circle cx="6" cy="6" r="1.5" fill="#0B0B0B" opacity="0.15" />
          </pattern>

          {/* Hatch pattern */}
          <pattern id="hatch-pat" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="8" stroke="#0B0B0B" strokeWidth="1.2" opacity="0.15" />
          </pattern>

          {/* Sky Gradient */}
          <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9FD0FF" stopOpacity="0.4" />
            <stop offset="60%" stopColor="#9FD0FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#FBF6EA" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 1. Sky band */}
        <rect x="0" y="0" width="1440" height="400" fill="url(#sky-gradient)" />

        {/* 2. Sun Disc (Saffron with thick ink outline) */}
        <g
          style={{
            transform: getLayerTransform(2, 0.08, 0.2),
            transition: 'transform 0.15s ease-out',
          }}
        >
          <circle
            cx="720"
            cy="180"
            r="60"
            fill="#FFC72C"
            stroke="#0B0B0B"
            strokeWidth="3.5"
          />
          {/* Subtle sun stipple */}
          <circle cx="720" cy="180" r="58" fill="url(#stipple-dots)" />
        </g>

        {/* 3. Clouds (Drifting, white with 3px ink outline) */}
        <g
          className={reducedMotion || isMobile ? '' : 'animate-drift-cloud'}
          style={{
            transform: getLayerTransform(3, 0.12, 0.3),
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Cloud 1 */}
          <g transform="translate(180, 110)">
            <path
              d="M10,40 A20,20 0 0,1 25,15 A25,25 0 0,1 65,10 A25,25 0 0,1 95,25 A20,20 0 0,1 110,40 Z"
              fill="#FFFFFF"
              stroke="#0B0B0B"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
          {/* Cloud 2 */}
          <g transform="translate(1120, 90)">
            <path
              d="M10,40 A18,18 0 0,1 25,18 A22,22 0 0,1 60,14 A22,22 0 0,1 85,28 A18,18 0 0,1 100,40 Z"
              fill="#FFFFFF"
              stroke="#0B0B0B"
              strokeWidth="3"
              strokeLinejoin="round"
            />
          </g>
        </g>

        {/* 9. Birds drifting */}
        <g
          className={reducedMotion || isMobile ? '' : 'animate-drift-bird'}
          style={{
            transform: getLayerTransform(9, 0.15, 0.35),
            transition: 'transform 0.15s ease-out',
          }}
        >
          <path d="M480,130 Q492,120 504,130 Q516,120 528,130" stroke="#0B0B0B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M540,110 Q550,102 560,110 Q570,102 580,110" stroke="#0B0B0B" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M960,140 Q972,130 984,140 Q996,130 1008,140" stroke="#0B0B0B" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>

        {/* 4. Far Mountains (Blue and Sky with 3px ink outlines) */}
        <g
          style={{
            transform: getLayerTransform(4, 0.1, 0.35),
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Mountain range silhouette */}
          <polygon
            points="0,600 0,320 160,210 320,290 520,180 720,280 940,170 1140,270 1320,190 1440,250 1440,600"
            fill="#9FD0FF"
            stroke="#0B0B0B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Peak shading hatch */}
          <polygon points="160,210 320,290 280,330 160,210" fill="url(#hatch-pat)" />
          <polygon points="520,180 720,280 640,320 520,180" fill="url(#hatch-pat)" />
          <polygon points="940,170 1140,270 1060,320 940,170" fill="url(#hatch-pat)" />
        </g>

        {/* 5. Near Mountains with Snow Caps (Paper & Mint with 3px ink outline) */}
        <g
          style={{
            transform: getLayerTransform(5, 0.25, 0.5),
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Near mountain ridge */}
          <polygon
            points="0,600 0,380 220,260 440,360 680,240 880,340 1120,230 1360,340 1440,300 1440,600"
            fill="#6FE3C1"
            stroke="#0B0B0B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Snow Caps (Paper #FBF6EA) */}
          <polygon points="220,260 170,300 210,310 240,295 270,315 220,260" fill="#FBF6EA" stroke="#0B0B0B" strokeWidth="3" />
          <polygon points="680,240 620,285 660,295 700,280 730,300 680,240" fill="#FBF6EA" stroke="#0B0B0B" strokeWidth="3" />
          <polygon points="1120,230 1060,280 1100,290 1140,275 1180,295 1120,230" fill="#FBF6EA" stroke="#0B0B0B" strokeWidth="3" />
        </g>

        {/* 6. Dal Lake Band (Sky blue with waves and Chinar-red Shikara) */}
        <g
          style={{
            transform: getLayerTransform(6, 0.4, 0.65),
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Water polygon */}
          <polygon
            points="0,600 0,440 1440,430 1440,600"
            fill="#9FD0FF"
            stroke="#0B0B0B"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Wave ripples */}
          <path d="M120,460 Q150,452 180,460 T240,460" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M500,475 Q530,467 560,475 T620,475" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M880,465 Q910,457 940,465 T1000,465" stroke="#0057FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Traditional Kashmiri Shikara Boat (Chinar Red #FF5A36) */}
          <g transform="translate(680, 430)">
            {/* Hull */}
            <path
              d="M0,40 L16,46 L130,46 L150,34 L120,50 L20,50 Z"
              fill="#FF5A36"
              stroke="#0B0B0B"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            {/* Wooden Canopy Frame */}
            <path d="M35,38 L35,16 L105,16 L105,38" stroke="#0B0B0B" strokeWidth="3" fill="none" />
            {/* Canopy Roof (Saffron with scalloped edge) */}
            <path
              d="M28,16 L112,16 L110,10 L30,10 Z"
              fill="#FFC72C"
              stroke="#0B0B0B"
              strokeWidth="3"
            />
            {/* Curtains / cushions */}
            <rect x="42" y="20" width="22" height="16" rx="4" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2" />
            <rect x="74" y="20" width="22" height="16" rx="4" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2" />
            {/* Heart-shaped oar handle */}
            <path d="M135,32 L155,18" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
            <polygon points="155,18 160,14 163,19" fill="#FF5A36" stroke="#0B0B0B" strokeWidth="2" />
          </g>
        </g>

        {/* 7. Big Chinar Tree (Orange-red foliage on the right bank) */}
        <g
          style={{
            transform: getLayerTransform(7, 0.55, 0.8),
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Trunk */}
          <path
            d="M1340,600 L1320,440 Q1300,380 1280,350 L1295,350 Q1320,380 1345,430 L1365,600 Z"
            fill="#0B0B0B"
            stroke="#0B0B0B"
            strokeWidth="3"
          />
          {/* Foliage Clusters (Chinar red & saffron) */}
          <circle cx="1260" cy="320" r="54" fill="#FF5A36" stroke="#0B0B0B" strokeWidth="3.5" />
          <circle cx="1320" cy="300" r="62" fill="#FFC72C" stroke="#0B0B0B" strokeWidth="3.5" />
          <circle cx="1360" cy="340" r="48" fill="#FF5A36" stroke="#0B0B0B" strokeWidth="3.5" />
          <circle cx="1290" cy="360" r="44" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="3.5" />
          {/* Hatch texture on tree cluster */}
          <circle cx="1320" cy="300" r="58" fill="url(#stipple-dots)" />
        </g>

        {/* 8. Foreground Valley Bank, Crocus Flowers & Grass (Saffron & Mint) */}
        <g
          style={{
            transform: getLayerTransform(8, 0.8, 1.0),
            transition: 'transform 0.15s ease-out',
          }}
        >
          {/* Shoreline bank */}
          <polygon
            points="0,600 0,530 360,510 720,535 1100,505 1440,520 1440,600"
            fill="#FBF6EA"
            stroke="#0B0B0B"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Grass tufts */}
          <path d="M80,515 L70,495 M80,515 L80,490 M80,515 L90,495" stroke="#0B0B0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M420,525 L410,505 M420,525 L420,500 M420,525 L430,505" stroke="#0B0B0B" strokeWidth="3" strokeLinecap="round" />
          <path d="M820,520 L810,500 M820,520 L820,495 M820,520 L830,500" stroke="#0B0B0B" strokeWidth="3" strokeLinecap="round" />

          {/* Saffron Crocus Flower 1 */}
          <g transform="translate(180, 480)">
            <ellipse cx="14" cy="14" rx="7" ry="12" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
            <ellipse cx="7" cy="16" rx="5" ry="10" transform="rotate(-20 7 16)" fill="#9FD0FF" stroke="#0B0B0B" strokeWidth="2.5" />
            <ellipse cx="21" cy="16" rx="5" ry="10" transform="rotate(20 21 16)" fill="#9FD0FF" stroke="#0B0B0B" strokeWidth="2.5" />
            <path d="M14,12 L14,4 M11,12 L8,6 M17,12 L20,6" stroke="#FFC72C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M14,24 L14,35" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Saffron Crocus Flower 2 */}
          <g transform="translate(230, 490)">
            <ellipse cx="12" cy="12" rx="6" ry="10" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
            <ellipse cx="6" cy="14" rx="4" ry="8" transform="rotate(-20 6 14)" fill="#FFC72C" stroke="#0B0B0B" strokeWidth="2.5" />
            <ellipse cx="18" cy="14" rx="4" ry="8" transform="rotate(20 18 14)" fill="#FFC72C" stroke="#0B0B0B" strokeWidth="2.5" />
            <path d="M12,10 L12,4 M9,10 L7,5 M15,10 L17,5" stroke="#FF5A36" strokeWidth="2" strokeLinecap="round" />
            <path d="M12,20 L12,30" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>

          {/* Saffron Crocus Flower 3 on right bank */}
          <g transform="translate(1020, 485)">
            <ellipse cx="14" cy="14" rx="7" ry="12" fill="#FF9EC4" stroke="#0B0B0B" strokeWidth="2.5" />
            <ellipse cx="7" cy="16" rx="5" ry="10" transform="rotate(-20 7 16)" fill="#9FD0FF" stroke="#0B0B0B" strokeWidth="2.5" />
            <ellipse cx="21" cy="16" rx="5" ry="10" transform="rotate(20 21 16)" fill="#9FD0FF" stroke="#0B0B0B" strokeWidth="2.5" />
            <path d="M14,12 L14,4 M11,12 L8,6 M17,12 L20,6" stroke="#FFC72C" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M14,24 L14,35" stroke="#0B0B0B" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>
      </svg>
    </div>
  );
}
