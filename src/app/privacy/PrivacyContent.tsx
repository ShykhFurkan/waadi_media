'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PrivacyContent = () => {
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
                        <ShieldCheck size={32} className="text-[#3F9AAE]" />
                        <span className="text-xs font-black uppercase tracking-widest opacity-60">Legal Documentation</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-[#3F9AAE] mb-12">
                        Privacy <span className="text-[#F96E5B]">Policy</span>
                    </h1>

                    <div className="bg-white p-10 md:p-14 rounded-[40px] border-4 border-[#3F9AAE] shadow-[12px_12px_0_0_#3F9AAE] space-y-8">
                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">1. Introduction</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                Waadi Media ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (waadimedia.com) and tell you about your privacy rights.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">2. Data We Collect</h2>
                            <p className="font-medium leading-relaxed opacity-80 mb-4">
                                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 font-medium opacity-80">
                                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">3. How We Use Your Data</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data to perform the contract we are about to enter into or have entered into with you, and where it is necessary for our legitimate interests.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">4. Data Security</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-black uppercase italic mb-4 text-[#2D6E7D]">5. Contact Us</h2>
                            <p className="font-medium leading-relaxed opacity-80">
                                If you have any questions about this privacy policy or our privacy practices, please contact us at: <br />
                                <strong className="text-[#F96E5B]">hello@waadimedia.com</strong>
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

export default PrivacyContent;
