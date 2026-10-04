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
  const [isVisible, setIsVisible] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close menus on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setServicesOpen(false);
    setMobileMenuOpen(false);
  }

  // Scroll detection: hide on scroll down, return on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 90 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

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
    <>
      {/* Floating Pill Nav with 3px border and hard shadow */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 pt-3 transition-transform duration-200 ease-out',
          isVisible ? 'translate-y-0' : '-translate-y-28'
        )}
      >
        <div className="max-w-[1100px] mx-auto bg-paper border-[3px] border-ink shadow-hard-md rounded-full px-5 sm:px-7 py-2.5 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-sans font-bold text-ink">
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
                  'inline-flex items-center gap-1.5 py-1 hover:text-chinar transition-colors cursor-pointer',
                  (pathname.startsWith('/services') || servicesOpen) && 'text-chinar underline underline-offset-4 decoration-2'
                )}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    'w-4 h-4 transition-transform duration-150 stroke-[2.5]',
                    servicesOpen && 'rotate-180 text-chinar'
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-3 w-80 p-3 bg-paper border-[3px] border-ink rounded-[20px] shadow-hard-md z-50">
                  <div className="mb-2 px-3 py-1.5 border-b-2 border-ink flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-ink font-display font-black">
                      All Services
                    </span>
                    <Link
                      href="/services"
                      onClick={() => setServicesOpen(false)}
                      className="text-xs text-blue hover:underline font-bold"
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
                          className="block px-3 py-2 rounded-xl hover:bg-saffron transition-colors"
                        >
                          <span className="block text-sm font-bold text-ink">
                            {service.name}
                          </span>
                          <span className="block text-xs text-ink/75 truncate">
                            {service.shortLine}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Standard Nav Links */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'py-1 hover:text-chinar transition-colors',
                  pathname === link.href && 'text-chinar underline underline-offset-4 decoration-2'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Saffron CTA Button & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <Button
                href="/book-a-call"
                variant="saffron"
                className="h-[44px] px-6 text-sm"
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

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-full border-[3px] border-ink bg-saffron flex items-center justify-center text-ink shadow-hard-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-transform"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Sheet with giant Archivo links */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-paper flex flex-col justify-between p-6 sm:p-10 overflow-y-auto animate-in fade-in duration-150"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b-[3px] border-ink pb-4">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-12 h-12 rounded-full border-[3px] border-ink bg-chinar text-ink shadow-hard-sm flex items-center justify-center font-bold"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>
          </div>

          {/* Giant Archivo Navigation Links */}
          <nav className="my-auto py-8 flex flex-col space-y-3">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-4xl sm:text-5xl text-ink hover:text-chinar transition-colors"
            >
              Services
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl sm:text-5xl text-ink hover:text-chinar transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions: Call and WhatsApp */}
          <div className="border-t-[3px] border-ink pt-6 space-y-3">
            <Button
              href="/book-a-call"
              variant="saffron"
              className="w-full text-base"
              onClick={() => {
                setMobileMenuOpen(false);
                trackEvent({
                  name: 'cta_click',
                  params: { label: 'Book a free call', location: 'header_mobile_menu' },
                });
              }}
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
                className="h-[52px] rounded-full border-[3px] border-ink bg-sky text-ink font-bold flex items-center justify-center gap-2 shadow-hard-sm active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <Phone className="w-5 h-5 stroke-[2.5]" />
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
                className="h-[52px] rounded-full border-[3px] border-ink bg-mint text-ink font-bold flex items-center justify-center gap-2 shadow-hard-sm active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                <MessageSquare className="w-5 h-5 stroke-[2.5]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
