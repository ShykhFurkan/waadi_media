'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { servicesData } from '@/data/services';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on route change during render
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }

  // Monitor scroll for 24px threshold
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 24) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        isScrolled
          ? 'bg-paper/95 backdrop-blur-md border-b border-line shadow-floating py-3.5'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Logo */}
        <Logo />

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[15px] font-sans font-medium text-graphite">
          {/* Services dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setServicesOpen(false);
            }}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen(!servicesOpen)}
              className={cn(
                'inline-flex items-center gap-1 py-1 hover:text-ink transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue',
                (pathname.startsWith('/services') || servicesOpen) && 'text-blue'
              )}
            >
              <span>Services</span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 transition-transform duration-200 stroke-[1.5]',
                  servicesOpen && 'rotate-180 text-blue'
                )}
              />
            </button>

            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-80 p-3 bg-paper border border-line rounded-2xl shadow-floating z-50 animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <div className="mb-2 px-3 py-1.5 border-b border-line flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider text-mist font-semibold">
                    All 8 Services
                  </span>
                  <Link
                    href="/services"
                    onClick={() => setServicesOpen(false)}
                    className="text-xs text-blue hover:text-blue-deep font-medium"
                  >
                    Overview
                  </Link>
                </div>
                <ul className="space-y-1">
                  {servicesData.map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={`/services/${service.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="block px-3 py-2 rounded-xl hover:bg-snow transition-colors"
                      >
                        <span className="block text-sm font-medium text-ink">
                          {service.name}
                        </span>
                        <span className="block text-xs text-mist truncate">
                          {service.shortLine}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Standard desktop nav links */}
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'py-1 hover:text-ink transition-colors',
                pathname === link.href && 'text-blue'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: Desktop CTA button & Mobile hamburger */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <Button
              href="/book-a-call"
              variant="primary"
              magnetic
              onClick={() =>
                trackEvent({
                  name: 'cta_click',
                  params: { label: 'Book a free call', location: 'header_desktop' },
                })
              }
            >
              Book a free call
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-full border border-line bg-paper flex items-center justify-center text-ink hover:border-blue transition-colors focus-visible:outline-2 focus-visible:outline-blue"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 stroke-[1.5]" />
            ) : (
              <Menu className="w-6 h-6 stroke-[1.5]" />
            )}
          </button>
        </div>
      </div>


        {mobileMenuOpen && (
          <div
            className="fixed inset-0 top-[76px] bg-paper z-50 flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-wider text-mist font-semibold block">
                Navigation
              </span>
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/services"
                  className="text-h2 font-display text-ink hover:text-blue transition-colors"
                >
                  Services
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-h2 font-display text-ink hover:text-blue transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="border-t border-line pt-6">
                <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-3">
                  Services List
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {servicesData.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="text-sm text-graphite hover:text-blue py-1"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions for Mobile */}
            <div className="border-t border-line pt-6 mt-8 space-y-3">
              <Button
                href="/book-a-call"
                variant="primary"
                className="w-full"
                onClick={() =>
                  trackEvent({
                    name: 'cta_click',
                    params: { label: 'Book a free call', location: 'header_mobile_menu' },
                  })
                }
              >
                Book a free call
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${siteConfig.contact.tel}`}
                  onClick={() =>
                    trackEvent({
                      name: 'click_call',
                      params: { location: 'header_mobile_menu', phone: siteConfig.contact.tel },
                    })
                  }
                  className="h-12 rounded-full border border-line flex items-center justify-center gap-2 text-sm font-medium text-ink bg-snow hover:bg-paper transition-colors"
                >
                  <Phone className="w-4 h-4 stroke-[1.5] text-blue" />
                  <span>Call</span>
                </a>
                <a
                  href={siteConfig.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent({
                      name: 'click_whatsapp',
                      params: { location: 'header_mobile_menu' },
                    })
                  }
                  className="h-12 rounded-full border border-line flex items-center justify-center gap-2 text-sm font-semibold text-ink bg-[#25D366] hover:opacity-95 transition-opacity"
                >
                  <MessageSquare className="w-4 h-4 stroke-[1.5]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
    </header>
  );
}
