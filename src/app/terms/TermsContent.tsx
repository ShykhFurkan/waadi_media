'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TermsContent = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <div className="max-w-4xl mx-auto space-y-8">

                <Link href="/" className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:underline">
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-6"
                >
                    <div className="flex items-center space-x-3">
                        <Scale size={28} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal Documentation</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Terms of <span className="text-blue-600 dark:text-blue-500">Service</span>
                    </h1>

                    <div className="ui-card p-8 sm:p-10 rounded-3xl space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Agreement to Terms</h2>
                            <p>
                                These Terms of Service constitute a binding agreement between you and Waadi Media regarding your access to waadimedia.com and our client services.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Intellectual Property Rights</h2>
                            <p>
                                All proprietary source code, software logic, designs, custom components, and visual assets developed by Waadi Media remain protected under Indian copyright framework until contract transfer.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. Governing Law</h2>
                            <p>
                                These terms shall be governed by the laws of India. Any legal disputes arising from agency services shall be submitted exclusively to courts located in Jammu & Kashmir, India.
                            </p>
                        </div>
                    </div>

                    <div className="text-center text-xs font-semibold text-slate-400">
                        Last Updated: 2026 • Waadi Media Srinagar, Kashmir
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default TermsContent;
