"use client";

import { useState } from "react";
import { Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Web Development",
    budget: "₹50,000 - ₹1,50,000",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'inquiry', data: formData }),
      });
    } catch (err) {
      console.error('Failed to send inquiry email:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const generateWhatsAppUrl = () => {
    const text = `Hi Waadi Media! My name is ${formData.name || "Client"}. I'm interested in ${formData.service}. Message: ${formData.message || "I would like to request a quote."}`;
    return `https://wa.me/917780940317?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="glass-card rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-2xl p-8 sm:p-10 shadow-2xl space-y-6">
      {submitted ? (
        <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-10 w-10" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900">Project Inquiry Submitted!</h3>
          <p className="text-sm text-slate-600 max-w-md">
            Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Furkan Mushtaq will review your project details and get back to you within 24 hours.
          </p>
          <div className="pt-4">
            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Continue on WhatsApp Immediately</span>
            </a>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center space-y-3">
            <div className="luxury-badge">
              <Sparkles className="h-3.5 w-3.5 text-blue-600" />
              <span>Project Discovery Form</span>
            </div>
            <h3 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Let&apos;s Build Something <span className="font-serif italic font-normal text-blue-600">Extraordinary</span>
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Share your project goals below for an instant proposal and free 20-minute strategy consultation with Furkan Mushtaq.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inquiry-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                Your Full Name *
              </label>
              <input
                id="inquiry-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="e.g. Mushtaq Ahmad"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full min-h-[48px] rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="inquiry-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                Email Address *
              </label>
              <input
                id="inquiry-email"
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                required
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full min-h-[48px] rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="inquiry-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                Phone / WhatsApp Number *
              </label>
              <input
                id="inquiry-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                required
                placeholder="+91 7780940317"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full min-h-[48px] rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm"
              />
            </div>

            <div>
              <label htmlFor="inquiry-service" className="block text-xs font-bold text-slate-700 mb-1.5">
                Primary Service Required
              </label>
              <select
                id="inquiry-service"
                name="service"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full min-h-[48px] rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm"
              >
                <option value="Web Development">Web Development & E-Commerce</option>
                <option value="Custom Software">Custom Software Engineering</option>
                <option value="AI Automation">AI Automation (SmartHire Pipeline)</option>
                <option value="Social Media">Social Media Management (4K Reels)</option>
                <option value="Brand Management">Brand Identity & Design</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="inquiry-message" className="block text-xs font-bold text-slate-700 mb-1.5">
              Project Description & Goals
            </label>
            <textarea
              id="inquiry-message"
              rows={4}
              placeholder="Tell us about your brand, requirements, and target timeline..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full rounded-2xl border border-slate-300/80 bg-white/90 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/25 hover:bg-blue-700 active:scale-95 disabled:opacity-60 transition-all"
            >
              <span>{loading ? "Submitting Inquiry..." : "Submit Discovery Form"}</span>
              <Send className={`h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
            </button>

            <a
              href={generateWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600/10 hover:bg-emerald-600/20 px-6 py-4 text-xs font-bold text-emerald-700 border border-emerald-500/30 transition-all"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>Direct WhatsApp Chat</span>
            </a>
          </div>
        </form>
      )}
    </div>
  );
}
