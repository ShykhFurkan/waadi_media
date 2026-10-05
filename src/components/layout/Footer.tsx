'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ValleyScene } from '@/components/illustrations/ValleyScene';
import { servicesData } from '@/data/services';
import { siteConfig } from '@/config/site';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const companyLinks = [
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Book a call', href: '/book-a-call' },
  ];

  const localLinks = [
    { label: 'Web design in Kashmir', href: '/web-design-agency-kashmir' },
    { label: 'Web design in Srinagar', href: '/web-design-agency-srinagar' },
    { label: 'Web design in Anantnag', href: '/web-design-agency-anantnag' },
  ];

  return (
    <footer className="w-full bg-blue text-white border-t-[4px] border-ink relative mt-24 overflow-hidden">
      {/* Valley Art along top edge of footer */}
      <div className="w-full overflow-hidden border-b-2 border-white/20 bg-paper">
        <ValleyScene variant="footer" />
      </div>

      <div className="max-w-[1280px] mx-auto px-6 sm:px-10 pt-16 pb-12 relative z-10">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="bg-paper inline-block px-3 py-1.5 rounded-full border-[3px] border-ink shadow-hard-sm">
              <Logo />
            </div>
            <p className="text-body text-white font-medium max-w-xs">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-white">
              {siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-display text-lg text-white uppercase tracking-wider mb-2 border-b-2 border-white/20 pb-1 inline-block">
              Services
            </h3>
            <ul className="text-sm font-medium">
              {servicesData.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:underline transition-colors flex items-center min-h-[44px] text-white"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-display text-lg text-white uppercase tracking-wider mb-2 border-b-2 border-white/20 pb-1 inline-block">
              Company
            </h3>
            <ul className="text-sm font-medium">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:underline transition-colors flex items-center min-h-[44px] text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-3">
            <h3 className="font-display text-lg text-white uppercase tracking-wider mb-2 border-b-2 border-white/20 pb-1 inline-block">
              Contact
            </h3>
            <p className="text-sm text-white">
              Have an idea or enquiry? Speak directly with our team.
            </p>
            <div className="space-y-1">
              <a
                href={`tel:${siteConfig.contact.tel}`}
                onClick={() =>
                  trackEvent({
                    name: 'click_call',
                    params: { location: 'footer', phone: siteConfig.contact.tel },
                  })
                }
                className="flex items-center min-h-[44px] text-base font-bold text-white hover:underline transition-colors"
              >
                {siteConfig.contact.phone}
              </a>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                onClick={() =>
                  trackEvent({
                    name: 'click_email',
                    params: { location: 'footer', email: siteConfig.contact.email },
                  })
                }
                className="flex items-center min-h-[44px] text-base font-bold text-white hover:underline transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <p className="text-xs text-white">
              {siteConfig.contact.businessHours}
            </p>
          </div>
        </div>

        {/* Local Landing Pages Row */}
        <div className="border-t-2 border-white/40 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-white">
          <span className="font-bold uppercase tracking-wider text-white">Locations:</span>
          <div className="flex flex-col sm:flex-row flex-wrap gap-1 sm:gap-6">
            {localLinks.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="hover:underline transition-colors font-medium text-white flex items-center min-h-[44px]"
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t-2 border-white/40 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white mb-8">
          <p className="font-medium text-white">
            © {siteConfig.foundedYear} {siteConfig.name}. Made with care in Anantnag, Kashmir.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:underline transition-colors font-medium text-white flex items-center min-h-[44px]">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:underline transition-colors font-medium text-white flex items-center min-h-[44px]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Giant cropped "waadi media.com" wordmark along the bottom */}
      <div className="w-full overflow-x-clip overflow-hidden select-none pointer-events-none -mb-3 sm:-mb-6" aria-hidden="true">
        <svg
          viewBox="0 0 1440 180"
          className="w-full h-auto block"
          aria-hidden="true"
          focusable="false"
        >
          <text
            x="50%"
            y="155"
            textAnchor="middle"
            fill="#FFFFFF"
            fillOpacity="0.12"
            fontFamily="var(--font-display)"
            fontWeight="900"
            fontSize="190"
            letterSpacing="-0.03em"
          >
            WAADI MEDIA.COM
          </text>
        </svg>
      </div>
    </footer>
  );
}
