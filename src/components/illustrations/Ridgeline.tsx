'use client';

import React, { useRef, useState, useEffect } from 'react';
import { m, useScroll, useTransform, useReducedMotion, LazyMotion, domAnimation } from 'motion/react';
import { cn } from '@/lib/utils';
import { easeCustom } from '@/components/ui/MotionHelpers';

interface RidgelineProps {
  variant?: 'hero' | 'footer' | 'divider';
  className?: string;
}

export function Ridgeline({ variant = 'hero', className }: RidgelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll parallax for hero variant
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax rates: back layers 0.2x, front layers 0.6x
  const yLayer1 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const yLayer3 = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yLayer4 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const yLayer5 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);

  // Pointer follow (desktop only, max 12px)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (shouldReduceMotion || variant !== 'hero') return;

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
  }, [shouldReduceMotion, variant]);

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

  const yTransforms = [yLayer1, yLayer2, yLayer3, yLayer4, yLayer5];

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        className={cn('relative overflow-hidden pointer-events-none select-none', heightClasses, className)}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1440 400"
          preserveAspectRatio="none"
          className="w-full h-full block"
          // Non-blocking: SVG is decorative, dimensions reserved via CSS
          focusable="false"
        >
          {paths.map((d, index) => {
            const delay = index * 0.15; // Staggered page-load rise sequence
            const pointerDepth = (index + 1) / 5; // Greater shift on front layers

            if (shouldReduceMotion || variant !== 'hero') {
              return (
                <path
                  key={index}
                  d={d}
                  fill={colors[index]}
                />
              );
            }

            return (
              <m.path
                key={index}
                d={d}
                fill={colors[index]}
                initial={{ y: '35%', opacity: 0 }}
                animate={{
                  y: mouseOffset.y * pointerDepth,
                  x: mouseOffset.x * pointerDepth,
                  opacity: 1,
                }}
                style={{
                  y: yTransforms[index],
                }}
                transition={{
                  opacity: { duration: 0.8, delay, ease: easeCustom },
                  x: { duration: 0.3, ease: 'easeOut' },
                  y: { duration: 0.8, delay, ease: easeCustom },
                }}
              />
            );
          })}
        </svg>
      </div>
    </LazyMotion>
  );
}
