'use client';
import React from 'react';
import { motion } from 'framer-motion';

export const BrandLogos = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full relative py-6"
        >
            <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.25em] text-slate-400">
                    TRUSTED BY GROWING BRANDS IN KASHMIR & BEYOND
                </span>
            </div>

            {/* Logos Bar Container */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="rounded-3xl p-5 sm:p-7 bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center justify-items-center">
                        
                        {/* 1. Kehribal FC Kashmir */}
                        <div className="flex items-center space-x-2 text-slate-200 w-full justify-center lg:border-r border-slate-800 pr-2">
                            <svg className="w-8 h-8 fill-current shrink-0 text-blue-400" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" />
                                <circle cx="50" cy="50" r="36" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
                                <path d="M50 20 L60 40 L80 40 L65 52 L70 72 L50 60 L30 72 L35 52 L20 40 L40 40 Z" fill="currentColor" />
                            </svg>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="font-extrabold text-[11px] tracking-tight uppercase">KEHRIBAL FC</span>
                                <span className="text-[8px] font-bold tracking-widest text-slate-400 uppercase">KASHMIR</span>
                            </div>
                        </div>

                        {/* 2. Kaali Edge */}
                        <div className="flex items-center space-x-2 text-slate-200 w-full justify-center lg:border-r border-slate-800 pr-2">
                            <div className="w-7 h-7 rounded-md border-2 border-blue-400 text-blue-400 flex items-center justify-center font-black text-xs shrink-0">
                                K
                            </div>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="font-extrabold text-[10px] tracking-tight uppercase">KAALI EDGE</span>
                                <span className="text-[7px] font-bold tracking-widest text-slate-400 uppercase">CONSULTANCY</span>
                            </div>
                        </div>

                        {/* 3. Wonder Delight Travels */}
                        <div className="flex items-center space-x-2 text-slate-200 w-full justify-center lg:border-r border-slate-800 pr-2">
                            <svg className="w-7 h-7 fill-none stroke-current stroke-2 shrink-0 text-blue-400" viewBox="0 0 24 24">
                                <path d="M3 20L9 8L13 14L17 6L21 20H3Z" />
                            </svg>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="font-extrabold text-[10px] tracking-tight uppercase">WONDER DELIGHT</span>
                                <span className="text-[7px] font-bold tracking-widest text-slate-400 uppercase">TRAVELS</span>
                            </div>
                        </div>

                        {/* 4. Elite Group */}
                        <div className="flex items-center space-x-2 text-slate-200 w-full justify-center lg:border-r border-slate-800 pr-2">
                            <svg className="w-7 h-7 fill-none stroke-current stroke-2 shrink-0 text-blue-400" viewBox="0 0 24 24">
                                <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" />
                                <path d="M12 8V16M8 12H16" />
                            </svg>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="font-black text-xs tracking-tight uppercase">ELITE</span>
                                <span className="text-[7px] font-bold tracking-widest text-slate-400 uppercase">GROUP</span>
                            </div>
                        </div>

                        {/* 5. Xtate Properties */}
                        <div className="flex items-center space-x-2 text-slate-200 w-full justify-center lg:border-r border-slate-800 pr-2">
                            <svg className="w-7 h-7 fill-none stroke-current stroke-2 shrink-0 text-blue-400" viewBox="0 0 24 24">
                                <path d="M6 18L18 6M6 6L18 18" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="font-extrabold text-xs tracking-tight uppercase">XTATE</span>
                                <span className="text-[7px] font-bold tracking-widest text-slate-400 uppercase">PROPERTIES</span>
                            </div>
                        </div>

                        {/* 6. Best One ECC Construction */}
                        <div className="flex items-center space-x-2 text-slate-200 w-full justify-center">
                            <svg className="w-7 h-7 fill-none stroke-current stroke-2 shrink-0 text-blue-400" viewBox="0 0 24 24">
                                <path d="M3 10L12 3L21 10V20H3V10Z" />
                            </svg>
                            <div className="flex flex-col text-left leading-tight">
                                <span className="font-extrabold text-[9px] tracking-tight uppercase">BEST ONE ECC</span>
                                <span className="text-[7px] font-bold tracking-widest text-slate-400 uppercase">CONSTRUCTION</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </motion.div>
    );
};

export default BrandLogos;
