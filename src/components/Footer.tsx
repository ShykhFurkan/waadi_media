'use client';
import React from 'react';
import { ArrowUpRight, Instagram, Linkedin, Twitter, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-slate-900 dark:bg-[#02050E] text-slate-300 pt-20 pb-12 border-t border-slate-800 dark:border-white/10 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Big Banner */}
                <div className="ui-card rounded-3xl p-8 sm:p-12 mb-16 border border-slate-800 dark:border-white/10 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 text-white">
                    <div className="max-w-2xl space-y-4">
                        <span className="px-3 py-1 rounded-full bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            Accepting New Projects
                        </span>
                        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                            Ready to scale your <span className="text-blue-500">digital presence?</span>
                        </h2>
                        <p className="text-slate-400 text-sm sm:text-base">
                            Partner with Kashmir&apos;s leading website, mobile app, software development & social media agency.
                        </p>
                        <div className="pt-2">
                            <Link href="/lets-talk" passHref>
                                <motion.div
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center space-x-2 px-6 py-3 rounded-full text-xs font-bold uppercase text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 cursor-pointer"
                                >
                                    <span>Start a Project</span>
                                    <ArrowUpRight size={16} />
                                </motion.div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Main Columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
                    
                    {/* Brand */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" passHref className="flex items-center space-x-1.5 cursor-pointer">
                            <span className="font-extrabold text-2xl tracking-tight text-blue-500">
                                waadi
                            </span>
                            <span className="font-bold text-2xl tracking-tight text-white">
                                media.com
                            </span>
                        </Link>
                        <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                            Kashmir website, mobile app, software development & social media agency. Engineering Next.js web applications, automated workflows, and high-conversion ad campaigns.
                        </p>
                        <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <MapPin size={14} className="text-blue-400" />
                            <span>Srinagar, Jammu & Kashmir, India</span>
                        </div>
                    </div>

                    {/* Service Vertical SEO Links */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Core Capabilities</h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
                            <li><Link href="/services/web-development" className="hover:text-blue-400 transition-colors">Web Development</Link></li>
                            <li><Link href="/services/software-development" className="hover:text-blue-400 transition-colors">Software & Mobile Apps</Link></li>
                            <li><Link href="/services/social-media-marketing" className="hover:text-blue-400 transition-colors">Social Media Marketing</Link></li>
                            <li><Link href="/services/branding" className="hover:text-blue-400 transition-colors">Branding & Identity</Link></li>
                            <li><Link href="/services/automation-ai" className="hover:text-blue-400 transition-colors">Automations & AI</Link></li>
                            <li><Link href="/services/digital-marketing" className="hover:text-blue-400 transition-colors">Digital Ads & Funnels</Link></li>
                            <li><Link href="/services/seo-services" className="hover:text-blue-400 transition-colors">SEO Services</Link></li>
                        </ul>
                    </div>

                    {/* Locations & Case Studies */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Locations & Work</h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
                            <li><Link href="/locations/kashmir" className="hover:text-blue-400 transition-colors">Kashmir Agency</Link></li>
                            <li><Link href="/locations/srinagar" className="hover:text-blue-400 transition-colors">Srinagar Software Hub</Link></li>
                            <li><Link href="/locations/srinagar-digital-agency" className="hover:text-blue-400 transition-colors">Srinagar Digital Agency</Link></li>
                            <li><Link href="/work/kehribal-fc" className="hover:text-blue-400 transition-colors">Kehribal FC</Link></li>
                            <li><Link href="/work/wonder-delight" className="hover:text-blue-400 transition-colors">Wonder Delight</Link></li>
                            <li><Link href="/work/kaali-edge" className="hover:text-blue-400 transition-colors">Kaali Edge</Link></li>
                        </ul>
                    </div>

                    {/* Company & Insights */}
                    <div>
                        <h4 className="font-bold text-xs uppercase tracking-wider text-white mb-4">Company & Resources</h4>
                        <ul className="space-y-2.5 text-xs font-semibold text-slate-400">
                            <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Waadi Media</Link></li>
                            <li><Link href="/insights" className="hover:text-blue-400 transition-colors">Insights & Articles</Link></li>
                            <li><Link href="/method" className="hover:text-blue-400 transition-colors">Agency Method</Link></li>
                            <li><Link href="/lets-talk" className="hover:text-blue-400 transition-colors">Book Consultation</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom copyright */}
                <div className="pt-8 border-t border-slate-800 dark:border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
                    <p>© {new Date().getFullYear()} Waadi Media. All rights reserved. Srinagar, Kashmir, India.</p>
                    <div className="flex items-center space-x-6 text-slate-400">
                        <a href="https://www.instagram.com/waadi_media" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
                            <Instagram size={14} /> <span>Instagram</span>
                        </a>
                        <a href="https://www.linkedin.com/in/shykh-furkan-1193b4249" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
                            <Linkedin size={14} /> <span>LinkedIn</span>
                        </a>
                        <a href="https://x.com/shykh_furkan" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center space-x-1">
                            <Twitter size={14} /> <span>Twitter</span>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
