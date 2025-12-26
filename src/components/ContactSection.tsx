'use client';
import React from 'react';
import {
    User, Briefcase, Smartphone, Mail, Sparkles, Send,
    Phone, MapPin, Instagram, Linkedin, Twitter
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const ContactSection = () => {
    const colors = {
        teal: '#3F9AAE',
        lightTeal: '#79C9C5',
        beige: '#FFE2AF',
        red: '#F96E5B',
        darkTeal: '#2D6E7D'
    };

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    };

    const buttonHover: Variants = {
        hover: {
            y: -4,
            scale: 1.02,
            transition: { type: "spring" as const, stiffness: 400, damping: 10 }
        },
        tap: { scale: 0.95 }
    };

    return (
        <section id="contact" className="py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-20">
                    <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4" style={{ color: colors.teal }}>Get in Touch</h2>
                    <p className="text-xl font-bold uppercase tracking-widest" style={{ color: colors.red }}>Let&apos;s build something real together</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left side: Form */}
                    <motion.div
                        {...fadeInUp}
                        whileHover={{ rotate: -0.5 }}
                        className="bg-white p-8 md:p-12 rounded-[40px] border-4 border-[#3F9AAE] shadow-[12px_12px_0_0_#3F9AAE]"
                    >
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest mb-2">
                                        <User size={14} className="text-[#F96E5B]" />
                                        <span>Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Your Name"
                                        className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 transition-colors font-medium shadow-inner"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest mb-2">
                                        <Briefcase size={14} className="text-[#F96E5B]" />
                                        <span>What do you do?</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Hotel Owner, Brand Lead, etc."
                                        className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 transition-colors font-medium shadow-inner"
                                    />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest mb-2">
                                        <Smartphone size={14} className="text-[#F96E5B]" />
                                        <span>Contact Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        placeholder="+91 XXXXX XXXXX"
                                        className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 transition-colors font-medium shadow-inner"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest mb-2">
                                        <Mail size={14} className="text-[#F96E5B]" />
                                        <span>Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="hello@company.com"
                                        className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 transition-colors font-medium shadow-inner"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center space-x-2 text-sm font-black uppercase tracking-widest mb-2">
                                    <Sparkles size={14} className="text-[#F96E5B]" />
                                    <span>How can we help you?</span>
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us about your project goals..."
                                    className="w-full p-4 rounded-2xl border-2 border-slate-200 focus:border-[#3F9AAE] focus:outline-none bg-slate-50 transition-colors font-medium shadow-inner"
                                ></textarea>
                            </div>
                            <motion.button
                                variants={buttonHover}
                                whileHover="hover"
                                whileTap="tap"
                                className="w-full py-5 rounded-full bg-[#F96E5B] text-white font-black uppercase text-lg flex items-center justify-center space-x-2 shadow-[0_8px_0_0_#C75748]"
                            >
                                <span>Send Message</span>
                                <Send size={20} />
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Right side: Contact Info */}
                    <motion.div
                        {...fadeInUp}
                        transition={{ delay: 0.2 }}
                        className="space-y-10 py-4"
                    >
                        <div className="space-y-6">
                            <h3 className="text-3xl font-black uppercase italic" style={{ color: colors.teal }}>Contact Details</h3>
                            <p className="text-lg font-medium leading-relaxed">
                                Whether you&apos;re a local business or a growing brand, we&apos;re ready to engineer your digital foundation.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: <Mail />, title: "Email Us", val: "hello@waadimedia.com", color: colors.teal },
                                { icon: <Phone />, title: "Call Us", val: "+91 98765 43210", color: colors.red },
                                { icon: <MapPin />, title: "Office", val: "Srinagar, Kashmir", color: colors.lightTeal }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ x: 10, scale: 1.05 }}
                                    className="flex items-start space-x-6 group cursor-default"
                                >
                                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform" style={{ backgroundColor: item.color }}>
                                        {React.cloneElement(item.icon, { className: "text-white w-6 h-6" })}
                                    </div>
                                    <div>
                                        <h4 className="font-black uppercase text-sm tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-xl font-bold italic" style={{ color: colors.darkTeal }}>{item.val}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-8 border-t-4 border-[#3F9AAE] border-dashed">
                            <h4 className="font-black uppercase text-xs tracking-[0.3em] mb-4 opacity-60">Follow our journey</h4>
                            <div className="flex space-x-4">
                                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                                    <motion.a
                                        key={i}
                                        href="#"
                                        whileHover={{ scale: 1.2, rotate: i % 2 === 0 ? 15 : -15, backgroundColor: colors.teal, color: 'white' }}
                                        className="w-12 h-12 rounded-full border-2 border-[#3F9AAE] flex items-center justify-center transition-colors text-[#3F9AAE]"
                                    >
                                        <Icon size={20} />
                                    </motion.a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
