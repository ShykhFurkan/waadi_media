'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { Ridgeline } from '@/components/illustrations/Ridgeline';
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
    <footer className="w-full bg-paper border-t border-line relative mt-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-20 pb-12">
        {/* Main 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-4">
            <Logo />
            <p className="text-body text-graphite font-normal max-w-xs">
              {siteConfig.tagline}
            </p>
            <p className="text-xs text-mist">
              {siteConfig.location.city}, {siteConfig.location.state}, {siteConfig.location.country}
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-graphite">
              {servicesData.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-blue transition-colors block py-0.5"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-graphite">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-blue transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-ink uppercase tracking-wider mb-4">
              Contact
            </h3>
            <p className="text-sm text-graphite">
              Have an idea or enquiry? Speak directly with our team.
            </p>
            <div className="space-y-1.5">
              <a
                href={`tel:${siteConfig.contact.tel}`}
                onClick={() =>
                  trackEvent({
                    name: 'click_call',
                    params: { location: 'footer', phone: siteConfig.contact.tel },
                  })
                }
                className="block text-sm font-medium text-ink hover:text-blue transition-colors"
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
                className="block text-sm font-medium text-ink hover:text-blue transition-colors"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <p className="text-xs text-mist">
              {siteConfig.contact.businessHours}
            </p>
          </div>
        </div>

        {/* Local Landing Pages Row */}
        <div className="border-t border-line py-6 flex flex-wrap items-center justify-between gap-4 text-xs text-mist">
          <span className="font-medium text-graphite">Locations:</span>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {localLinks.map((loc) => (
              <Link
                key={loc.href}
                href={loc.href}
                className="hover:text-blue transition-colors"
              >
                {loc.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="border-t border-line pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mist mb-12">
          <p>
            © {siteConfig.foundedYear} {siteConfig.name}. Made with care in Anantnag, Kashmir.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      {/* Ridgeline above the cropped wordmark */}
      <div className="w-full overflow-hidden">
        <Ridgeline variant="footer" />
      </div>

      {/* Giant cropped "waadi media.com" wordmark at the bottom */}
      <div className="w-full overflow-hidden select-none pointer-events-none -mb-3 sm:-mb-6 md:-mb-8" aria-hidden="true">
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
            fill="#EDF1F7"
            fontFamily="var(--font-display)"
            fontWeight="500"
            fontSize="190"
            letterSpacing="-0.04em"
          >
            waadi media.com
          </text>
        </svg>
      </div>
    </footer>
  );
}
