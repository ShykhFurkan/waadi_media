'use client';
import React, { useState } from 'react';
import {
    Send, User, Briefcase, Smartphone, Mail, MapPin,
    Globe, Zap, Palette, Star, Sparkles, Clock,
    CheckCircle2, ChevronRight, MessageSquare, ShieldCheck,
    Instagram, Search as LucideSearch, Users, Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LetsTalkPage = () => {
    const colors = {
        teal: '#3F9AAE',
        lightTeal: '#79C9C5',
        beige: '#FFE2AF',
        red: '#F96E5B',
        darkTeal: '#2D6E7D'
    };

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        location: '',
        businessName: '',
        businessType: '',
        yearsInOperation: '',
        goal: '',
        hasWebsite: '',
        websiteUrl: '',
        budget: '',
        startDate: '',
        requirement: '',
        source: '',
        prefMethod: '',
        prefTime: ''
    });

    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

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

    const handleHasWebsiteChange = (val: string) => {
        setFormData({ ...formData, hasWebsite: val });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        try {
            const res = await fetch('/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'lets-talk',
                    data: { ...formData, services: selectedServices }
                })
            });

            if (res.ok) {
                setStatus('success');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { type: "spring" as const, damping: 15, stiffness: 100 }
    };

    const servicesOptions = [
        "Website Design & Development", "Website Redesign", "E-commerce Website",
        "Internal Management Tools / Automations", "Content Creation (Photos & Videos)",
        "Social Media Management", "Brand Identity & Visual Design",
        "Digital Strategy & Planning", "Paid Advertising (Meta & Google Ads)",
        "SEO (On-page & Local SEO)", "Complete Digital Setup (End-to-End)",
        "Not sure (Need consultation)"
    ];

    if (status === 'success') {
        return (
            <div className="min-h-screen font-sans flex items-center justify-center" style={{ backgroundColor: colors.beige }}>
                <div className="bg-white p-12 rounded-[60px] border-4 border-[#3F9AAE] shadow-[16px_16px_0px_0px_#3F9AAE] max-w-2xl text-center space-y-6">
                    <div className="w-24 h-24 bg-[#3F9AAE] rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle2 className="text-white w-12 h-12" />
                    </div>
                    <h2 className="text-4xl font-black uppercase italic text-[#3F9AAE]">Request Received!</h2>
                    <p className="text-xl font-bold text-gray-600">
                        Thank you for sharing your details. We have received your inquiry and will review it meticulously.
                    </p>
                    <p className="text-lg text-gray-600">
                        expect a response within <span className="text-[#F96E5B] font-black">24 hours</span>.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/'}
                        className="px-8 py-4 rounded-full bg-[#F96E5B] text-white font-black uppercase text-lg inline-block"
                    >
                        Back to Home
                    </motion.button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen font-sans selection:bg-[#79C9C5]/30 text-[#2D6E7D]" style={{ backgroundColor: colors.beige }}>
            {/* Header / Intro */}
            <section className="pt-24 pb-12 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-[#F96E5B] bg-white mb-6 -rotate-2 shadow-sm">
                            <Sparkles size={16} className="text-[#F96E5B]" />
                            <span className="text-xs font-black uppercase tracking-widest text-[#F96E5B]">Start Your Growth Journey</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 text-[#3F9AAE]">
                            Let’s <span className="text-[#F96E5B]">Talk</span>
                        </h1>
                        <p className="text-xl font-bold italic opacity-70 max-w-2xl mx-auto">
                            We review every request personally and respond within 24 hours. Fill out the details below so we can prepare for our call.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        {...fadeInUp}
                        className="bg-white rounded-[60px] border-4 border-[#3F9AAE] shadow-[16px_16px_0px_0px_#3F9AAE] overflow-hidden"
                    >
                        <form className="p-8 md:p-16 space-y-16" onSubmit={handleSubmit}>

                            {/* Section 1: Basic Contact */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3F9AAE] text-white flex items-center justify-center font-black italic">01</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Basic Contact Information</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] flex items-center space-x-2">
                                            <User size={14} className="text-[#F96E5B]" /> <span>Full Name *</span>
                                        </label>
                                        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Your full name" required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] flex items-center space-x-2">
                                            <Smartphone size={14} className="text-[#F96E5B]" /> <span>Phone Number *</span>
                                        </label>
                                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 XXXXX XXXXX" required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner" />
                                        <p className="text-[10px] font-bold text-[#3F9AAE] opacity-70 italic tracking-tight">WhatsApp preferred. We'll contact you on this number.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] flex items-center space-x-2">
                                            <Mail size={14} className="text-[#F96E5B]" /> <span>Email Address *</span>
                                        </label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em] flex items-center space-x-2">
                                            <MapPin size={14} className="text-[#F96E5B]" /> <span>City / Location *</span>
                                        </label>
                                        <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Srinagar, Kashmir" required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner" />
                                    </div>
                                </div>
                            </div>

                            {/* Section 2: Business Info */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#F96E5B] text-white flex items-center justify-center font-black italic">02</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Business Information</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Business / Brand Name</label>
                                        <input type="text" name="businessName" value={formData.businessName} onChange={handleChange} placeholder="Your business or brand name" className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Type of Business *</label>
                                        <select name="businessType" value={formData.businessType} onChange={handleChange} required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium cursor-pointer">
                                            <option value="">Select Type</option>
                                            {["Hotel / Homestay", "Restaurant / Cafe", "Local Service Business", "Retail / Shop", "Startup", "Educational Institute", "Agency", "Personal Brand", "Other"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Years in Operation</label>
                                        <select name="yearsInOperation" value={formData.yearsInOperation} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium cursor-pointer">
                                            <option value="">Select Duration</option>
                                            {["Just starting", "Less than 1 year", "1–3 years", "3–5 years", "5+ years"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 3: Services Required */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#79C9C5] text-white flex items-center justify-center font-black italic">03</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Services Required</h3>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {servicesOptions.map((service, i) => (
                                        <motion.div
                                            key={i}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => toggleService(service)}
                                            className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start space-x-3 ${selectedServices.includes(service) ? 'bg-[#3F9AAE] border-[#3F9AAE] text-white shadow-lg' : 'bg-slate-50 border-slate-200 hover:border-[#3F9AAE]'}`}
                                        >
                                            <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center ${selectedServices.includes(service) ? 'bg-white border-white' : 'border-[#3F9AAE]/30'}`}>
                                                {selectedServices.includes(service) && <CheckCircle2 size={14} className="text-[#3F9AAE]" />}
                                            </div>
                                            <span className="text-xs font-bold uppercase leading-tight">{service}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 4: Project Understanding */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3F9AAE] text-white flex items-center justify-center font-black italic">04</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Project Understanding</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">What is your primary goal right now? *</label>
                                        <select required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium">
                                            <option value="">Select Primary Goal</option>
                                            {["Get more customers/leads", "Build a professional online presence", "Improve brand image", "Automate operations / save time", "Increase bookings/sales", "Launch a new business or brand", "Not sure yet"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Do you already have a website? *</label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Yes", "No", "Yes, but it needs improvement"].map((opt) => (
                                                <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                                                    <input
                                                        type="radio"
                                                        name="hasWebsite"
                                                        className="w-5 h-5 accent-[#F96E5B] cursor-pointer"
                                                        onChange={() => handleHasWebsiteChange(opt)}
                                                    />
                                                    <span className="text-sm font-bold uppercase group-hover:text-[#F96E5B]">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {(formData.hasWebsite === 'Yes' || formData.hasWebsite === 'Yes, but it needs improvement') && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="space-y-2 overflow-hidden"
                                            >
                                                <label className="text-xs font-black uppercase tracking-[0.2em]">Current Website URL</label>
                                                <input type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange} placeholder="https://" className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* Section 5: Budget & Timeline */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#F96E5B] text-white flex items-center justify-center font-black italic">05</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Budget & Timeline</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Estimated Budget Range</label>
                                        <select name="budget" value={formData.budget} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium">
                                            <option value="">Select Budget</option>
                                            {["Under ₹20,000", "₹20,000 – ₹50,000", "₹50,000 – ₹1,00,000", "₹1,00,000 – ₹2,00,000", "₹2,00,000+", "Not sure (Need guidance)"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">When do you want to start? *</label>
                                        <select name="startDate" value={formData.startDate} onChange={handleChange} required className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium">
                                            <option value="">Select Start Date</option>
                                            {["Immediately", "Within 1–2 weeks", "Within a month", "Just exploring right now"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 6: Additional Details */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#79C9C5] text-white flex items-center justify-center font-black italic">06</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Additional Details</h3>
                                </div>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Describe your requirement</label>
                                        <textarea name="requirement" value={formData.requirement} onChange={handleChange} rows={4} placeholder="Tell us about your business, challenges, or what you want to achieve" className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium shadow-inner"></textarea>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">How did you hear about us?</label>
                                        <select name="source" value={formData.source} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium">
                                            <option value="">Select Option</option>
                                            {["Instagram", "Google", "Referral", "Friend", "Other"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Section 7: Call Preference */}
                            <div className="space-y-8">
                                <div className="flex items-center space-x-4 border-b-4 border-dotted border-[#FFE2AF] pb-4">
                                    <div className="w-10 h-10 rounded-full bg-[#3F9AAE] text-white flex items-center justify-center font-black italic">07</div>
                                    <h3 className="text-2xl font-black uppercase italic text-[#3F9AAE]">Call Preference</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Preferred Contact Method</label>
                                        <div className="flex flex-wrap gap-4">
                                            {["Phone Call", "WhatsApp", "Email"].map((opt) => (
                                                <label key={opt} className="flex items-center space-x-2 cursor-pointer group">
                                                    <input type="radio" value={opt} onChange={handleChange} name="prefMethod" className="w-5 h-5 accent-[#3F9AAE] cursor-pointer" />
                                                    <span className="text-sm font-bold uppercase group-hover:text-[#3F9AAE]">{opt}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-[0.2em]">Preferred Time to Contact</label>
                                        <select name="prefTime" value={formData.prefTime} onChange={handleChange} className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 font-medium">
                                            <option value="">Select Time</option>
                                            {["Morning (9–12)", "Afternoon (12–4)", "Evening (4–8)"].map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submission */}
                            <div className="pt-12 text-center space-y-6">
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -4 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-6 rounded-full bg-[#F96E5B] text-white font-black uppercase text-xl italic shadow-[0_12px_0_0_#C75748] flex items-center justify-center space-x-4"
                                >
                                    <span>Request a Consultation</span>
                                    <ChevronRight size={24} />
                                </motion.button>
                                <div className="flex flex-col items-center justify-center space-y-2 text-xs font-bold uppercase opacity-60 tracking-widest">
                                    <div className="flex items-center space-x-2">
                                        <ShieldCheck size={14} className="text-[#3F9AAE]" />
                                        <span>We review every request personally and respond within 24 hours.</span>
                                    </div>
                                    {status === 'error' && <span className="text-red-500 text-sm">Action failed. Please try again.</span>}
                                    {status === 'submitting' && <span className="text-[#3F9AAE] text-sm">Sending...</span>}
                                </div>
                            </div>

                        </form>
                    </motion.div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="pb-24 px-6">
                <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-12 opacity-30 grayscale">
                    <div className="flex items-center space-x-2">
                        <Star className="fill-current" /> <span className="font-black uppercase italic text-sm">Trust First</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Heart className="fill-current" /> <span className="font-black uppercase italic text-sm">Customer Focus</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <CheckCircle2 className="fill-current" /> <span className="font-black uppercase italic text-sm">Proven Systems</span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LetsTalkPage;
