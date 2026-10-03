import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { Marquee } from '@/components/ui/Marquee';
import { WhyWaadiSection } from '@/components/sections/WhyWaadiSection';
import { ServicesListSection } from '@/components/sections/ServicesListSection';
import { WorkPanelsSection } from '@/components/sections/WorkPanelsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { PackagesPreviewSection } from '@/components/sections/PackagesPreviewSection';
import { IndustriesSection } from '@/components/sections/IndustriesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { CtaBandSection } from '@/components/sections/CtaBandSection';

export const metadata: Metadata = {
  title: 'Waadi Media - Web Design and Digital Agency in Kashmir',
  description:
    "Websites, SEO, branding, ads and software for Kashmir's businesses. Clear prices, fast delivery, built in Anantnag. Book a free call.",
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Waadi Media - Web Design and Digital Agency in Kashmir',
    description:
      "Websites, SEO, branding, ads and software for Kashmir's businesses. Clear prices, fast delivery, built in Anantnag. Book a free call.",
    url: '/',
    type: 'website',
  },
};

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

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-snow">
      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Marquee */}
      <Marquee items={marqueeServices} />

      {/* Section 3: Why Waadi */}
      <WhyWaadiSection />

      {/* Section 4: Services list */}
      <ServicesListSection />

      {/* Section 5: Selected work panels */}
      <WorkPanelsSection />

      {/* Section 6: How we work */}
      <ProcessSection />

      {/* Section 7: Packages preview */}
      <PackagesPreviewSection />

      {/* Section 8: Industries */}
      <IndustriesSection />

      {/* Section 9: Testimonials (conditionally renders only if data exists) */}
      <TestimonialsSection />

      {/* Section 10: FAQ with FAQPage JSON-LD */}
      <FaqSection />

      {/* Section 11: Final call-to-action band */}
      <CtaBandSection />
    </div>
  );
}
