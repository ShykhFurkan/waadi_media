'use client';
import React, { useState, useEffect } from 'react';
import {
    ChevronDown,
    Menu,
    X,
    Sun,
    Moon,
    Code,
    Cpu,
    Share2,
    Repeat,
    Zap,
    Search,
    ArrowUpRight,
    BookOpen,
    Building2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
    const pathname = usePathname();
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const serviceCategories = [
        {
            title: "Web & App Engineering",
            desc: "Next.js platforms & mobile apps",
            href: "/services/web-development",
            icon: <Code size={16} className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Software & SaaS",
            desc: "Custom POS & Enterprise Applications",
            href: "/services/software-development",
            icon: <Cpu size={16} className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Social Media Growth",
            desc: "4K Reels, YouTube & Instagram",
            href: "/services/social-media-marketing",
            icon: <Share2 size={16} className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "Automations & AI",
            desc: "WhatsApp API & CRM workflows",
            href: "/services/automation-ai",
            icon: <Repeat size={16} className="text-blue-600 dark:text-blue-400" />
        },
        {
            title: "SEO & Digital Ads",
            desc: "Google Maps & Meta campaigns",
            href: "/services/seo-services",
            icon: <Search size={16} className="text-blue-600 dark:text-blue-400" />
        }
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled
                    ? 'bg-white/80 dark:bg-[#030712]/85 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 py-3.5 shadow-sm'
                    : 'bg-transparent py-5'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">

                    {/* BRAND LOGO */}
                    <Link href="/" passHref className="flex items-center space-x-2 group cursor-pointer">
                        <div className="flex items-center">
                            <span className="font-extrabold text-2xl tracking-tight text-blue-600 dark:text-blue-500">
                                waadi
                            </span>
                            <span className="font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
                                media.com
                            </span>
                        </div>
                    </Link>

                    {/* DESKTOP NAV LINKS */}
                    <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">

                        <Link href="/sports" className="px-3 py-2 text-xs font-bold text-[#E8A33D] hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5">
                            <span>Waadi Sports</span>
                            <span className="px-1.5 py-0.5 text-[9px] font-mono rounded-full bg-[#D62828] text-white font-bold">TV</span>
                        </Link>

                        {/* Services Dropdown Trigger */}
                        <div
                            className="relative"
                            onMouseEnter={() => setServicesDropdownOpen(true)}
                            onMouseLeave={() => setServicesDropdownOpen(false)}
                        >
                            <button
                                className="flex items-center space-x-1 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                            >
                                <span>Services</span>
                                <ChevronDown size={14} className={`transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            <AnimatePresence>
                                {servicesDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-full left-0 w-72 mt-1 py-2 bg-white dark:bg-[#0B0F19] rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden"
                                    >
                                        <div className="px-3 py-1.5 border-b border-slate-100 dark:border-white/5">
                                            <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Core Capabilities</span>
                                        </div>

                                        <div className="py-1">
                                            {serviceCategories.map((item, i) => (
                                                <Link
                                                    key={i}
                                                    href={item.href}
                                                    onClick={() => setServicesDropdownOpen(false)}
                                                    className="flex items-start space-x-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                                >
                                                    <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 mt-0.5">
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                                            {item.desc}
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>

                                        <div className="p-2 bg-slate-50 dark:bg-white/5 border-t border-slate-100 dark:border-white/5">
                                            <Link
                                                href="/services"
                                                onClick={() => setServicesDropdownOpen(false)}
                                                className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center justify-between px-2 py-1 hover:underline cursor-pointer"
                                            >
                                                <span>View All Services</span>
                                                <ArrowUpRight size={12} />
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/work" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Work
                        </Link>

                        <Link href="/insights" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Insights
                        </Link>

                        <Link href="/method" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            Method
                        </Link>

                        <Link href="/about" className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                            About
                        </Link>

                    </nav>

                    {/* RIGHT CONTROLS */}
                    <div className="hidden md:flex items-center space-x-3">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Light/Dark Theme"
                            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                            {theme === 'dark' ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-slate-700" />}
                        </button>

                        <Link href="/lets-talk" passHref>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-1.5 cursor-pointer transition-all"
                            >
                                <span>Let&apos;s Talk</span>
                                <ArrowUpRight size={14} />
                            </motion.div>
                        </Link>
                    </div>

                    {/* MOBILE HAMBURGER BUTTON */}
                    <div className="flex md:hidden items-center space-x-2">
                        <button
                            onClick={toggleTheme}
                            aria-label="Toggle Light/Dark Theme"
                            className="p-2 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200"
                        >
                            {theme === 'dark' ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-slate-700" />}
                        </button>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-slate-900 dark:text-white"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* MOBILE MENU overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-[#090D16] border-b border-slate-200 dark:border-white/10 px-6 py-6 space-y-4 shadow-xl"
                    >
                        <div className="flex flex-col space-y-3 font-bold text-sm text-slate-900 dark:text-white">
                            <Link 
                                href="/sports" 
                                onClick={() => setMobileMenuOpen(false)} 
                                className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[#E8A33D] font-bold hover:bg-amber-500/20 transition-all mb-1"
                            >
                                <span className="flex items-center gap-2">
                                    <span>Waadi Sports</span>
                                </span>
                                <span className="px-2 py-0.5 text-[10px] font-mono font-extrabold rounded-full bg-[#D62828] text-white shadow-sm">
                                    TV LIVE
                                </span>
                            </Link>
                            <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Services</Link>
                            {serviceCategories.map((item, index) => (
                                <Link 
                                    key={index} 
                                    href={item.href} 
                                    onClick={() => setMobileMenuOpen(false)} 
                                    className="pl-3 text-xs font-medium text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    → {item.title}
                                </Link>
                            ))}
                            <Link href="/work" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Work</Link>
                            <Link href="/insights" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Insights</Link>
                            <Link href="/method" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Method</Link>
                            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About Us</Link>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                            <Link href="/lets-talk" onClick={() => setMobileMenuOpen(false)}>
                                <button className="w-full py-3 rounded-full bg-blue-600 text-white font-bold text-xs uppercase shadow-md">
                                    Let&apos;s Talk ↗
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
