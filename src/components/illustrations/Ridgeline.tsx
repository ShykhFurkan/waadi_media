'use client';

import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RidgelineProps {
  variant?: 'hero' | 'footer' | 'divider';
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

  // Pointer follow (desktop only, max 12px)
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

  // Heights per variant to prevent CLS
  const heightClasses = {
    hero: 'h-[260px] sm:h-[340px] md:h-[400px] lg:h-[460px] w-full',
    footer: 'h-[100px] sm:h-[140px] md:h-[180px] w-full',
    divider: 'h-[60px] sm:h-[90px] w-full',
  }[variant];

  // Colors: 5 tonal blues back to front
  const colors = [
    '#E6EEFF', // Back
    '#C9DAFF',
    '#9DBAFF',
    '#5C8DFF',
    '#0057FF', // Front
  ];

  // Organic mountain silhouettes designed for 1440x400 viewBox
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

  const parallaxRates = [0.2, 0.3, 0.4, 0.5, 0.6];

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
        {paths.map((d, index) => {
          const pointerDepth = (index + 1) / 5;
          const delay = index * 0.12;

          if (reducedMotion || variant !== 'hero') {
            return (
              <path
                key={index}
                d={d}
                fill={colors[index]}
              />
            );
          }

          const yParallax = scrollYProgress * parallaxRates[index] * 60;
          const xShift = mouseOffset.x * pointerDepth;
          const yShift = mouseOffset.y * pointerDepth + yParallax;

          return (
            <path
              key={index}
              d={d}
              fill={colors[index]}
              className="animate-ridgeline-rise"
              style={{
                animationDelay: `${delay}s`,
                transform: `translate3d(${xShift}px, ${yShift}px, 0)`,
                transition: 'transform 0.2s ease-out',
              }}
            />
          );
        })}
      </svg>
    </div>
  );
}
