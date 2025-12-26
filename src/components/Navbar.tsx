'use client';
import React, { useState, useEffect } from 'react';
import { Menu, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const colors = {
        teal: '#3F9AAE',
        lightTeal: '#79C9C5',
        beige: '#FFE2AF',
        red: '#F96E5B',
        darkTeal: '#2D6E7D'
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const buttonHover = {
        hover: {
            y: -4,
            scale: 1.02,
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <>
            <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-4' : 'py-8'}`}>
                <div className="max-w-5xl mx-auto px-6">
                    <div className="bg-white/80 backdrop-blur-md rounded-full px-6 py-3 flex justify-between items-center border-4 border-[#3F9AAE] shadow-[8px_8px_0px_0px_rgba(63,154,174,0.2)]">
                        <Link href="/" passHref>
                            <motion.div
                                whileHover={{ rotate: -5, scale: 1.1 }}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <Image src="/logo.png" alt="Waadi Media Logo" width={32} height={32} className="object-contain" priority />
                                <span className="font-black text-xl tracking-tight uppercase italic" style={{ color: colors.teal }}>Waadi</span>
                            </motion.div>
                        </Link>

                        <div className="hidden md:flex space-x-8 text-sm font-bold uppercase tracking-wider">
                            <Link href="/services" passHref>
                                <motion.div
                                    whileHover={{ color: colors.red, y: -2 }}
                                    className="transition-colors cursor-pointer"
                                >
                                    Services
                                </motion.div>
                            </Link>
                            <Link href="/work" passHref>
                                <motion.div
                                    whileHover={{ color: colors.red, y: -2 }}
                                    className="transition-colors cursor-pointer"
                                >
                                    Work
                                </motion.div>
                            </Link>
                            <Link href="/method" passHref>
                                <motion.div
                                    whileHover={{ color: colors.red, y: -2 }}
                                    className="transition-colors cursor-pointer"
                                >
                                    Method
                                </motion.div>
                            </Link>

                        </div>

                        <Link href="/lets-talk" passHref>
                            <motion.button
                                variants={buttonHover}
                                whileHover="hover"
                                whileTap="tap"
                                className="hidden md:block px-6 py-2 rounded-full font-bold text-sm uppercase text-white shadow-sm"
                                style={{ backgroundColor: colors.red }}
                            >
                                Let&apos;s Talk
                            </motion.button>
                        </Link>

                        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </nav >

            {/* Mobile Menu */}
            <AnimatePresence>
                {
                    isMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 z-40 bg-[#FFE2AF] flex flex-col items-center justify-center p-6"
                        >
                            <div className="flex flex-col space-y-8 text-center">
                                <Link href="/services" passHref>
                                    <motion.div
                                        onClick={() => setIsMenuOpen(false)}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-4xl font-black uppercase italic cursor-pointer"
                                        style={{ color: colors.teal }}
                                    >
                                        Services
                                    </motion.div>
                                </Link>
                                <Link href="/work" passHref>
                                    <motion.div
                                        onClick={() => setIsMenuOpen(false)}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-4xl font-black uppercase italic cursor-pointer"
                                        style={{ color: colors.teal }}
                                    >
                                        Work
                                    </motion.div>
                                </Link>
                                <Link href="/method" passHref>
                                    <motion.div
                                        onClick={() => setIsMenuOpen(false)}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-4xl font-black uppercase italic cursor-pointer"
                                        style={{ color: colors.teal }}
                                    >
                                        Method
                                    </motion.div>
                                </Link>

                                <Link href="/lets-talk" passHref>
                                    <motion.button
                                        onClick={() => setIsMenuOpen(false)}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-10 py-4 rounded-full font-black text-xl uppercase text-white shadow-xl"
                                        style={{ backgroundColor: colors.red }}
                                    >
                                        Let&apos;s Talk
                                    </motion.button>
                                </Link>
                            </div>
                            <button className="absolute top-10 right-10 p-4" onClick={() => setIsMenuOpen(false)}>
                                <X size={40} />
                            </button>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
};

export default Navbar;
