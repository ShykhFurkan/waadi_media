'use client';
import React, { useState } from 'react';
import { Globe, Building2, Utensils, Zap, CheckCircle2, ArrowRight, Eye, ExternalLink, GraduationCap, Cpu, Trophy, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const projects = [
    {
        id: "kehribal-fc",
        title: "Kehribal FC Kashmir",
        type: "Social Media, Content & Club Operations",
        category: "social",
        status: "Official Media & Management Partner",
        image: "/kehribal-fc-showcase.jpg",
        liveUrl: "https://www.instagram.com/kehribal_fc",
        internalUrl: "/work/kehribal-fc",
        icon: <Trophy size={22} className="text-blue-600 dark:text-blue-400" />,
        about: "Official Media & Management Partner of Kehribal FC (Est. 2016). Directed brand building, digital growth, team operations, sponsor partnerships, and 4K matchday media, reaching 100,000+ impressions and profile visits in one month.",
        highlights: ["100k+ Monthly Reach & Profile Visits", "5 Work Pillars: Brand, Growth, Ops, PR, Media", "Official Sponsor Partnerships (Elite, Waadi, Best One)", "4K Matchday Video Reels & Highlights"],
        outcome: "100k+ Monthly Impressions & Visits"
    },
    {
        id: "wonder-delight",
        title: "Wonder Delight Travels",
        type: "Tour & Travel Booking Platform",
        category: "web",
        status: "Live Production Site",
        image: "/wonder-delight-mockup.png",
        liveUrl: "https://wonderdelighttravels.com/",
        internalUrl: "/work/wonder-delight",
        icon: <Globe size={22} className="text-blue-600 dark:text-blue-400" />,
        about: "Built a complete travel booking web platform for Kashmir's premier tour agency, allowing tourists to search Kashmir tour packages, transport, verified hotel stays, and custom trip plans.",
        highlights: ["Curated Kashmir Tour Package Search", "Transport & Hotel Booking Engine", "Custom Itinerary Generator", "Direct WhatsApp & Instant Quote Routing"],
        outcome: "Active Tourist Booking Engine"
    },
    {
        id: "kaali-edge",
        title: "Kaali Edge",
        type: "Educational Consultancy Platform",
        category: "web",
        status: "Live Production Site",
        image: "/kaali-edge-mockup.png",
        liveUrl: "https://www.kaaliedge.com/",
        internalUrl: "/work/kaali-edge",
        icon: <GraduationCap size={22} className="text-blue-600 dark:text-blue-400" />,
        about: "Engineered an international educational consultancy platform guiding students for MBBS and higher studies abroad in Uzbekistan, Kazakhstan, Kyrgyzstan, Russia, Georgia, and Bangladesh.",
        highlights: ["Global Student Admissions Portal", "Multi-Country University Finder", "Lead Ingestion & Application Funnel", "Responsive Student Support System"],
        outcome: "Global Student Admissions Portal"
    },
    {
        id: "smart-hire",
        title: "Smart Hire",
        type: "AI Recruitment & Assessment Platform",
        category: "systems",
        status: "Live Platform Prototype",
        image: "/smart-hire-mockup.png",
        liveUrl: "https://smarthire-beige.vercel.app/",
        internalUrl: "/work/smart-hire",
        icon: <Cpu size={22} className="text-blue-600 dark:text-blue-400" />,
        about: "Designed and prototyped an advanced recruitment platform unifying AI ATS resume screening, interactive MCQ testing, Monaco IDE coding challenges, and AI interview evaluations.",
        highlights: ["AI ATS Resume Screening", "Interactive MCQ & Skill Testing", "Monaco IDE Live Coding Sandbox", "Automated Candidate Scoring"],
        outcome: "Next-Gen AI Hiring Suite"
    }
];

const WorkPageContent = () => {
    const [filter, setFilter] = useState<'all' | 'web' | 'systems' | 'social'>('all');

    const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Eye size={14} />
                        <span>Client Case Studies & Live Builds</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Featured <span className="text-blue-600 dark:text-blue-500">Projects</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
                        Explore our real-world client platforms, web applications, educational portals, and AI software.
                    </p>

                    {/* Filter Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 pt-4">
                        {[
                            { id: 'all', label: 'All Projects' },
                            { id: 'social', label: 'Social Media & Growth' },
                            { id: 'web', label: 'Web Applications' },
                            { id: 'systems', label: 'AI & Platforms' }
                        ].map((t) => (
                            <button
                                key={t.id}
                                onClick={() => setFilter(t.id as any)}
                                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                                    filter === t.id
                                        ? 'bg-blue-600 text-white shadow-sm'
                                        : 'bg-slate-200/70 dark:bg-white/5 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-white/10'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Projects Showcase Cards */}
                <div className="space-y-8">
                    {filtered.map((project) => (
                        <div
                            key={project.id}
                            className="ui-card rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 relative"
                        >
                            <div className="grid lg:grid-cols-12 gap-0">
                                
                                {/* Image side */}
                                <div className="lg:col-span-5 relative h-64 lg:h-auto min-h-[300px] bg-slate-950">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider">
                                        {project.status}
                                    </span>
                                </div>

                                {/* Details side */}
                                <div className="lg:col-span-7 p-8 sm:p-10 space-y-5 flex flex-col justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40">
                                                    {project.icon}
                                                </div>
                                                <div>
                                                    <div className="text-[10px] uppercase font-bold text-slate-400">{project.type}</div>
                                                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">{project.title}</h2>
                                                </div>
                                            </div>

                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center space-x-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50"
                                                >
                                                    <span>Live Site</span>
                                                    <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>

                                        <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed italic border-l-2 border-blue-600 dark:border-blue-500 pl-3">
                                            &quot;{project.about}&quot;
                                        </p>

                                        <div className="grid sm:grid-cols-2 gap-2 pt-2">
                                            {project.highlights.map((h, i) => (
                                                <div key={i} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                                                    <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                                    <span>{h}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                        <div>
                                            <div className="text-[9px] uppercase font-extrabold text-slate-400">Measured Outcome</div>
                                            <div className="text-sm font-bold text-blue-600 dark:text-blue-400">{project.outcome}</div>
                                        </div>

                                        <Link href={project.internalUrl} passHref>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="px-5 py-2 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center space-x-1 cursor-pointer"
                                            >
                                                <span>View Project</span>
                                                <ArrowRight size={14} />
                                            </motion.div>
                                        </Link>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default WorkPageContent;
