'use client';
import React from 'react';
import {
    Globe, Users, Palette, Compass, Megaphone, Repeat, CheckCircle2
} from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// --- SERVICE DATA ---
const detailedServices = [
    {
        id: "web",
        title: "Web Design & Development",
        icon: <Globe size={48} />,
        color: '#3F9AAE', // colors.teal
        purpose: "To provide businesses with a robust, user-friendly, and professionally branded web presence that helps convert visitors into customers.",
        items: [
            { name: "Custom Website Design", desc: "Tailored visual design aligned with brand identity and business goals." },
            { name: "Front-end Development", desc: "Clean, standards-compliant HTML/CSS/JS with fast loading speeds." },
            { name: "Back-end & CMS", desc: "WordPress or custom CMS integration with secure server-side logic." },
            { name: "E-Commerce", desc: "Shopping carts, Razorpay/Stripe, and inventory system setup." },
            { name: "Maintenance", desc: "Security updates, backups, and uptime monitoring." }
        ]
    },
    {
        id: "social",
        title: "Social Media Management",
        icon: <Users size={48} />,
        color: '#F96E5B', // colors.red
        purpose: "To establish a consistent, engaging presence that fosters community and brand loyalty.",
        items: [
            { name: "Profile Optimization", desc: "Professional bio and branding elements across all platforms." },
            { name: "Content Strategy", desc: "Calendar planning aligned with educational and promotional objectives." },
            { name: "Post Creation", desc: "High-quality captions, graphics, and hashtag research." },
            { name: "Engagement", desc: "Comment replies, DM handling, and community moderation." },
            { name: "Analytics", desc: "Monthly performance reports with strategic insights." }
        ]
    },
    {
        id: "content",
        title: "Content Creation",
        icon: <Palette size={48} />,
        color: '#79C9C5', // colors.lightTeal
        purpose: "To tell your story, educate audiences, and drive engagement through compelling visuals and copy.",
        items: [
            { name: "Copywriting", desc: "SEO-informed website copy, blog posts, and product descriptions." },
            { name: "Graphic Design", desc: "Brand-aligned visuals for social media, brochures, and banners." },
            { name: "Photo & Video", desc: "Professional shoots for products, events, and staff." },
            { name: "Short-Form Video", desc: "Reels, TikToks, and Shorts designed for maximum retention." }
        ]
    },
    {
        id: "strategy",
        title: "Strategic Digital Planning",
        icon: <Compass size={48} />,
        color: '#3F9AAE',
        purpose: "To provide structured, data-driven planning that aligns marketing efforts with measurable outcomes.",
        items: [
            { name: "Brand Audit", desc: "SWOT analysis and review of existing digital footprint." },
            { name: "Strategic Roadmap", desc: "Defined goals with quarterly and annual timelines." },
            { name: "Competitor Analysis", desc: "Benchmarking and identification of market gaps." },
            { name: "Performance Metrics", desc: "KPI definition and dashboard reporting cadence." }
        ]
    },
    {
        id: "ads",
        title: "Paid Advertising",
        icon: <Megaphone size={48} />,
        color: '#F96E5B',
        purpose: "To drive targeted traffic and measurable conversions through structured paid media campaigns.",
        items: [
            { name: "Campaign Setup", desc: "Audience targeting (Meta/Google) and Pixel/Tracking setup." },
            { name: "Creative Design", desc: "Ad variants for A/B testing including images, videos, and copy." },
            { name: "Budget Mgmt", desc: "Daily monitoring to scale high-performers and control CPA." },
            { name: "Reporting", desc: "Insights and dashboards for weekly performance tracking." }
        ]
    },
    {
        id: "automation",
        title: "Automation & Integration",
        icon: <Repeat size={48} />,
        color: '#79C9C5',
        purpose: "To streamline operations, reduce manual workload, and ensure consistent customer experiences.",
        items: [
            { name: "CRM Integration", desc: "Setup of platforms like HubSpot or Zoho for customer data." },
            { name: "Lead Flow", desc: "Automated ingestion from website forms and social ads." },
            { name: "Workflow Triggers", desc: "Email/SMS follow-ups based on specific behavioral triggers." },
            { name: "Cross-Platform Sync", desc: "Linking website, CRM, and email tools for seamless data." }
        ]
    }
];

const engagementProcess = [
    { step: "Discovery", desc: "Understand business goals, target market, and constraints." },
    { step: "Proposal", desc: "Formal deliverables, timelines, and clear pricing." },
    { step: "Execution", desc: "Agile approach with frequent checkpoints and revisions." },
    { step: "Reporting", desc: "Regular performance reports with actionable insights." },
    { step: "Support", desc: "Maintenance, optimization, and planning for future growth." }
];

// --- COMPONENT ---
const ServicesPage = () => {
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

    return (
        <div className="pt-40 bg-[#FFE2AF]">
            <section className="pb-24 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
                        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter mb-6 text-[#3F9AAE]">
                            Full Spectrum <br /> <span className="text-[#F96E5B]">Capabilities</span>
                        </h1>
                        <p className="text-xl font-bold uppercase tracking-widest text-[#2D6E7D]/60 max-w-2xl mx-auto">
                            Bridging the gap between creative excellence and disciplined technical execution.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Detailed Service Blocks */}
            <section className="py-24 space-y-32">
                {detailedServices.map((service, idx) => (
                    <div key={service.id} className="max-w-6xl mx-auto px-6">
                        <motion.div {...fadeInUp} className="grid lg:grid-cols-2 gap-16 items-center">
                            <div className={idx % 2 === 1 ? 'lg:order-2' : ''}>
                                <div className="flex items-center space-x-4 mb-8">
                                    <div className="p-5 rounded-[20px] text-white rotate-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]" style={{ backgroundColor: service.color }}>
                                        {service.icon}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-[#3F9AAE]">{service.title}</h2>
                                </div>
                                <p className="text-xl font-bold mb-10 leading-relaxed italic opacity-80 border-l-8 pl-6" style={{ borderColor: service.color }}>
                                    {service.purpose}
                                </p>
                                <div className="grid sm:grid-cols-1 gap-6">
                                    {service.items.map((item, i) => (
                                        <motion.div
                                            key={i} whileHover={{ x: 10 }}
                                            className="flex items-start space-x-4 p-4 rounded-2xl border-2 border-dashed border-[#3F9AAE]/30 hover:bg-white hover:shadow-lg transition-all"
                                        >
                                            <CheckCircle2 size={24} style={{ color: service.color }} className="flex-shrink-0 mt-1" />
                                            <div>
                                                <h4 className="font-black uppercase text-sm tracking-widest text-[#3F9AAE]">{item.name}</h4>
                                                <p className="text-sm font-medium opacity-70">{item.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            <div className={`hidden lg:flex justify-center ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                                <motion.div
                                    custom={idx}
                                    variants={cardHover3D}
                                    initial="initial"
                                    whileHover="hover"
                                    className="w-80 h-80 rounded-[60px] border-8 border-[#3F9AAE] relative flex items-center justify-center bg-white shadow-2xl"
                                >
                                    <div className="absolute inset-4 rounded-[40px] border-4 border-dotted border-[#F96E5B] opacity-30"></div>
                                    {service.icon && React.cloneElement(service.icon as React.ReactElement<any>, { size: 120, className: "opacity-20 absolute" })}
                                    <div className="text-center p-8 z-10">
                                        <p className="text-xs font-black uppercase tracking-widest opacity-40 mb-2">Waadi Standard</p>
                                        <p className="text-lg font-black uppercase italic">Proven Methodology</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                ))}
            </section>

            {/* Client Engagement */}
            <section className="py-24 bg-white border-y-8 border-[#3F9AAE]">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-5xl font-black uppercase italic mb-16 text-[#F96E5B]">Client Engagement</h2>
                    <div className="grid md:grid-cols-5 gap-8">
                        {engagementProcess.map((step, i) => (
                            <motion.div
                                key={i} whileHover={{ y: -10 }}
                                className="relative p-6 rounded-3xl border-4 border-[#3F9AAE] bg-[#FFE2AF]/10 shadow-sm"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#3F9AAE] text-white flex items-center justify-center font-black mx-auto mb-4 italic">
                                    {i + 1}
                                </div>
                                <h4 className="font-black uppercase text-sm tracking-widest mb-2">{step.step}</h4>
                                <p className="text-xs font-medium opacity-60 leading-tight">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
