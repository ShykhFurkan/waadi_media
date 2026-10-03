// TODO: Delete this temporary design-system review page before launch.
'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
import { Badge } from '@/components/ui/Badge';
import { Tabs } from '@/components/ui/Tabs';
import { Accordion } from '@/components/ui/Accordion';
import { Marquee } from '@/components/ui/Marquee';
import { Ridgeline } from '@/components/illustrations/Ridgeline';
import { MaskedReveal, DrawDivider, ImageWipe } from '@/components/ui/MotionHelpers';
import { formatINR } from '@/data/pricing';

export function DesignSystemClient() {
  const [activeTab, setActiveTab] = useState('one-time');
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('tourism');

  const sampleAccordion = [
    {
      id: 'faq-1',
      question: 'How much does a website cost in Kashmir?',
      answer:
        'A single landing page starts at ₹5,000, and a comprehensive 5-page business website starts at ₹15,000. All prices are published clearly with zero surprise costs.',
    },
    {
      id: 'faq-2',
      question: 'How long does delivery take?',
      answer:
        'Landing pages typically launch in 3 to 5 business days. Complete custom business websites take 2 to 3 weeks.',
    },
    {
      id: 'faq-3',
      question: 'Who owns the website and code after launch?',
      answer:
        'You do. Upon milestone completion, all source code, domain credentials, and design assets belong to you 100%.',
    },
  ];

  const marqueeServices = [
    'Websites',
    'Online stores',
    'SEO',
    'Brand identity',
    'Google and Meta ads',
    'Social media',
    'Software and apps',
    'WhatsApp and AI automation',
  ];

  return (
    <div className="w-full min-h-screen bg-snow text-graphite pt-28 pb-24 px-5 sm:px-8 max-w-[1200px] mx-auto space-y-24">
      {/* Page Title */}
      <section className="space-y-4">
        <Badge>Phase 1 Component Review</Badge>
        <MaskedReveal>
          <h1 className="text-display text-ink">Design System &amp; Primitives</h1>
        </MaskedReveal>
        <p className="text-lead text-mist max-w-2xl">
          Visual tokens, typography scale, buttons, form controls, motion helpers, and the signature valley ridgeline.
        </p>
      </section>

      {/* 1. Signature Ridgeline Showcase */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">1. Signature Ridgeline (&quot;The Valley&quot;)</h2>
          <p className="text-sm text-mist">
            5 tonal mountain layers (#E6EEFF to #0057FF). Features staggered load rise, scroll parallax, and subtle pointer-follow on desktop.
          </p>
        </div>
        <div className="border border-line rounded-3xl bg-paper overflow-hidden pt-8">
          <div className="px-8 pb-4">
            <span className="text-xs uppercase tracking-wider text-mist font-semibold">Hero Viewport Variant</span>
          </div>
          <Ridgeline variant="hero" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-line rounded-2xl bg-paper p-6 overflow-hidden">
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-4">Footer Variant</span>
            <div className="border border-line/40 rounded-xl overflow-hidden">
              <Ridgeline variant="footer" />
            </div>
          </div>
          <div className="border border-line rounded-2xl bg-paper p-6 overflow-hidden">
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-4">Section Divider Variant</span>
            <div className="border border-line/40 rounded-xl overflow-hidden">
              <Ridgeline variant="divider" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Brand Identity & Wordmark */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">2. Recreated Wordmark / Logo</h2>
          <p className="text-sm text-mist">
            Geometric Outfit typography: bold &quot;waadi&quot; in brand blue (#0057FF) over &quot;media.com&quot; in black.
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-2xl flex flex-wrap items-center gap-12">
          <div>
            <span className="text-xs text-mist block mb-2">Standard Header Size:</span>
            <Logo />
          </div>
          <div>
            <span className="text-xs text-mist block mb-2">Large Showcase Scale:</span>
            <div className="scale-125 origin-left">
              <Logo />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Color Tokens */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">3. Color Palette Tokens</h2>
          <p className="text-sm text-mist">
            Cool snow background, deep ink headings, brand blue accent, and tonal ridgeline blues.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div className="p-4 rounded-xl border border-line bg-snow">
            <div className="h-10 rounded bg-[#F5F8FC] border border-line mb-2" />
            <span className="text-xs font-bold text-ink block">--snow</span>
            <span className="text-[11px] text-mist font-mono">#F5F8FC</span>
          </div>
          <div className="p-4 rounded-xl border border-line bg-paper">
            <div className="h-10 rounded bg-[#FFFFFF] border border-line mb-2" />
            <span className="text-xs font-bold text-ink block">--paper</span>
            <span className="text-[11px] text-mist font-mono">#FFFFFF</span>
          </div>
          <div className="p-4 rounded-xl border border-line bg-paper">
            <div className="h-10 rounded bg-[#000000] mb-2" />
            <span className="text-xs font-bold text-ink block">--ink</span>
            <span className="text-[11px] text-mist font-mono">#000000</span>
          </div>
          <div className="p-4 rounded-xl border border-line bg-paper">
            <div className="h-10 rounded bg-[#0057FF] mb-2" />
            <span className="text-xs font-bold text-ink block">--blue</span>
            <span className="text-[11px] text-mist font-mono">#0057FF</span>
          </div>
          <div className="p-4 rounded-xl border border-line bg-paper">
            <div className="h-10 rounded bg-[#0039B3] mb-2" />
            <span className="text-xs font-bold text-ink block">--blue-deep</span>
            <span className="text-[11px] text-mist font-mono">#0039B3</span>
          </div>
          <div className="p-4 rounded-xl border border-line bg-paper">
            <div className="h-10 rounded bg-[#25D366] mb-2" />
            <span className="text-xs font-bold text-ink block">--whatsapp</span>
            <span className="text-[11px] text-mist font-mono">#25D366</span>
          </div>
        </div>
      </section>

      {/* 4. Typography Scale */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">4. Fluid Typography Scale</h2>
          <p className="text-sm text-mist">
            Newsreader for editorial display &amp; headings; Outfit for clean geometric body &amp; UI.
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-3xl space-y-6">
          <div className="border-b border-line pb-4">
            <span className="text-xs font-mono text-mist block mb-1">display (Newsreader 400)</span>
            <p className="text-display">Built in the valley.</p>
          </div>
          <div className="border-b border-line pb-4">
            <span className="text-xs font-mono text-mist block mb-1">h1 (Newsreader 400)</span>
            <p className="text-h1">Website design in Kashmir</p>
          </div>
          <div className="border-b border-line pb-4">
            <span className="text-xs font-mono text-mist block mb-1">h2 (Newsreader 400)</span>
            <p className="text-h2">A local agency that speaks your language</p>
          </div>
          <div className="border-b border-line pb-4">
            <span className="text-xs font-mono text-mist block mb-1">h3 (Outfit 500)</span>
            <p className="text-h3">Everything your business needs online</p>
          </div>
          <div className="border-b border-line pb-4">
            <span className="text-xs font-mono text-mist block mb-1">price (Newsreader 400 tabular-nums)</span>
            <p className="text-price text-blue">{formatINR(15000)} <span className="text-sm text-mist font-normal">one-time</span></p>
          </div>
          <div>
            <span className="text-xs font-mono text-mist block mb-1">lead &amp; body (Outfit 300 &amp; 400)</span>
            <p className="text-lead text-graphite mb-2">
              For Kashmir-based businesses and startups that want to grow online but find agencies confusing and expensive.
            </p>
            <p className="text-body text-mist">
              Most visitors browse on Android smartphones across average mobile networks. We guarantee light page weights and one-tap contact.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Buttons */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">5. Button System &amp; Magnetic Interaction</h2>
          <p className="text-sm text-mist">
            Pill geometry (999px radius). Magnetic hover pulls button up to 8px toward pointer on desktop.
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-3xl flex flex-wrap items-center gap-6">
          <div>
            <span className="text-xs text-mist block mb-2">Primary (Magnetic Hover):</span>
            <Button variant="primary" magnetic>
              Book a free call
            </Button>
          </div>
          <div>
            <span className="text-xs text-mist block mb-2">Secondary (Ink Outline):</span>
            <Button variant="secondary">
              See our work
            </Button>
          </div>
          <div>
            <span className="text-xs text-mist block mb-2">Text Link (Underline Draw):</span>
            <Button variant="text">
              Compare all packages
            </Button>
          </div>
          <div>
            <span className="text-xs text-mist block mb-2">Ghost:</span>
            <Button variant="ghost">
              Cancel
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Form Controls */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">6. Form Controls</h2>
          <p className="text-sm text-mist">
            12px radius, 1.5px line borders, 52px height, accessible focus ring (2px blue, 3px offset).
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <Input
            label="Your Name"
            placeholder="Furkan Mushtaq"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            helperText="Enter your full name or business contact person."
          />
          <Input
            label="Phone Number"
            placeholder="+91 77809 40317"
            required
            error="Enter a 10-digit phone number"
            defaultValue="123"
          />
          <Select
            label="Industry Sector"
            value={selectValue}
            onChange={(e) => setSelectValue(e.target.value)}
            options={[
              { value: 'tourism', label: 'Tourism and hospitality' },
              { value: 'education', label: 'Education and study abroad' },
              { value: 'horticulture', label: 'Horticulture and dry fruits' },
              { value: 'retail', label: 'Handicrafts and retail' },
              { value: 'software', label: 'Startup or custom software' },
            ]}
          />
          <Textarea
            label="Tell us about your business"
            placeholder="We run a tour agency in Srinagar and need a new website..."
            required
            helperText="Minimum 10 characters."
          />
        </div>
      </section>

      {/* 7. Tabs, Badges &amp; Interactive Controls */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">7. Tabs &amp; Badges</h2>
          <p className="text-sm text-mist">
            Pill tabs with smooth layout animation and blue-tint badges.
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-3xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge>New in 2026</Badge>
            <Badge>Most Popular</Badge>
            <Badge>Engineering Demo</Badge>
          </div>
          <div>
            <span className="text-xs text-mist block mb-2">Animated Filter Tabs:</span>
            <Tabs
              tabs={[
                { id: 'one-time', label: 'One-time Packages' },
                { id: 'monthly', label: 'Monthly Retainers' },
                { id: 'custom', label: 'Custom Builds' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </div>
        </div>
      </section>

      {/* 8. Marquee */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">8. Infinite Service Marquee</h2>
          <p className="text-sm text-mist">
            60s linear loop, pauses on hover, respects reduced motion.
          </p>
        </div>
        <Marquee items={marqueeServices} />
      </section>

      {/* 9. Accordion (FAQ) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">9. Accordion (FAQ)</h2>
          <p className="text-sm text-mist">
            Smooth height animation, plus icon rotates 45 degrees, full keyboard navigation.
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-3xl">
          <Accordion items={sampleAccordion} />
        </div>
      </section>

      {/* 10. Motion Helpers */}
      <section className="space-y-6">
        <div>
          <h2 className="text-h2 text-ink">10. Motion Primitives</h2>
          <p className="text-sm text-mist">
            Draw-in dividers and clip-path wipes (no generic fade-up).
          </p>
        </div>
        <div className="p-8 bg-paper border border-line rounded-3xl space-y-8">
          <div>
            <span className="text-xs text-mist block mb-2">DrawDivider (draws in from left on scroll):</span>
            <DrawDivider />
          </div>
          <div>
            <span className="text-xs text-mist block mb-2">ImageWipe (clip-path reveal):</span>
            <ImageWipe className="rounded-2xl max-w-md bg-blue-tint p-8 text-center text-blue font-medium">
              Image / Media Panel Container Wipe Reveal
            </ImageWipe>
          </div>
        </div>
      </section>
    </div>
  );
}
