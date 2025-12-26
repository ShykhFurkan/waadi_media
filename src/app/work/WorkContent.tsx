'use client';
import React from 'react';
import {
    ExternalLink,
    CheckCircle2,
    Clock,
    Smartphone,
    Globe,
    Layout,
    Settings,
    Utensils,
    Building2,
    Database,
    Star,
    Sparkles,
    ArrowRight,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const OurWorkPage = () => {
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
        transition: { type: "spring" as const, damping: 15, stiffness: 100 }
    };

    const projects = [
        {
            id: 1,
            title: "Kaaliedge",
            type: "Business Website",
            status: "Completed",
            icon: <Globe size={40} />,
            color: colors.teal,
            about: "Required a professional digital presence to communicate credibility and brand intent. Built for authority, not just decoration.",
            highlights: ["End-to-end design & development", "Trust-focused layout", "SEO-ready structure"],
            outcome: "Positioned as a serious and reliable brand online."
        },
        {
            id: 2,
            title: "BiteZ",
            type: "Restaurant POS System",
            status: "Completed",
            icon: <Smartphone size={40} />,
            color: colors.red,
            about: "A tailored Point of Sale system for restaurant operations. Focused on speed and accuracy without unnecessary complexity.",
            highlights: ["Custom POS interface", "Order & billing flow", "Menu & pricing logic"],
            outcome: "Improved daily workflow and reduced manual errors."
        },
        {
            id: 3,
            title: "Hotel Concepts",
            type: "Demo / Concept Websites",
            status: "Completed",
            icon: <Building2 size={40} />,
            color: colors.lightTeal,
            about: "Showcase of modern functionality for local hotels and homestays in Kashmir. Built for travelers and booking efficiency.",
            highlights: ["UX-first booking structure", "Strong visual storytelling", "Mobile-friendly design"],
            outcome: "Three demo sites used for client education and onboarding."
        },
        {
            id: 4,
            title: "Restaurant Demo",
            type: "Dummy Project",
            status: "Completed",
            icon: <Utensils size={40} />,
            color: colors.teal,
            about: "Demonstrated effective presentation of menus and ambience. Focused on visual appeal without overdesign.",
            highlights: ["Ambience-focused homepage", "Categorized menu structure", "Mobile-first approach"],
            outcome: "Helps clients visualize their brand personality online."
        },
        {
            id: 5,
            title: "Consultancy CRM",
            type: "Custom Internal Tool",
            status: "Ongoing",
            icon: <Database size={40} />,
            color: colors.red,
            about: "A centralized system to manage clients, leads, and internal workflows. Actively scaling core logic and data handling.",
            highlights: ["Lead management dashboard", "Status tracking logic", "Scalable data structure"],
            outcome: "Expected to simplify operations and improve long-term visibility."
        }
    ];

    return (
        <div className="min-h-screen font-sans selection:bg-[#79C9C5]/30 text-[#2D6E7D]" style={{ backgroundColor: colors.beige }}>

            {/* Header Section */}
            <section className="pt-32 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2 border-[#F96E5B] bg-white mb-8 -rotate-2 shadow-sm">
                            <Star size={16} className="text-[#F96E5B] fill-current" />
                            <span className="text-xs font-black uppercase tracking-widest text-[#F96E5B]">Proven Digital Systems</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 text-[#3F9AAE]">
                            Our <span className="text-[#F96E5B]">Work</span>
                        </h1>
                        <p className="text-xl md:text-2xl font-bold italic opacity-80 max-w-3xl mx-auto leading-relaxed">
                            Real projects, real systems, and practical solutions built for <span className="underline decoration-[#F96E5B] decoration-4">growing businesses.</span>
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="pb-24 px-6">
                <div className="max-w-6xl mx-auto space-y-12">
                    {projects.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            {...fadeInUp}
                            whileHover={{ scale: 1.01 }}
                            className="bg-white rounded-[60px] border-4 border-[#3F9AAE] shadow-[16px_16px_0px_0px_#3F9AAE] overflow-hidden group"
                        >
                            <div className="grid lg:grid-cols-12 gap-0">

                                {/* Visual Label (Project ID & Status) */}
                                <div className="lg:col-span-3 bg-[#FFE2AF]/20 border-b-4 lg:border-b-0 lg:border-r-4 border-[#3F9AAE] p-8 flex flex-col justify-between items-center text-center">
                                    <div className="text-8xl font-black italic opacity-10 text-[#3F9AAE]">0{project.id}</div>
                                    <div className="flex flex-col items-center">
                                        <div className="w-20 h-20 rounded-[30px] flex items-center justify-center text-white mb-4 rotate-3 shadow-lg" style={{ backgroundColor: project.color }}>
                                            {project.icon}
                                        </div>
                                        <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border-2 ${project.status === 'Ongoing' ? 'border-[#F96E5B] text-[#F96E5B] border-dashed animate-pulse' : 'border-[#3F9AAE] text-[#3F9AAE]'}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="hidden lg:block mt-8">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Waadi Standards</p>
                                        <p className="text-xs font-bold italic uppercase">Certified Build</p>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="lg:col-span-9 p-8 md:p-12">
                                    <div className="mb-8">
                                        <p className="text-xs font-black uppercase tracking-widest text-[#F96E5B] mb-2">{project.type}</p>
                                        <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#3F9AAE]">{project.title}</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-12">
                                        <div>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-4">About the project</h4>
                                            <p className="text-lg font-medium italic leading-relaxed opacity-80 mb-6">
                                                "{project.about}"
                                            </p>
                                            <div className="p-6 bg-slate-50 rounded-3xl border-2 border-dashed border-[#3F9AAE]/20">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#3F9AAE] mb-2">Key Outcome</p>
                                                <p className="font-black text-lg italic tracking-tight">{project.outcome}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-40 mb-4">What We Did</h4>
                                            <div className="space-y-4">
                                                {project.highlights.map((item, i) => (
                                                    <div key={i} className="flex items-center space-x-3 group/item">
                                                        <CheckCircle2 size={18} className="text-[#F96E5B] group-hover/item:rotate-12 transition-transform" />
                                                        <span className="font-bold text-sm uppercase tracking-tight">{item}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.05, x: 5 }}
                                                className="mt-8 flex items-center space-x-2 text-[#3F9AAE] font-black uppercase tracking-widest text-xs border-b-2 border-[#3F9AAE] pb-1"
                                            >
                                                <span>View Project Details</span>
                                                <ChevronRight size={14} />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Approach Summary Section */}
            <section className="py-24 px-6 bg-white border-y-8 border-[#3F9AAE]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-6xl font-black uppercase italic mb-4 text-[#F96E5B]">Our Approach</h2>
                        <p className="text-xl font-bold uppercase tracking-widest text-[#3F9AAE]">Reflected in every build</p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { t: "Systems, Not Just Visuals", i: <Settings /> },
                            { t: "Function Over Aesthetics", i: <Layout /> },
                            { t: "Real Usage Design", i: <Smartphone /> },
                            { t: "Client Education", i: <Star /> }
                        ].map((box, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -10 }}
                                className="bg-[#FFE2AF]/20 p-8 rounded-[40px] border-4 border-[#3F9AAE] flex flex-col items-center text-center shadow-md"
                            >
                                <div className="mb-6 p-4 rounded-full bg-[#3F9AAE] text-white">
                                    {React.cloneElement(box.i, { size: 24 })}
                                </div>
                                <h3 className="font-black uppercase text-sm leading-tight tracking-widest">{box.t}</h3>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div {...fadeInUp} className="mt-16 p-10 bg-[#3F9AAE] text-white rounded-[50px] text-center shadow-2xl">
                        <p className="text-3xl font-black uppercase italic tracking-tighter mb-4">
                            From business websites to internal tools and demo concepts.
                        </p>
                        <p className="text-lg font-bold opacity-70 uppercase tracking-[0.2em]">
                            Waadi Media is grounded in clarity, structure, and long-term thinking.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 text-center">
                <motion.div
                    whileHover={{ rotate: 1 }}
                    className="max-w-4xl mx-auto bg-[#F96E5B] p-16 rounded-[60px] text-white shadow-[0_20px_0_0_#C75748]"
                >
                    <h2 className="text-5xl md:text-7xl font-black uppercase italic mb-8 tracking-tighter leading-[0.9]">Ready to <br /> build?</h2>
                    <p className="text-xl font-bold mb-10 opacity-90 max-w-lg mx-auto italic">
                        Whether you need a brand identity or a complex operation system, we build foundations that last.
                    </p>
                    <Link href="/lets-talk" passHref>
                        <motion.button
                            whileHover={{ scale: 1.05, y: -4 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-[#F96E5B] px-12 py-6 rounded-full font-black text-xl uppercase shadow-xl flex items-center mx-auto space-x-3"
                        >
                            <span>Request a Consultation</span>
                            <ArrowRight />
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

        </div>
    );
};

export default OurWorkPage;
