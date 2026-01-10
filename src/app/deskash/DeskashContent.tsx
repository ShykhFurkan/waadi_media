'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, BarChart3, Lock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import ContactSection from '@/components/ContactSection';

const DeskashContent = () => {
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: [] as string[]
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleCheckboxChange = (value: string) => {
        setFormData(prev => {
            if (prev.role.includes(value)) {
                return { ...prev, role: prev.role.filter(r => r !== value) };
            } else {
                return { ...prev, role: [...prev.role, value] };
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'deskash-early-access', data: formData })
            });

            if (res.ok) {
                setStatus('success');
                // Optional: Reset form or keep it as success state
            } else {
                setStatus('idle'); // or error state if you want to handle it
                alert('Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Submission error:', error);
            setStatus('idle');
            alert('Something went wrong. Please try again.');
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { type: "spring" as const, stiffness: 50, damping: 20 }
    };

    return (
        <div className="min-h-screen font-sans text-slate-800 bg-slate-50 selection:bg-[#3F9AAE]/30">

            {/* Hero */}
            <section className="pt-32 pb-12 md:pt-40 md:pb-20 px-6 bg-[#2D6E7D] text-white overflow-hidden relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3F9AAE] rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-[#79C9C5] bg-[#79C9C5]/10 mb-8 backdrop-blur-sm">
                            <Zap size={16} className="text-[#FFE2AF] fill-current" />
                            <span className="text-xs font-bold uppercase tracking-widest text-[#79C9C5]">Coming Soon</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                            Introducing <span className="text-[#FFE2AF]">Deskash</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-medium opacity-80 max-w-2xl mx-auto leading-relaxed">
                            A reliable, all-in-one operating system for modern hotels. <br />
                            Built for simplicity. Engineered to scale.
                        </p>
                    </motion.div>
                </div>
            </section>



            {/* Early Access Form */}
            <section className="py-12 md:py-20 px-4 md:px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeInUp} className="bg-[#2D6E7D] text-white rounded-[30px] md:rounded-[40px] p-6 md:p-16 relative overflow-hidden shadow-2xl">
                        {/* Decor */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#F96E5B] to-[#3F9AAE]"></div>

                        {status === 'success' ? (
                            <div className="py-12">
                                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#2D6E7D] mx-auto mb-6">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-3xl font-black italic mb-4">You're on the list!</h3>
                                <p className="opacity-80">We'll be in touch soon with access to version 0.0.1.1.</p>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic mb-6">Test Version 0.0.1.1</h2>
                                <p className="text-lg opacity-80 mb-10 max-w-lg mx-auto">
                                    Be among the first to experience the future of hotel management software.
                                    Fill the form below and we will contact you soon.
                                </p>

                                <form onSubmit={handleSubmit} className="text-left space-y-4 max-w-md mx-auto">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:bg-white/20 transition-all"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:bg-white/20 transition-all"
                                            placeholder="name@company.com"
                                        />
                                    </div>

                                    <div className="pt-2">
                                        <label className="block text-xs font-bold uppercase tracking-widest opacity-70 mb-3">I am a...</label>
                                        <div className="flex flex-col sm:flex-row gap-4">
                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div
                                                    onClick={() => handleCheckboxChange('tester')}
                                                    className={`w-5 h-5 rounded border border-white/40 flex items-center justify-center transition-colors ${formData.role.includes('tester') ? 'bg-[#F96E5B] border-[#F96E5B]' : 'bg-transparent'}`}
                                                >
                                                    {formData.role.includes('tester') && <CheckCircle2 size={14} />}
                                                </div>
                                                <span className="font-medium group-hover:text-[#F96E5B] transition-colors">Tester</span>
                                            </label>

                                            <label className="flex items-center space-x-2 cursor-pointer group">
                                                <div
                                                    onClick={() => handleCheckboxChange('owner')}
                                                    className={`w-5 h-5 rounded border border-white/40 flex items-center justify-center transition-colors ${formData.role.includes('owner') ? 'bg-[#F96E5B] border-[#F96E5B]' : 'bg-transparent'}`}
                                                >
                                                    {formData.role.includes('owner') && <CheckCircle2 size={14} />}
                                                </div>
                                                <span className="font-medium group-hover:text-[#F96E5B] transition-colors">Hotel Owner</span>
                                            </label>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={status === 'submitting'}
                                        className="w-full mt-6 bg-[#F96E5B] hover:bg-white hover:text-[#2D6E7D] text-white font-black uppercase tracking-widest py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                                    >
                                        {status === 'submitting' ? 'Sending...' : 'Request Access'}
                                        {!status && <ArrowRight size={18} />}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            </section>

            <ContactSection />
        </div>
    );
};

export default DeskashContent;
