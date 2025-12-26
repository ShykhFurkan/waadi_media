'use client';
import React, { useState, useEffect } from 'react';
import {
    Code,
    Settings,
    Video,
    Share2,
    Compass,
    BarChart3,
    ChevronRight,
    Sparkles,
    Heart,
    Star,
    Globe,
    Zap,
    Palette,
    User,
    Briefcase,
    Smartphone,
    Mail,
    Send,
    Phone,
    MapPin,
    Instagram,
    Linkedin,
    Twitter,
    ArrowRight
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import ContactSection from '@/components/ContactSection';
import Link from 'next/link';

const HomePageContent = () => {
    // Colors based on your palette
    const colors = {
        teal: '#3F9AAE',
        lightTeal: '#79C9C5',
        beige: '#FFE2AF',
        red: '#F96E5B',
        darkTeal: '#2D6E7D'
    };

    const services = [
        {
            title: "Website Design",
            description: "High-performance websites built to act as operational tools, not just digital brochures.",
            icon: <Code className="w-8 h-8" />,
            color: colors.teal
        },
        {
            title: "Automations",
            description: "Internal and external workflows that reduce friction and improve overall business efficiency.",
            icon: <Settings className="w-8 h-8" />,
            color: colors.red
        },
        {
            title: "Content Creation",
            description: "Strategic videos and photography designed to communicate value, trust, and professionalism.",
            icon: <Video className="w-8 h-8" />,
            color: colors.lightTeal
        },
        {
            title: "Social Media",
            description: "Sustained brand authority through structured calendars and platform-specific strategy.",
            icon: <Share2 className="w-8 h-8" />,
            color: colors.teal
        },
        {
            title: "Strategy",
            description: "Deep alignment of brand messaging, audience definition, and digital growth roadmaps.",
            icon: <Compass className="w-8 h-8" />,
            color: colors.red
        },
        {
            title: "Advertising",
            description: "Data-driven Meta and Google campaigns treated as investments with measurable results.",
            icon: <BarChart3 className="w-8 h-8" />,
            color: colors.lightTeal
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { type: "spring" as const, damping: 12, stiffness: 100 }
    };

    const cardHover3D: Variants = {
        initial: { scale: 1, rotateX: 0, rotateY: 0, rotateZ: 0 },
        hover: (i) => ({
            scale: 1.05,
            rotateZ: (i as number) % 2 === 0 ? 2 : -2,
            y: -10,
            transition: { type: "spring" as const, stiffness: 300, damping: 15 }
        })
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
        <div className="min-h-screen font-sans selection:bg-[#79C9C5]/30 text-[#2D6E7D]" style={{ backgroundColor: colors.beige }}>

            {/* Hero Section */}
            <section className="relative min-h-screen flex flex-col items-center justify-center pt-40 px-6 pb-20 overflow-hidden text-center hero-grid-texture">
                {/* Decorative Circles */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#3F9AAE]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F96E5B]/10 rounded-full blur-3xl"></div>

                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>

                    {/* Tagline Badge */}
                    <motion.div
                        whileHover={{ rotate: -2, scale: 1.05 }}
                        className="inline-flex items-center space-x-2 px-6 py-2 rounded-full border-2 border-[#F96E5B] bg-white mb-10 shadow-[4px_4px_0px_0px_#F96E5B] cursor-default"
                    >
                        <Sparkles size={18} className="text-[#F96E5B] fill-current" />
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-[#F96E5B]">Serious Growth Systems</span>
                    </motion.div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase italic tracking-tighter leading-[0.9] mb-8 text-[#3F9AAE] drop-shadow-sm">
                        Creative + Tech <br />
                        <span className="text-[#F96E5B]">For Growing Brands</span> <br />
                        Of Kashmir
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl font-bold italic opacity-80 max-w-2xl mx-auto leading-relaxed mb-12">
                        We don't just "post" on social media. <br className="hidden md:block" />
                        We build <span className="underline decoration-[#F96E5B] decoration-4">digital assets</span> and <span className="underline decoration-[#3F9AAE] decoration-4">systems</span> for businesses ready to scale.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <motion.a
                            href="/services"
                            variants={buttonHover} whileHover="hover" whileTap="tap"
                            className="px-8 py-4 bg-[#3F9AAE] text-white rounded-full font-black uppercase tracking-widest text-sm shadow-[0_10px_20px_rgba(63,154,174,0.3)] flex items-center space-x-2"
                        >
                            <span>Explore Services</span>
                            <ChevronRight size={18} />
                        </motion.a>
                        <motion.a
                            href="/lets-talk"
                            variants={buttonHover} whileHover="hover" whileTap="tap"
                            className="px-8 py-4 bg-white text-[#2D6E7D] border-2 border-[#2D6E7D] rounded-full font-black uppercase tracking-widest text-sm shadow-sm hover:bg-slate-50"
                        >
                            Book Consultation
                        </motion.a>
                    </div>

                </motion.div>
            </section>

            {/* About Snapshot */}
            <section className="py-24 px-6 bg-white border-y-8 border-[#2D6E7D]">
                <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-center">

                    <motion.div {...fadeInUp} className="relative">
                        <div className="absolute inset-0 bg-[#FFE2AF] rounded-[60px] rotate-3 border-4 border-[#2D6E7D]"></div>
                        <div className="relative bg-[#3F9AAE] p-12 rounded-[60px] border-4 border-[#2D6E7D] text-white shadow-2xl">
                            <Star size={64} className="mb-6 fill-current text-[#FFE2AF]" />
                            <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-4 leading-none">
                                More than <br /> just visuals.
                            </h3>
                            <p className="font-medium text-lg opacity-90 leading-relaxed">
                                Waadi Media bridges the gap between creative branding and hard-nosed business logic. We understand that a pretty website is useless if it doesn’t sell.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div {...fadeInUp} className="space-y-8">
                        <div>
                            <h4 className="text-[#F96E5B] font-black uppercase tracking-widest text-sm mb-2">Our Philosophy</h4>
                            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-[#2D6E7D] mb-6">Built for <br /> ROI.</h2>
                            <p className="text-xl font-bold italic opacity-70 leading-relaxed mb-6">
                                "We stop the guessing game. Every design choice, every post, and every line of code is backed by strategy."
                            </p>
                            <a href="/method" className="text-[#3F9AAE] font-black uppercase tracking-widest text-sm border-b-4 border-[#3F9AAE] pb-1 hover:text-[#F96E5B] hover:border-[#F96E5B] transition-colors">
                                Read our method
                            </a>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { l: "10+", t: "Projects" },
                                { l: "4.9", t: "Client Rating" }
                            ].map((stat, i) => (
                                <div key={i} className="p-4 rounded-2xl bg-[#FFE2AF]/30 border-2 border-[#FFE2AF] text-center">
                                    <div className="text-3xl font-black italic text-[#2D6E7D]">{stat.l}</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest opacity-60">{stat.t}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* Services Overview */}
            <section className="py-24 px-6 text-center">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-6 text-[#3F9AAE]">Everything You Need <br /> To <span className="text-[#F96E5B]">Grow</span></h2>
                        <p className="text-xl font-bold text-[#2D6E7D]/60 uppercase tracking-widest max-w-2xl mx-auto">
                            A full-stack growth partner for modern businesses.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <Link href="/services" key={i} passHref className="block h-full">
                                <motion.div
                                    custom={i}
                                    variants={cardHover3D}
                                    initial="initial"
                                    whileHover="hover"
                                    className="group bg-white p-8 rounded-[40px] border-4 border-[#2D6E7D] shadow-[8px_8px_0px_0px_#2D6E7D] hover:shadow-[12px_12px_0px_0px_#F96E5B] hover:border-[#F96E5B] transition-all relative overflow-hidden text-left h-full"
                                >
                                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                                        {React.cloneElement(service.icon as React.ReactElement<any>, { size: 100, color: service.color })}
                                    </div>

                                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-md" style={{ backgroundColor: service.color }}>
                                        {service.icon}
                                    </div>

                                    <h3 className="text-2xl font-black uppercase italic mb-3 text-[#2D6E7D]">{service.title}</h3>
                                    <p className="font-bold text-sm opacity-60 leading-relaxed mb-6">
                                        {service.description}
                                    </p>

                                    <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: service.color }}>
                                        <span>Learn More</span>
                                        <ChevronRight size={12} />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-16">
                        <a href="/services" className="inline-block px-10 py-4 rounded-full border-4 border-[#2D6E7D] font-black uppercase tracking-widest hover:bg-[#2D6E7D] hover:text-white transition-colors">
                            View All Services
                        </a>
                    </div>
                </div>
            </section>

            {/* Featured Work (Teaser) */}
            <section className="py-24 px-6 bg-[#2D6E7D] text-white overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <h2 className="text-6xl font-black uppercase italic mb-2 tracking-tighter">Recent <span className="text-[#FFE2AF]">Work</span></h2>
                            <p className="font-bold opacity-60 uppercase tracking-widest text-sm">Real Results. No Fluff.</p>
                        </div>
                        <a href="/work" className="flex items-center space-x-2 font-black uppercase tracking-widest text-sm hover:text-[#FFE2AF] transition-colors">
                            <span>View Portfolio</span>
                            <ArrowRight size={16} />
                        </a>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            { t: "Kaaliedge", c: "Business Website", d: "End-to-end design for credibility." },
                            { t: "BiteZ", c: "POS System", d: "Operational tool for restaurants." }
                        ].map((project, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -10 }}
                                className="group relative h-80 rounded-[50px] bg-white text-[#2D6E7D] p-10 flex flex-col justify-between overflow-hidden border-4 border-transparent hover:border-[#F96E5B]"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFE2AF] rounded-full blur-3xl opacity-20 translate-x-1/2 -translate-y-1/2 group-hover:bg-[#F96E5B] transition-colors"></div>

                                <div className="relative z-10">
                                    <span className="inline-block px-3 py-1 rounded-full border border-[#2D6E7D]/20 text-[10px] font-black uppercase tracking-widest mb-4">{project.c}</span>
                                    <h3 className="text-5xl font-black uppercase italic tracking-tighter">{project.t}</h3>
                                </div>

                                <div className="relative z-10 flex justify-between items-end">
                                    <p className="font-bold max-w-xs opacity-70 italic">{project.d}</p>
                                    <div className="w-12 h-12 rounded-full bg-[#2D6E7D] text-white flex items-center justify-center group-hover:bg-[#F96E5B] transition-colors">
                                        <ArrowRight size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="mb-12">
                        <Heart size={48} className="mx-auto text-[#F96E5B] fill-current mb-6 animate-pulse" />
                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#2D6E7D] mb-8">
                            "They actually understood <br /> our business."
                        </h2>
                    </div>

                    <div className="bg-white p-10 rounded-[40px] border-4 border-[#2D6E7D] shadow-lg relative">
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#FFE2AF] px-6 py-2 rounded-full font-black uppercase tracking-widest text-xs border-2 border-[#2D6E7D]">
                            Client Feedback
                        </div>
                        <p className="text-xl font-medium italic opacity-80 leading-relaxed mb-6">
                            "Most agencies just wanted to sell us posts. Waadi Media built us a system that actually brings in leads. The clarity they brought to our operations was a game changer."
                        </p>
                        <div>
                            <h4 className="font-black uppercase text-[#3F9AAE]">Local Hotel Brand</h4>
                            <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Srinagar, Kashmir</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shared Contact Section */}
            <ContactSection />

        </div>
    );
};

export default HomePageContent;
