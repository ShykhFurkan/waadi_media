'use client';
import React, { useState } from 'react';
import { User, Smartphone, Mail, MapPin, Send, CheckCircle2, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        phone: '',
        email: '',
        message: '',
        budget: '₹50k - ₹1.5L',
        selectedServices: [] as string[]
    });

    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const availableServices = [
        'Web Applications',
        'Business Automations',
        'Media & Drone Production',
        'Social Media Management',
        'Performance Ads',
        'Brand Identity'
    ];

    const budgetRanges = [
        '₹25k - ₹50k',
        '₹50k - ₹1.5L',
        '₹1.5L - ₹3L',
        '₹3L+'
    ];

    const toggleService = (service: string) => {
        if (formData.selectedServices.includes(service)) {
            setFormData({
                ...formData,
                selectedServices: formData.selectedServices.filter(s => s !== service)
            });
        } else {
            setFormData({
                ...formData,
                selectedServices: [...formData.selectedServices, service]
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'contact', data: formData })
            });
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('success');
        }
    };

    return (
        <section id="contact" className="py-24 px-4 sm:px-6 relative overflow-hidden bg-slate-100 dark:bg-[#030712] border-t border-slate-200 dark:border-white/10 transition-colors">
            <div className="max-w-6xl mx-auto relative z-10 space-y-12">
                
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-3">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Sparkles size={14} />
                        <span>Start A Project</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Let&apos;s Build <span className="text-blue-600 dark:text-blue-500">Together</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        Tell us about your brand and goals. Our strategic team in Srinagar responds within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Left Form */}
                    <div className="lg:col-span-7 ui-card rounded-3xl p-6 sm:p-10">
                        {status === 'success' ? (
                            <div className="py-12 text-center space-y-4">
                                <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 mx-auto flex items-center justify-center">
                                    <CheckCircle2 size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Inquiry Received!</h3>
                                <p className="text-slate-600 dark:text-slate-300 text-sm">
                                    Thank you, <span className="text-blue-600 font-bold">{formData.name || 'there'}</span>. We will review your project details and get back to you shortly.
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="px-6 py-2.5 rounded-full bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white font-bold text-xs uppercase"
                                >
                                    Submit Another Request
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                
                                {/* Services selection */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        1. Required Services
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {availableServices.map((service) => {
                                            const selected = formData.selectedServices.includes(service);
                                            return (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    onClick={() => toggleService(service)}
                                                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                        selected
                                                            ? 'bg-blue-600 text-white font-bold shadow-sm'
                                                            : 'bg-slate-200/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/10'
                                                    }`}
                                                >
                                                    {selected ? '✓ ' : '+ '}{service}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Budget selection */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                                        2. Estimated Budget Range
                                    </label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                        {budgetRanges.map((b) => (
                                            <button
                                                key={b}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, budget: b })}
                                                className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                                                    formData.budget === b
                                                        ? 'bg-blue-600 text-white shadow-sm'
                                                        : 'bg-slate-200/80 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/10'
                                                }`}
                                            >
                                                {b}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Inputs */}
                                <div className="space-y-3">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your Full Name *"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-xs"
                                        />
                                        <input
                                            type="text"
                                            name="role"
                                            value={formData.role}
                                            onChange={handleChange}
                                            placeholder="Business / Role (e.g. Hotel Owner)"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="Phone / WhatsApp *"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-xs"
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Email Address *"
                                            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-xs"
                                        />
                                    </div>

                                    <textarea
                                        rows={4}
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tell us about your brand and project goals... *"
                                        className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-blue-500 focus:outline-none text-slate-900 dark:text-white text-xs"
                                    ></textarea>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={status === 'submitting'}
                                    className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-md shadow-blue-500/20"
                                >
                                    <span>{status === 'submitting' ? 'Submitting...' : 'Submit Project Brief'}</span>
                                    <Send size={14} />
                                </motion.button>
                            </form>
                        )}
                    </div>

                    {/* Right Info */}
                    <div className="lg:col-span-5 space-y-4">
                        <div className="ui-card rounded-3xl p-6 sm:p-8 space-y-5">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                                Contact Details
                            </h3>

                            <div className="space-y-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                                <div className="flex items-center space-x-3">
                                    <Mail size={16} className="text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Email</div>
                                        <div className="font-bold text-slate-900 dark:text-white">hello@waadimedia.com</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <Smartphone size={16} className="text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">WhatsApp / Call</div>
                                        <div className="font-bold text-slate-900 dark:text-white">+91 98765 43210</div>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <MapPin size={16} className="text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                                        <div className="font-bold text-slate-900 dark:text-white">Srinagar, Jammu & Kashmir</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* WhatsApp CTA */}
                        <div className="ui-card rounded-3xl p-6 border border-emerald-500/30 bg-emerald-50/50 dark:bg-emerald-950/20 flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <MessageSquare size={20} className="text-emerald-600 dark:text-emerald-400" />
                                <div>
                                    <h4 className="text-slate-900 dark:text-white font-bold text-xs">Quick WhatsApp Chat</h4>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400">Get direct answers from our team</p>
                                </div>
                            </div>
                            <a
                                href="https://wa.me/919876543210?text=Hi%20Waadi%20Media,%20I'm%20interested%20in%20a%20project"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition-colors"
                            >
                                Chat
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ContactSection;
