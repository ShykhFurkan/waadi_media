import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { CrossingMarquees } from '@/components/ui/CrossingMarquees';
import { WorkPanelsSection } from '@/components/sections/WorkPanelsSection';
import { ServicesListSection } from '@/components/sections/ServicesListSection';
import { WhyWaadiSection } from '@/components/sections/WhyWaadiSection';
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

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-paper">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Crossing Marquees between Hero and Work */}
      <CrossingMarquees />

      {/* 3. Work */}
      <WorkPanelsSection />

      {/* 4. Services */}
      <ServicesListSection />

      {/* 5. Why Waadi */}
      <WhyWaadiSection />

      {/* 6. Process */}
      <ProcessSection />

      {/* 7. Packages preview */}
      <PackagesPreviewSection />

      {/* 8. Industries */}
      <IndustriesSection />

      {/* 9. Testimonials (renders nothing when empty) */}
      <TestimonialsSection />

      {/* 10. FAQ */}
      <FaqSection />

      {/* 11. Final call to action */}
      <CtaBandSection />
    </div>
  );
}
