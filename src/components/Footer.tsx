'use client';
import React from 'react';
import { Star, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const colors = {
        teal: '#3F9AAE',
        lightTeal: '#79C9C5',
        beige: '#FFE2AF',
        red: '#F96E5B',
        darkTeal: '#2D6E7D'
    };

    return (
        <footer className="pt-24 pb-12 bg-white border-t-8 border-[#3F9AAE]">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 lg:col-span-1">
                        <div className="flex items-center space-x-2 mb-6">
                            <Image src="/logo.png" alt="Waadi Media Logo" width={40} height={40} className="object-contain" />
                            <span className="font-black text-2xl tracking-tight uppercase italic" style={{ color: colors.teal }}>Waadi</span>
                        </div>
                        <p className="font-medium text-slate-500 mb-6">
                            Creative and technology-focused growth agency built to help businesses scale with structure and clarity.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-sm tracking-widest mb-6" style={{ color: colors.red }}>Explore</h4>
                        <ul className="space-y-3 font-bold text-sm uppercase italic">
                            {['Services', 'Work', 'Method', 'About'].map(link => (
                                <li key={link}>
                                    <Link href={link === 'About' ? '/#about' : `/${link.toLowerCase()}`} passHref>
                                        <motion.div
                                            whileHover={{ x: 10, color: colors.red }}
                                            className="transition-colors block cursor-pointer"
                                        >
                                            {link}
                                        </motion.div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-sm tracking-widest mb-6" style={{ color: colors.red }}>Solutions</h4>
                        <ul className="space-y-3 font-bold text-sm uppercase italic">
                            {['Web Design', 'Automations', 'Strategy', 'Ads'].map(link => (
                                <li key={link}>
                                    <Link href="/services" passHref>
                                        <motion.div
                                            whileHover={{ x: 10, color: colors.red }}
                                            className="transition-colors block cursor-pointer"
                                        >
                                            {link}
                                        </motion.div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black uppercase text-sm tracking-widest mb-6" style={{ color: colors.red }}>Support</h4>
                        <ul className="space-y-3 font-bold text-sm uppercase italic">
                            <li>
                                <Link href="/lets-talk" passHref>
                                    <motion.div whileHover={{ x: 10, color: colors.red }} className="transition-colors block cursor-pointer">
                                        Contact
                                    </motion.div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" passHref>
                                    <motion.div whileHover={{ x: 10, color: colors.red }} className="transition-colors block cursor-pointer">
                                        Privacy
                                    </motion.div>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" passHref>
                                    <motion.div whileHover={{ x: 10, color: colors.red }} className="transition-colors block cursor-pointer">
                                        Terms
                                    </motion.div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4 md:mb-0">
                        © {new Date().getFullYear()} Waadi Media Agency — Built for the long term.
                    </p>
                    <div className="flex space-x-6 text-xs font-black uppercase tracking-tighter" style={{ color: colors.teal }}>
                        <motion.a href="https://www.instagram.com/waadi_media?igsh=dmQ3eXV2ejRuMWsx" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, color: colors.red }}>
                            Instagram
                        </motion.a>
                        <motion.a href="https://www.linkedin.com/in/shykh-furkan-1193b4249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, color: colors.red }}>
                            LinkedIn
                        </motion.a>
                        <motion.a href="https://x.com/shykh_furkan?s=21" target="_blank" rel="noopener noreferrer" whileHover={{ y: -2, color: colors.red }}>
                            Twitter
                        </motion.a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
