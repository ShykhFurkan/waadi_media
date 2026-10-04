'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RidgelineProps {
  variant?: 'hero' | 'footer' | 'divider' | 'backdrop';
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

export function Ridgeline({ variant = 'hero', className }: RidgelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );
  const [scrollYProgress, setScrollYProgress] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Scroll parallax for hero variant
  useEffect(() => {
    if (reducedMotion || variant !== 'hero') return;

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const top = rect.top;
            const height = rect.height || 400;
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

  // Pointer depth on desktop (max 12px) per brief
  useEffect(() => {
    if (reducedMotion || variant !== 'hero') return;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      if (innerWidth < 1024) return; // Desktop only

      const normalizedX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const normalizedY = (e.clientY / innerHeight - 0.5) * 2;

      setMouseOffset({
        x: normalizedX * 12,
        y: normalizedY * 6,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [reducedMotion, variant]);

  // Reserved heights per variant to prevent CLS
  const heightClasses = {
    hero: 'h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] w-full',
    footer: 'h-[110px] sm:h-[150px] md:h-[190px] w-full',
    divider: 'h-[70px] sm:h-[100px] w-full',
    backdrop: 'h-[220px] sm:h-[300px] w-full opacity-60',
  }[variant];

  // 5 tonal layers of Himalayan ridges: subtle snow-mist blues into deep brand blue
  const colors = [
    '#E2ECFA', // Layer 1 (Distant peaks)
    '#C4DCFA', // Layer 2 (Sweeping mid-distance)
    '#97C0F7', // Layer 3 (Central ridge)
    '#5493F2', // Layer 4 (Foothills)
    '#0057FF', // Layer 5 (Front signature valley rim)
  ];

  // Mountain silhouettes designed for 1440x400 viewBox
  const paths = [
    // Layer 1: Distant high majestic peaks
    'M0,230 L0,150 Q180,90 320,135 T680,105 Q860,60 1040,115 T1440,130 L1440,400 L0,400 Z',
    // Layer 2: Mid-distance sweeping ridgeline
    'M0,250 L0,180 Q140,130 360,175 T760,140 Q940,120 1160,165 T1440,170 L1440,400 L0,400 Z',
    // Layer 3: Central range with dramatic slope
    'M0,280 L0,210 Q240,170 480,225 T920,195 Q1120,185 1320,220 T1440,215 L1440,400 L0,400 Z',
    // Layer 4: Near rolling foothills
    'M0,310 L0,250 Q160,225 420,265 T880,240 Q1100,230 1340,265 T1440,260 L1440,400 L0,400 Z',
    // Layer 5: Front sharp signature valley edge
    'M0,340 L0,290 Q220,270 520,305 T1020,285 Q1220,280 1440,300 L1440,400 L0,400 Z',
  ];

  const parallaxRates = [0.15, 0.25, 0.35, 0.48, 0.6];

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden pointer-events-none select-none', heightClasses, className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        className="w-full h-full block"
        focusable="false"
      >
        <defs>
          {/* Subtle mist gradient between layers */}
          <linearGradient id="mist-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="25%" stopColor="#EDF4FF" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Saffron metallic radial gradient for sun disc */}
          <radialGradient id="saffron-sun" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D9A855" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#B8893B" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#B8893B" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Small saffron sun disc rising behind the ridges (hero only) */}
        {variant === 'hero' && (
          <circle
            cx="860"
            cy="115"
            r="38"
            fill="url(#saffron-sun)"
            className={reducedMotion ? '' : 'animate-sun-rise origin-center'}
          />
        )}

        {/* Layer 1: Distant Peaks */}
        <path
          d={paths[0]}
          fill={colors[0]}
          className={reducedMotion ? '' : 'animate-ridgeline-rise'}
          style={
            !reducedMotion && variant === 'hero'
              ? {
                  transform: `translate3d(${mouseOffset.x * 0.2}px, ${
                    mouseOffset.y * 0.2 + scrollYProgress * parallaxRates[0] * 60
                  }px, 0)`,
                  transition: 'transform 0.2s ease-out',
                }
              : undefined
          }
        />

        {/* Layer 2: Mid-distance */}
        <path
          d={paths[1]}
          fill={colors[1]}
          className={reducedMotion ? '' : 'animate-ridgeline-rise'}
          style={
            !reducedMotion && variant === 'hero'
              ? {
                  animationDelay: '0.12s',
                  transform: `translate3d(${mouseOffset.x * 0.35}px, ${
                    mouseOffset.y * 0.35 + scrollYProgress * parallaxRates[1] * 60
                  }px, 0)`,
                  transition: 'transform 0.2s ease-out',
                }
              : undefined
          }
        />

        {/* Slow drifting mist layer between ridge 2 and 3 */}
        {variant === 'hero' && (
          <path
            d="M-100,160 Q200,120 600,170 T1300,140 Q1500,160 1600,150 L1600,240 L-100,240 Z"
            fill="url(#mist-grad)"
            className={reducedMotion ? 'opacity-30' : 'animate-mist-drift'}
          />
        )}

        {/* Layer 3: Central Range */}
        <path
          d={paths[2]}
          fill={colors[2]}
          className={reducedMotion ? '' : 'animate-ridgeline-rise'}
          style={
            !reducedMotion && variant === 'hero'
              ? {
                  animationDelay: '0.24s',
                  transform: `translate3d(${mouseOffset.x * 0.55}px, ${
                    mouseOffset.y * 0.55 + scrollYProgress * parallaxRates[2] * 60
                  }px, 0)`,
                  transition: 'transform 0.2s ease-out',
                }
              : undefined
          }
        />

        {/* Layer 4: Foothills */}
        <path
          d={paths[3]}
          fill={colors[3]}
          className={reducedMotion ? '' : 'animate-ridgeline-rise'}
          style={
            !reducedMotion && variant === 'hero'
              ? {
                  animationDelay: '0.36s',
                  transform: `translate3d(${mouseOffset.x * 0.75}px, ${
                    mouseOffset.y * 0.75 + scrollYProgress * parallaxRates[3] * 60
                  }px, 0)`,
                  transition: 'transform 0.2s ease-out',
                }
              : undefined
          }
        />

        {/* Layer 5: Front Valley Edge */}
        <path
          d={paths[4]}
          fill={colors[4]}
          className={reducedMotion ? '' : 'animate-ridgeline-rise'}
          style={
            !reducedMotion && variant === 'hero'
              ? {
                  animationDelay: '0.48s',
                  transform: `translate3d(${mouseOffset.x * 1.0}px, ${
                    mouseOffset.y * 1.0 + scrollYProgress * parallaxRates[4] * 60
                  }px, 0)`,
                  transition: 'transform 0.2s ease-out',
                }
              : undefined
          }
        />
      </svg>
    </div>
  );
}
