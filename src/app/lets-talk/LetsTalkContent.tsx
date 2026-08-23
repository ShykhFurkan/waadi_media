'use client';
import React, { useState } from 'react';
import { CheckCircle2, ArrowUpRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const LetsTalkPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        location: '',
        businessName: '',
        businessType: '',
        requirement: ''
    });

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const servicesOptions = [
        "Web Applications",
        "E-Commerce Platform",
        "Business Automations & AI",
        "Video & Drone Content",
        "Social Media Management",
        "Performance Ads",
        "Brand Identity"
    ];

    const toggleService = (service: string) => {
        if (selectedServices.includes(service)) {
            setSelectedServices(selectedServices.filter(s => s !== service));
        } else {
            setSelectedServices([...selectedServices, service]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'lets-talk',
                    data: { ...formData, services: selectedServices }
                })
            });
            setStatus('success');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error(error);
            setStatus('success');
        }
    };

    if (status === 'success') {
        return (
            <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 flex items-center justify-center p-6 transition-colors">
                <div className="ui-card rounded-3xl p-10 max-w-lg text-center space-y-5">
                    <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mx-auto flex items-center justify-center">
                        <CheckCircle2 size={32} />
                    </div>
                    <h2 className="text-2xl font-bold">Consultation Request Received!</h2>
                    <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                        Thank you, <span className="text-blue-600 font-bold">{formData.fullName}</span>. Our team in Srinagar is reviewing your project details and will connect via WhatsApp/Phone within 24 hours.
                    </p>
                    <Link href="/" passHref>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase"
                        >
                            Back To Home
                        </motion.div>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <div className="max-w-3xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center space-y-3">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        <span>Book Consultation</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Let&apos;s <span className="text-blue-600 dark:text-blue-500">Talk</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        We review every request personally and respond within 24 hours.
                    </p>
                </div>

                {/* Main Form */}
                <div className="ui-card rounded-3xl p-6 sm:p-10">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Contact details */}
                        <div className="space-y-3">
                            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                01. Contact Information
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Full Name *"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                                />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Phone / WhatsApp *"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Email Address *"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                                />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="City / Location (e.g., Srinagar)"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Business Info */}
                        <div className="space-y-3">
                            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                02. Business Details
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <input
                                    type="text"
                                    name="businessName"
                                    value={formData.businessName}
                                    onChange={handleChange}
                                    placeholder="Business / Brand Name"
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                                />
                                <select
                                    name="businessType"
                                    value={formData.businessType}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#090D16] border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                                >
                                    <option value="">Select Business Type</option>
                                    <option value="Hotel / Homestay">Hotel / Resort / Homestay</option>
                                    <option value="Cafe / Restaurant">Cafe / Restaurant</option>
                                    <option value="Retail Outlet">Retail Store</option>
                                    <option value="Startup">Startup</option>
                                    <option value="Services Enterprise">Service Provider</option>
                                </select>
                            </div>
                        </div>

                        {/* Services selection */}
                        <div className="space-y-3">
                            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                03. Required Services
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {servicesOptions.map((service) => {
                                    const selected = selectedServices.includes(service);
                                    return (
                                        <div
                                            key={service}
                                            onClick={() => toggleService(service)}
                                            className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-between cursor-pointer transition-all ${
                                                selected
                                                    ? 'bg-blue-600 text-white font-bold'
                                                    : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10'
                                            }`}
                                        >
                                            <span>{service}</span>
                                            <span>{selected ? '✓' : '+'}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Overview */}
                        <div className="space-y-3">
                            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                                04. Project Description
                            </div>
                            <textarea
                                rows={4}
                                name="requirement"
                                value={formData.requirement}
                                onChange={handleChange}
                                required
                                placeholder="Describe your main goals, current bottlenecks, or target timeline... *"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white text-xs focus:border-blue-500 focus:outline-none"
                            ></textarea>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={status === 'submitting'}
                            type="submit"
                            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
                        >
                            <span>{status === 'submitting' ? 'Submitting...' : 'Request Consultation'}</span>
                            <ArrowUpRight size={16} />
                        </motion.button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default LetsTalkPage;
