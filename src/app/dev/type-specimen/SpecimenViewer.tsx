'use client';

import React, { useState } from 'react';

export function SpecimenViewer() {
  const [activeFont, setActiveFont] = useState<'cormorant' | 'bodoni'>('cormorant');
  const [viewportMode, setViewportMode] = useState<'both' | '360' | '1440'>('both');

  const fontOverrideStyle = {
    '--font-display-override':
      activeFont === 'cormorant' ? 'var(--font-cormorant)' : 'var(--font-bodoni)',
  } as React.CSSProperties;

  return (
    <div className="max-w-7xl mx-auto space-y-8" style={fontOverrideStyle}>
      {/* Controls Bar */}
      <div className="bg-paper border border-line p-6 rounded-2xl flex flex-wrap items-center justify-between gap-4 sticky top-4 z-40 shadow-sm">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-mist">
            Internal Dev Tool
          </span>
          <h1 className="text-2xl font-semibold text-ink">Typography Specimen</h1>
          <p className="text-sm text-mist">
            Compare Cormorant Garamond vs Bodoni Moda across 360px mobile and 1440px desktop viewports.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center bg-pearl p-1 rounded-full border border-line">
            <button
              onClick={() => setActiveFont('cormorant')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeFont === 'cormorant'
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              Cormorant Garamond
            </button>
            <button
              onClick={() => setActiveFont('bodoni')}
              className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                activeFont === 'bodoni'
                  ? 'bg-blue text-white shadow-sm'
                  : 'text-graphite hover:text-ink'
              }`}
            >
              Bodoni Moda
            </button>
          </div>

          <div className="flex items-center bg-pearl p-1 rounded-full border border-line text-sm">
            <button
              onClick={() => setViewportMode('both')}
              className={`px-3 py-1 rounded-full transition-colors ${
                viewportMode === 'both' ? 'bg-paper text-ink font-semibold' : 'text-mist'
              }`}
            >
              Both
            </button>
            <button
              onClick={() => setViewportMode('360')}
              className={`px-3 py-1 rounded-full transition-colors ${
                viewportMode === '360' ? 'bg-paper text-ink font-semibold' : 'text-mist'
              }`}
            >
              360px
            </button>
            <button
              onClick={() => setViewportMode('1440')}
              className={`px-3 py-1 rounded-full transition-colors ${
                viewportMode === '1440' ? 'bg-paper text-ink font-semibold' : 'text-mist'
              }`}
            >
              1440px
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* 360px Mobile Frame */}
        {(viewportMode === 'both' || viewportMode === '360') && (
          <div className="flex flex-col items-center">
            <span className="text-xs font-semibold text-mist uppercase tracking-widest mb-2">
              Mobile (360px viewport)
            </span>
            <div
              className="w-[360px] bg-paper border border-line rounded-3xl p-6 shadow-md overflow-hidden"
              style={{ minHeight: '640px' }}
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase text-mist tracking-widest">Hero H1</span>
                  <h1 className="text-h1 mt-1 text-ink">
                    Built in the valley.{' '}
                    <span className="italic block font-normal">Made for your business.</span>
                  </h1>
                </div>

                <div className="border-t border-line pt-4">
                  <span className="text-xs uppercase text-mist tracking-widest">Section H2</span>
                  <h2 className="text-h2 mt-1 text-ink">Every detail matters.</h2>
                </div>

                <div className="border-t border-line pt-4">
                  <span className="text-xs uppercase text-mist tracking-widest">Price Tabular Lining</span>
                  <div className="text-price text-3xl font-medium text-ink mt-1">₹45,000</div>
                  <span className="text-xs text-mist">Newsreader lining & tabular numerals</span>
                </div>

                <div className="border-t border-line pt-4">
                  <span className="text-xs uppercase text-mist tracking-widest">Italic Phrase</span>
                  <p className="font-serif italic text-lg text-graphite mt-1">
                    Quiet valley luxury is restraint plus craft.
                  </p>
                </div>

                <div className="border-t border-line pt-4">
                  <span className="text-xs uppercase text-mist tracking-widest">Outfit Body</span>
                  <p className="text-body text-graphite mt-1">
                    Websites, SEO, branding, ads and software for Kashmir&apos;s businesses. Clear prices, fast delivery, built in Anantnag.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 1440px Desktop Simulated Frame */}
        {(viewportMode === 'both' || viewportMode === '1440') && (
          <div className="flex flex-col items-center w-full">
            <span className="text-xs font-semibold text-mist uppercase tracking-widest mb-2">
              Desktop (1440px responsive canvas)
            </span>
            <div className="w-full bg-paper border border-line rounded-3xl p-8 lg:p-12 shadow-md">
              <div className="space-y-8">
                <div>
                  <span className="text-xs uppercase text-mist tracking-widest">Hero H1</span>
                  <h1 className="text-h1 text-ink mt-2">
                    Built in the valley.{' '}
                    <span className="italic block font-normal">Made for your business.</span>
                  </h1>
                </div>

                <div className="border-t border-line pt-6">
                  <span className="text-xs uppercase text-mist tracking-widest">Section H2</span>
                  <h2 className="text-h2 text-ink mt-2">
                    Engineered for high performance and calm luxury.
                  </h2>
                </div>

                <div className="border-t border-line pt-6 flex flex-wrap items-baseline gap-6">
                  <div>
                    <span className="text-xs uppercase text-mist tracking-widest block">Price Tabular Lining</span>
                    <span className="text-price text-5xl font-medium text-ink mt-2 inline-block">
                      ₹1,20,000
                    </span>
                  </div>
                  <div>
                    <span className="text-xs uppercase text-mist tracking-widest block">Starting Rate</span>
                    <span className="text-price text-3xl font-medium text-graphite mt-2 inline-block">
                      ₹25,000 / mo
                    </span>
                  </div>
                </div>

                <div className="border-t border-line pt-6">
                  <span className="text-xs uppercase text-mist tracking-widest">Italic Full Phrase</span>
                  <p className="font-serif italic text-2xl text-graphite mt-2">
                    Nothing flashy, everything intentional — craft over decoration.
                  </p>
                </div>

                <div className="border-t border-line pt-6">
                  <span className="text-xs uppercase text-mist tracking-widest">Outfit Body Text</span>
                  <p className="text-body max-w-prose text-graphite mt-2">
                    We work with local enterprises, exporters, and forward-looking startups across Srinagar, Anantnag, and Baramulla. Every deliverable is engineered to load under 2.5 seconds on mobile data, present clear pricing, and convert visitors into long-term commercial relationships.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
