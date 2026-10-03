"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const servicesList = [
    { name: "Web Development", href: "/services/web-development" },
    { name: "Custom Software", href: "/services/software-development" },
    { name: "AI Automation & Hiring", href: "/services/ai-automation" },
    { name: "Social Media Management", href: "/services/social-media-management" },
    { name: "Brand Management", href: "/services/brand-management" },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Kashmir SEO", href: "/anantnag-kashmir" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Backdrop overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/30 backdrop-blur-[3px] z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
        <div
          className={`mx-auto max-w-6xl pointer-events-auto transition-all duration-300 ${
            isOpen
              ? "apple-liquid-glass rounded-[32px] p-5 shadow-2xl"
              : scrolled
              ? "apple-liquid-glass-scrolled rounded-full py-2.5 px-5"
              : "apple-liquid-glass rounded-full py-3 px-6"
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/70 bg-white/50 backdrop-blur-md p-0.5 shadow-sm transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Waadi Media Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-extrabold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  Waadi<span className="text-blue-600">Media</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden items-center gap-1 md:flex apple-liquid-track p-1.5 rounded-full">
              <Link
                href="/"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  pathname === "/"
                    ? "apple-liquid-active text-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Home
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href="/services"
                  className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    pathname.startsWith("/services")
                      ? "apple-liquid-active text-blue-600"
                      : "text-slate-700 hover:text-slate-900 hover:bg-white/40"
                  }`}
                >
                  Services
                  <ChevronDown
                    className={`h-3 w-3 transition-transform ${
                      servicesOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full pt-3 w-64"
                    >
                      <div className="rounded-2xl border border-white/60 bg-white/60 backdrop-blur-2xl backdrop-saturate-150 p-2 shadow-2xl shadow-slate-900/15">
                        {servicesList.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            className="block rounded-xl px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-white/60 hover:text-blue-600 transition-colors"
                          >
                            {service.name}
                          </Link>
                        ))}
                        <div className="my-1 border-t border-white/40" />
                        <Link
                          href="/services"
                          className="block rounded-xl px-3.5 py-1.5 text-xs font-bold text-blue-600 hover:bg-white/60 transition-colors"
                        >
                          Explore All Services &rarr;
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/about"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  pathname === "/about"
                    ? "apple-liquid-active text-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                About
              </Link>

              <Link
                href="/portfolio"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  pathname === "/portfolio"
                    ? "apple-liquid-active text-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Portfolio
              </Link>

              <Link
                href="/anantnag-kashmir"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  pathname === "/anantnag-kashmir"
                    ? "apple-liquid-active text-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Kashmir SEO
              </Link>

              <Link
                href="/blog"
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  pathname === "/blog"
                    ? "apple-liquid-active text-blue-600"
                    : "text-slate-700 hover:text-slate-900 hover:bg-white/40"
                }`}
              >
                Blog
              </Link>
            </nav>

            {/* CTA Pill Button */}
            <div className="hidden items-center gap-3 md:flex">
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/90 hover:bg-slate-900 px-5 py-2 text-xs font-bold text-white shadow-lg shadow-slate-900/15 border border-white/20 active:scale-95 transition-all backdrop-blur-md"
              >
                <span>Start Project</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle with 44x44px Touch Target */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`rounded-full min-h-[44px] min-w-[44px] flex items-center justify-center md:hidden active:scale-95 transition-all ${
                isOpen
                  ? "bg-slate-900/10 text-slate-900 border border-white/60 shadow-inner"
                  : "text-slate-800 hover:bg-white/40"
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu Drawer Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="mt-4 overflow-y-auto max-h-[calc(85vh-90px)] no-scrollbar border-t border-white/30 pt-4 pb-2 md:hidden"
              >
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`rounded-2xl px-4 min-h-[44px] flex items-center justify-between text-sm font-semibold transition-all ${
                        pathname === link.href
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                          : "text-slate-800 hover:bg-white/40 active:bg-white/60"
                      }`}
                    >
                      <span>{link.name}</span>
                      {pathname === link.href && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white shadow-sm" />
                      )}
                    </Link>
                  ))}

                  <div className="pt-3 pb-1 text-[11px] font-bold text-slate-500 uppercase tracking-wider px-4">
                    Services
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    {servicesList.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setIsOpen(false)}
                        className={`rounded-xl px-4 min-h-[40px] flex items-center text-xs font-medium transition-all ${
                          pathname === service.href
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-slate-700 hover:bg-white/40 hover:text-blue-600 active:bg-white/60"
                        }`}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>

                  <div className="pt-3">
                    <Link
                      href="/contact"
                      onClick={() => setIsOpen(false)}
                      className="flex w-full min-h-[48px] items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 active:scale-[0.98] transition-all"
                    >
                      <span>Start a Project</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </div>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}
