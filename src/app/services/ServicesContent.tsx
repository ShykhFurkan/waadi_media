'use client';
import React from 'react';
import { Globe, Users, Palette, Compass, Megaphone, Repeat, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const detailedServices = [
    {
        id: "web",
        title: "Web Engineering & Applications",
        icon: <Globe size={28} className="text-blue-600 dark:text-blue-400" />,
        badge: "High Performance",
        purpose: "Empowering Kashmir & national brands with custom Next.js platforms, lightning-fast e-commerce, and web apps built for conversion.",
        deliverables: [
            { name: "Custom Web Applications", desc: "Next.js & React custom apps engineered for speed (<0.8s load time)." },
            { name: "E-Commerce & Payment Gateways", desc: "Razorpay, Stripe, and UPI integrations for instant checkouts." },
            { name: "Custom CMS & Operations", desc: "Content management backends tailored for non-technical team updates." },
            { name: "SEO & Speed Optimization", desc: "Schema markup, server-side rendering, and high search visibility." }
        ]
    },
    {
        id: "automations",
        title: "Business Automations & AI",
        icon: <Repeat size={28} className="text-blue-600 dark:text-blue-400" />,
        badge: "Operational Efficiency",
        purpose: "Replacing manual friction with intelligent automated lead handling, WhatsApp notification bots, and CRM synchronization.",
        deliverables: [
            { name: "WhatsApp Business API Bots", desc: "Automated instant customer replies and booking confirmations." },
            { name: "CRM & Invoice Sync", desc: "Linking website leads directly with Zoho, HubSpot, or spreadsheets." },
            { name: "Inventory Automations", desc: "Multi-channel stock syncing for retail stores and hotels." },
            { name: "Internal Workflow Triggers", desc: "Eliminating tedious administrative tasks for staff and managers." }
        ]
    },
    {
        id: "content",
        title: "Cinematic Media Production",
        icon: <Palette size={28} className="text-blue-600 dark:text-blue-400" />,
        badge: "Brand Storytelling",
        purpose: "Capturing the authentic luxury and beauty of your brand with 4K drone cinematography, viral reels production, and photography.",
        deliverables: [
            { name: "Short-Form Video Production", desc: "High-retention Reels, Shorts, and TikToks designed for reach." },
            { name: "Drone & Property Shoots", desc: "Cinematic aerial videography for Gulmarg/Srinagar hotel resorts." },
            { name: "Brand Documentaries", desc: "Story-driven video spots highlighting heritage and brand values." },
            { name: "Commercial Photography", desc: "Studio product photography for e-commerce and catalog collaterals." }
        ]
    },
    {
        id: "social",
        title: "Social Media Authority",
        icon: <Users size={28} className="text-blue-600 dark:text-blue-400" />,
        badge: "Community Growth",
        purpose: "Building long-term authority across Instagram, YouTube, and LinkedIn through disciplined content calendars and strategy.",
        deliverables: [
            { name: "Monthly Content Calendars", desc: "Structured publishing schedules aligned with seasonal promotions." },
            { name: "Community Management", desc: "Proactive comment engagement and DM customer support." },
            { name: "Growth Analytics", desc: "Transparent monthly data reports tracking reach and follower velocity." },
            { name: "Influencer Partnerships", desc: "Collaborating with local and national creators for amplification." }
        ]
    },
    {
        id: "ads",
        title: "Performance Ads & Paid Growth",
        icon: <Megaphone size={28} className="text-blue-600 dark:text-blue-400" />,
        badge: "Direct ROI",
        purpose: "Treating ad spend as a financial investment to generate qualified leads and high-margin online sales.",
        deliverables: [
            { name: "Meta & Instagram Ad Campaigns", desc: "Precision audience targeting, retargeting funnels, and creative variants." },
            { name: "Google Search & Performance Max", desc: "Capturing high-intent search queries for hotels and services." },
            { name: "A/B Creative Testing", desc: "Continuous copy and video testing to lower acquisition costs." },
            { name: "Conversion Rate Optimization", desc: "Optimizing landing pages specifically to increase conversion percentages." }
        ]
    },
    {
        id: "strategy",
        title: "Brand Strategy & Positioning",
        icon: <Compass size={28} className="text-blue-600 dark:text-blue-400" />,
        badge: "Strategic Clarity",
        purpose: "Aligning your brand identity, pricing, and visual language to command premium positioning in competitive markets.",
        deliverables: [
            { name: "Brand Identity Architecture", desc: "Logo suites, visual guidelines, typography, and color systems." },
            { name: "Market Positioning Audit", desc: "Competitor analysis and identifying unique value propositions." },
            { name: "Digital Growth Roadmaps", desc: "Quarterly actionable milestones for scaling online revenue." },
            { name: "Messaging Frameworks", desc: "Defining taglines, brand voice, and customer value communication." }
        ]
    }
];

const ServicesPage = () => {
    return (
        <div className="min-h-screen bg-[#FAFAFD] dark:bg-[#030712] text-slate-900 dark:text-slate-100 pt-36 pb-28 px-4 sm:px-6 transition-colors">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Hero Header */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                        <Layers size={14} />
                        <span>Capabilities</span>
                    </div>
                    <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                        Digital Services <br />
                        <span className="text-blue-600 dark:text-blue-500">Engineered For Scale</span>
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
                        Bridging creative storytelling with disciplined software engineering for businesses in Kashmir and beyond.
                    </p>
                </div>

                {/* Detailed Service Cards */}
                <div className="space-y-12">
                    {detailedServices.map((service) => (
                        <div key={service.id} className="ui-card rounded-3xl p-8 sm:p-12 space-y-6">
                            <div className="grid lg:grid-cols-12 gap-8 items-start">
                                
                                <div className="lg:col-span-5 space-y-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40">
                                            {service.icon}
                                        </div>
                                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                                            {service.badge}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {service.title}
                                    </h2>

                                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed border-l-2 border-blue-600 dark:border-blue-500 pl-3 italic">
                                        {service.purpose}
                                    </p>

                                    <Link href="/lets-talk" passHref>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer mt-2"
                                        >
                                            <span>Inquire For This Service</span>
                                            <ArrowRight size={14} />
                                        </motion.div>
                                    </Link>
                                </div>

                                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
                                    {service.deliverables.map((item, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1">
                                            <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                                                <CheckCircle2 size={14} />
                                                <span>{item.name}</span>
                                            </div>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                                                {item.desc}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ServicesPage;
