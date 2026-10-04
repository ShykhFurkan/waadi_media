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

  // Scroll detection: slim navbar, hide on scroll down, show on scroll up
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide when scrolling down past 80px, return when scrolling up
      if (currentScrollY > 90 && currentScrollY > lastScrollY && !mobileMenuOpen) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
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
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
          isVisible ? 'translate-y-0' : '-translate-y-full',
          isScrolled
            ? 'bg-paper/95 backdrop-blur-md border-b border-line shadow-sm py-3'
            : 'bg-transparent py-4 border-b border-transparent'
        )}
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 text-[15px] font-sans font-medium text-graphite">
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
                  'inline-flex items-center gap-1.5 py-1 hover:text-ink transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-blue',
                  (pathname.startsWith('/services') || servicesOpen) && 'text-blue'
                )}
              >
                <span>Services</span>
                <ChevronDown
                  className={cn(
                    'w-3.5 h-3.5 transition-transform duration-200 stroke-[1.5]',
                    servicesOpen && 'rotate-180 text-blue'
                  )}
                />
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 p-3 bg-paper border border-line rounded-2xl shadow-floating z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="mb-2 px-3 py-1.5 border-b border-line flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-mist font-semibold">
                      All Services
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
                          className="block px-3 py-2 rounded-xl hover:bg-pearl transition-colors"
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

            {/* Standard Nav Links */}
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

          {/* Right Action & Mobile Toggle */}
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

            {/* Mobile Hamburger */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-11 h-11 rounded-full border border-line bg-paper flex items-center justify-center text-ink hover:border-blue transition-colors focus-visible:outline-2 focus-visible:outline-blue"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu with large Cormorant links and staggered reveal */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Navigation Menu"
          className="fixed inset-0 z-50 bg-paper flex flex-col justify-between p-6 sm:p-12 overflow-y-auto animate-in fade-in duration-200"
        >
          {/* Top Bar inside Menu */}
          <div className="flex items-center justify-between border-b border-line pb-4">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full border border-line bg-snow flex items-center justify-center text-ink hover:border-blue transition-colors"
            >
              <X className="w-5 h-5 stroke-[1.5]" />
            </button>
          </div>

          {/* Staggered Editorial Links */}
          <nav className="my-auto py-8 flex flex-col space-y-4">
            <div
              className="animate-in fade-in slide-in-from-bottom-3 duration-300"
              style={{ animationDelay: '0ms' }}
            >
              <Link
                href="/services"
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl sm:text-5xl text-ink hover:text-blue transition-colors tracking-tight block"
              >
                Services
              </Link>
            </div>

            {navLinks.map((link, idx) => (
              <div
                key={link.href}
                className="animate-in fade-in slide-in-from-bottom-3 duration-300"
                style={{ animationDelay: `${(idx + 1) * 60}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-display text-4xl sm:text-5xl text-ink hover:text-blue transition-colors tracking-tight block"
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-line pt-6 space-y-4">
            <Button
              href="/book-a-call"
              variant="primary"
              className="w-full"
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
                className="h-12 rounded-full border border-line flex items-center justify-center gap-2 text-sm font-medium text-ink bg-[#25D366]/15 hover:bg-[#25D366]/25 transition-colors"
              >
                <MessageSquare className="w-4 h-4 stroke-[1.5] text-[#25D366]" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
