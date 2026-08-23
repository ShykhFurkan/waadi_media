'use client';
import React, { useState } from 'react';
import {
    Code,
    Settings,
    Video,
    Share2,
    Compass,
    BarChart3,
    ChevronDown,
    Sparkles,
    ArrowRight,
    CheckCircle2,
    Zap,
    Plus,
    Minus,
    Layers,
    Cpu,
    Smartphone,
    Search,
    GraduationCap,
    Trophy,
    Globe,
    ExternalLink,
    Activity,
    Calendar,
    Medal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactSection from '@/components/ContactSection';
import { BrandLogos } from '@/components/BrandLogos';
import Link from 'next/link';
import Image from 'next/image';

const HomePageContent = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    const services = [
        {
            id: "web-dev",
            title: "Web Engineering & Next.js",
            description: "High-performance websites, Next.js web applications, and e-commerce platforms built for speed (<0.8s) and top Google ranking.",
            icon: <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            badge: "Core Stack",
            href: "/services/web-development",
            highlights: ["Fast Load Speeds (<0.8s)", "Custom Next.js & React", "SEO & Payment Integration"]
        },
        {
            id: "software",
            title: "Software & Mobile Apps",
            description: "Custom POS systems, iOS & Android mobile applications, internal enterprise CRM databases, and offline-first software.",
            icon: <Cpu className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            badge: "High Growth",
            href: "/services/software-development",
            highlights: ["iOS & Android Apps", "POS & ERP Systems", "Offline-First Sync"]
        },
        {
            id: "social-media",
            title: "Social Media Growth",
            description: "Sustained brand authority across Instagram, YouTube, and LinkedIn through structured content calendars and 4K Reels production.",
            icon: <Share2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            badge: "Popular",
            href: "/services/social-media-marketing",
            highlights: ["Monthly Content Calendars", "4K Reels & Shorts Shoots", "Audience Engagement"]
        },
        {
            id: "automations",
            title: "Automations & AI Workflows",
            description: "Internal business workflows, WhatsApp API bots, lead routing, and CRM integrations that eliminate manual friction.",
            icon: <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            badge: "Efficiency",
            href: "/services/automation-ai",
            highlights: ["WhatsApp Invoice Bots", "Automated CRM Sync", "Inventory Tracking"]
        },
        {
            id: "seo-ads",
            title: "SEO & Performance Ads",
            description: "Data-driven Meta & Google Search ad campaigns coupled with technical local SEO to rank #1 in Kashmir search results.",
            icon: <Search className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            badge: "ROI Driven",
            href: "/services/seo-services",
            highlights: ["Google Maps Pack Ranking", "Meta & Search Ads", "Conversion Rate Optimization"]
        }
    ];

    const caseStudies = [
        {
            id: "kehribal-fc",
            title: "Kehribal FC Kashmir",
            metrics: "100k+ Impressions & Profile Visits",
            description: "Official Media & Management Partner of Kehribal FC (@kehribal_fc), directing brand building, digital growth, team operations, sponsor PR, and 4K matchday media.",
            image: "/kehribal-fc-showcase.jpg",
            tag: "Social Media & Growth",
            href: "/work/kehribal-fc",
            liveUrl: "https://www.instagram.com/kehribal_fc"
        },
        {
            id: "wonder-delight",
            title: "Wonder Delight Travels",
            metrics: "Kashmir Travel & Tour Platform",
            description: "Built a complete travel booking web platform for tourists to plan custom trips, search Kashmir tour packages, book transport, and reserve hotels.",
            image: "/wonder-delight-mockup.png",
            tag: "Travel Booking Platform",
            href: "/work/wonder-delight",
            liveUrl: "https://wonderdelighttravels.com/"
        },
        {
            id: "kaali-edge",
            title: "Kaali Edge Consultancy",
            metrics: "Global Admissions Portal",
            description: "Engineered an international educational consultancy platform guiding students for MBBS and higher studies abroad in Russia, Georgia, and Central Asia.",
            image: "/kaali-edge-mockup.png",
            tag: "Educational Consultancy",
            href: "/work/kaali-edge",
            liveUrl: "https://www.kaaliedge.com/"
        },
        {
            id: "smart-hire",
            title: "Smart Hire AI Platform",
            metrics: "AI ATS & Assessment Suite",
            description: "Designed a recruitment platform prototype unifying AI ATS resume screening, interactive MCQ testing, Monaco IDE challenges, and AI evaluations.",
            image: "/smart-hire-mockup.png",
            tag: "AI Software Prototype",
            href: "/work/smart-hire",
            liveUrl: "https://smarthire-beige.vercel.app/"
        }
    ];

    const faqs = [
        {
            q: "What services does Waadi Media specialize in?",
            a: "Waadi Media is a full-service agency specializing in Web Development (Next.js), Mobile App & Software Engineering, Social Media Growth (4K Reels & YouTube), Business Automations (WhatsApp API), and Performance Ads."
        },
        {
            q: "Where is Waadi Media located?",
            a: "We are headquartered in Srinagar, Jammu & Kashmir, India, serving clients across Srinagar, Gulmarg, Anantnag, Kashmir, and international markets."
        },
        {
            q: "Do you offer full social media management & video production?",
            a: "Yes! We handle monthly content calendars, on-location 4K camera & drone shoots in Kashmir, short-form Reels editing, caption writing, and audience growth analytics."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 transition-colors">

            {/* HERO SECTION */}
            <section className="relative pt-36 pb-16 px-4 sm:px-6 overflow-hidden text-center">
                
                {/* Background Glow Overlay in Dark Mode */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none opacity-0 dark:opacity-100"></div>

                <div className="max-w-5xl mx-auto relative z-10 space-y-8">

                    {/* Pill Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border bg-blue-50 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider shadow-sm cursor-default"
                    >
                        <Sparkles size={14} className="text-blue-600 dark:text-blue-400" />
                        <span>KASHMIR&apos;S PREMIER CREATIVE & TECH POWERHOUSE</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.02] text-slate-900 dark:text-white"
                    >
                        Creative + Engineering <br />
                        <span className="text-blue-600 dark:text-blue-500">for Ambitious Brands</span> <br />
                        of Kashmir<span className="text-blue-600 dark:text-blue-500">.</span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lg sm:text-2xl font-normal text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed"
                    >
                        We build high-performance{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">websites</span>, automated{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">workflows</span>, and cinematic{' '}
                        <span className="text-blue-600 dark:text-blue-400 font-medium">media systems</span> that help local businesses grow.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
                    >
                        <Link href="/work" passHref>
                            <motion.div
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer transition-all"
                            >
                                <span>See Our Work</span>
                                <ArrowRight size={16} />
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Trusted Brand Logos Component */}
                    <BrandLogos />

                </div>
            </section>



            {/* SERVICES SECTION */}
            <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Layers size={14} />
                        <span>Core Capabilities</span>
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Services Engineered For <span className="text-blue-600 dark:text-blue-500">Growth</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
                        Bridging web & software engineering with social media strategy to command market leadership.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((serv) => (
                        <div
                            key={serv.id}
                            className="ui-card ui-card-hover p-8 rounded-2xl flex flex-col justify-between"
                        >
                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40">
                                        {serv.icon}
                                    </div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300">
                                        {serv.badge}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        {serv.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                                        {serv.description}
                                    </p>
                                </div>

                                <ul className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
                                    {serv.highlights.map((h, i) => (
                                        <li key={i} className="flex items-center space-x-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                                            <CheckCircle2 size={14} className="text-blue-600 dark:text-blue-400 shrink-0" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link href={serv.href} passHref>
                                <div className="pt-6 mt-4 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 cursor-pointer">
                                    <span>Explore Capability</span>
                                    <ArrowRight size={14} />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* CASE STUDIES SHOWCASE */}
            <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                            <span>Proven Client Projects</span>
                        </div>
                        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                            Featured <span className="text-blue-600 dark:text-blue-500">Case Studies</span>
                        </h2>
                    </div>

                    <Link href="/work" passHref>
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center space-x-1 cursor-pointer">
                            <span>View All Projects</span>
                            <ArrowRight size={14} />
                        </div>
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {caseStudies.map((cs) => (
                        <div
                            key={cs.id}
                            className="ui-card rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 group flex flex-col justify-between"
                        >
                            <Link href={cs.href} className="block">
                                <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                                    <Image
                                        src={cs.image}
                                        alt={cs.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-900/90 backdrop-blur-md text-white text-[9px] font-bold uppercase">
                                        {cs.tag}
                                    </span>
                                </div>

                                <div className="p-5 space-y-2">
                                    <span className="inline-block px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold">
                                        {cs.metrics}
                                    </span>
                                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {cs.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">
                                        {cs.description}
                                    </p>
                                </div>
                            </Link>

                            <div className="p-5 pt-0 flex items-center justify-between">
                                <Link href={cs.href} className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                                    View Case Study →
                                </Link>
                                {cs.liveUrl && (
                                    <a
                                        href={cs.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-slate-400 hover:text-blue-500 flex items-center space-x-0.5"
                                    >
                                        <span>Live</span>
                                        <ExternalLink size={10} />
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* AGENCY METHOD TIMELINE */}
            <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                    <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        The Waadi <span className="text-blue-600 dark:text-blue-500">Method</span>
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                        A disciplined, 4-phase execution framework for long-term business results.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">
                    {[
                        { num: "01", title: "Study & Audit", desc: "Understanding core business model, target audience, and bottlenecks." },
                        { num: "02", title: "Strategize", desc: "Designing system architecture, positioning, and deliverables blueprint." },
                        { num: "03", title: "Build", desc: "Developing Next.js web apps, automations, and media production." },
                        { num: "04", title: "Iterate", desc: "Continuous data monitoring, ad optimization, and scaling." }
                    ].map((step, i) => (
                        <div key={i} className="ui-card p-6 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3">
                            <div className="text-3xl font-extrabold text-blue-600 dark:text-blue-500">{step.num}</div>
                            <h3 className="text-base font-bold text-slate-900 dark:text-white">{step.title}</h3>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQ ACCORDION */}
            <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto border-t border-slate-200 dark:border-white/10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaq === index;
                        return (
                            <div
                                key={index}
                                className="ui-card rounded-xl border border-slate-200 dark:border-white/10 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(isOpen ? null : index)}
                                    className="w-full p-5 text-left flex items-center justify-between space-x-4 font-bold text-sm sm:text-base text-slate-900 dark:text-white focus:outline-none"
                                >
                                    <span>{faq.q}</span>
                                    {isOpen ? <Minus size={16} className="text-blue-600 dark:text-blue-400 shrink-0" /> : <Plus size={16} className="text-slate-400 shrink-0" />}
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-white/5 pt-3"
                                        >
                                            {faq.a}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* EMBEDDED CONTACT SECTION */}
            <ContactSection />

        </div>
    );
};

export default HomePageContent;
