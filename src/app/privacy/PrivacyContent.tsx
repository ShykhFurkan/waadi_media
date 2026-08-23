'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PrivacyContent = () => {
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
                        <ShieldCheck size={28} className="text-blue-600 dark:text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Legal Documentation</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Privacy <span className="text-blue-600 dark:text-blue-500">Policy</span>
                    </h1>

                    <div className="ui-card p-8 sm:p-10 rounded-3xl space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Introduction</h2>
                            <p>
                                Waadi Media (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This policy outlines how we handle data collected on waadimedia.com and through our digital platforms.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Data We Collect</h2>
                            <p className="mb-2">
                                We may collect contact and business information provided directly through project brief forms, WhatsApp inquiries, or newsletter signups:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-slate-500 dark:text-slate-400 text-xs">
                                <li><strong>Identity & Contact Data:</strong> Name, business role, email address, WhatsApp/phone number.</li>
                                <li><strong>Project & Technical Data:</strong> Business name, current website URL, budget ranges, IP address.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">3. How We Use Data</h2>
                            <p>
                                Personal information is strictly used to evaluate project requests, provide customized quotes, deliver software services, and maintain client communication. We never sell or share client data with third parties.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">4. Contact Information</h2>
                            <p>
                                For privacy inquiries, contact our team at: <br />
                                <span className="text-blue-600 dark:text-blue-400 font-bold">hello@waadimedia.com</span>
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

export default PrivacyContent;
