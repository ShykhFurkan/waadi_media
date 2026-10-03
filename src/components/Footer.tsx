import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageSquare, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-blue-500/40 bg-white p-0.5 shadow-lg shadow-blue-500/20 transition-transform group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Waadi Media Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Waadi<span className="text-blue-500">Media</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
              Waadi Media is a software, web development & digital brand management agency based in Anantnag, Kashmir. Founded by Furkan Mushtaq to elevate local businesses and global startups with custom software & AI pipelines.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="https://wa.me/917780940317?text=Hi%20Waadi%20Media,%20I'd%20like%20to%20inquire%20about%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600/20 px-4 py-2.5 min-h-[44px] text-xs font-semibold text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600/30 transition-colors active:scale-95"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </a>
              <a
                href="tel:+917780940317"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600/20 px-4 py-2.5 min-h-[44px] text-xs font-semibold text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors active:scale-95"
              >
                <Phone className="h-4 w-4" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Services</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/services/web-development" className="hover:text-blue-400 transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services/software-development" className="hover:text-blue-400 transition-colors">
                  Custom Software
                </Link>
              </li>
              <li>
                <Link href="/services/ai-automation" className="hover:text-blue-400 transition-colors">
                  AI Automation & Hiring
                </Link>
              </li>
              <li>
                <Link href="/services/social-media-management" className="hover:text-blue-400 transition-colors">
                  Social Media Growth
                </Link>
              </li>
              <li>
                <Link href="/services/brand-management" className="hover:text-blue-400 transition-colors">
                  Brand Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-blue-400 transition-colors">
                  About Founder
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
                  Case Studies & Work
                </Link>
              </li>
              <li>
                <Link href="/anantnag-kashmir" className="hover:text-blue-400 transition-colors">
                  Anantnag & Kashmir SEO
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-blue-400 transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">Contact Info</h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Anantnag, Jammu & Kashmir, 192101, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="tel:+917780940317" className="hover:text-white transition-colors">
                  +91 7780940317
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-blue-400 shrink-0" />
                <a href="mailto:contact@waadimedia.com" className="hover:text-white transition-colors">
                  contact@waadimedia.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} Waadi Media. All rights reserved. Led by Furkan Mushtaq.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-slate-400">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400 flex items-center gap-1">
              <span>Sitemap</span>
              <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
