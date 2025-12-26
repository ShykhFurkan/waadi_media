'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Scale, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const TermsContent = () => {
    return (
        <div className="min-h-screen bg-[#FFE2AF] text-[#2D6E7D] font-sans selection:bg-[#F96E5B]/30">
            <div className="max-w-4xl mx-auto px-6 py-32">

                <Link href="/" className="inline-flex items-center space-x-2 text-sm font-black uppercase tracking-widest text-[#F96E5B] hover:-translate-x-1 transition-transform mb-12">
                    <ArrowLeft size={16} />
                    <span>Back to Home</span>
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="flex items-center space-x-3 mb-6">
                        <Scale size={32} className="text-[#3F9AAE]" />
                        <span className="text-xs font-black uppercase tracking-widest opacity-60">Legal Documentation</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-[#3F9AAE] mb-12">
                        Terms of <span className="text-[#F96E5B]">Service</span>
                    </h1>

                    <div className="bg-white p-10 md:p-14 rounded-[40px] border-4 border-[#3F9AAE] shadow-[12px_12px_0_0_#3F9AAE] space-y-8">
                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">1. Agreement to Terms</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Waadi Media ("we," "us" or "our"), concerning your access to and use of the waadimedia.com website.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">2. Intellectual Property Rights</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">3. User Representations</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                By using the Site, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">4. Prohibited Activities</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">5. Governing Law</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                These Terms shall be governed by and defined following the laws of India. Waadi Media and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-xs font-bold uppercase tracking-widest opacity-40">Last Updated: December 2025</p>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default TermsContent;
