import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Share2,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { BLOG_POSTS, getBlogPostBySlug, getAllBlogSlugs } from "@/data/blogs";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Waadi Media",
    };
  }

  const url = `https://waadimedia.com/blog/${post.slug}`;

  return {
    title: `${post.title} | Waadi Media Kashmir`,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${post.title} | Waadi Media`,
      description: post.excerpt,
      url: url,
      siteName: "Waadi Media",
      images: ["/kashmir_hero_bg.jpg"],
      locale: "en_IN",
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/kashmir_hero_bg.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Structured Data Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://waadimedia.com/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://waadimedia.com/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://waadimedia.com/blog/${post.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: "https://waadimedia.com/kashmir_hero_bg.jpg",
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: post.authorRole,
      url: "https://waadimedia.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "Waadi Media",
      logo: {
        "@type": "ImageObject",
        url: "https://waadimedia.com/logo.png",
      },
    },
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://waadimedia.com/blog/${post.slug}`,
    },
    keywords: post.keywords.join(", "),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />

      <main className="min-h-screen bg-slate-50 pt-32 pb-24 text-slate-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Back Navigation & Breadcrumb */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors bg-white px-4 py-2 min-h-[44px] rounded-full border border-slate-200 shadow-sm active:scale-95"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to all guides</span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <Link href="/blog" className="hover:text-slate-900 transition-colors">Blog</Link>
              <ChevronRight className="h-3 w-3 text-slate-400" />
              <span className="text-slate-700 font-medium truncate max-w-[200px]">{post.category}</span>
            </nav>
          </div>

          {/* Article Header Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="h-3.5 w-3.5 text-blue-600" />
                {post.date}
              </span>
              <span className="text-slate-300">•</span>
              <span className="flex items-center gap-1.5 text-slate-500">
                <Clock className="h-3.5 w-3.5 text-blue-600" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {post.excerpt}
            </p>

            {/* Author Profile */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-md">
                  FM
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{post.author}</h4>
                  <p className="text-xs text-slate-500">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 font-medium">Jammu & Kashmir</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">Verified Guide</span>
              </div>
            </div>
          </div>

          {/* Key Takeaways Box */}
          {post.takeaways && post.takeaways.length > 0 && (
            <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50/40 rounded-3xl p-6 sm:p-8 border border-blue-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-blue-900 font-bold text-sm uppercase tracking-wide">
                <Sparkles className="h-4 w-4 text-blue-600" />
                <span>Executive Summary & Key Takeaways</span>
              </div>
              <ul className="space-y-2.5">
                {post.takeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 leading-relaxed">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Table of Contents */}
          <div className="bg-slate-100/80 rounded-2xl p-6 border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>In This Guide</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {post.tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-slate-600 hover:text-blue-600 py-1 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight className="h-3 w-3 text-slate-400" />
                  <span>{item.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Article Main Content Sections */}
          <div className="space-y-12 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {post.sections.map((section, idx) => {
              const tocItem = post.tableOfContents[idx];
              const sectionId = tocItem ? tocItem.id : `section-${idx}`;

              return (
                <section key={idx} id={sectionId} className="space-y-4 scroll-mt-28">
                  <div className="space-y-1 border-b border-slate-100 pb-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {section.heading}
                    </h2>
                    {section.subheading && (
                      <p className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wide">
                        {section.subheading}
                      </p>
                    )}
                  </div>

                  <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
                    {section.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  {section.bulletPoints && section.bulletPoints.length > 0 && (
                    <ul className="space-y-2.5 my-4 bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                      {section.bulletPoints.map((point, ptIdx) => (
                        <li key={ptIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.callout && (
                    <div
                      className={`my-6 p-5 rounded-2xl border text-sm leading-relaxed ${
                        section.callout.type === 'insight'
                          ? 'bg-blue-50/60 border-blue-200 text-blue-900'
                          : section.callout.type === 'warning'
                          ? 'bg-amber-50/70 border-amber-200 text-amber-900'
                          : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold mb-1.5">
                        {section.callout.type === 'insight' && <Lightbulb className="h-4 w-4 text-blue-600" />}
                        {section.callout.type === 'warning' && <AlertCircle className="h-4 w-4 text-amber-600" />}
                        {section.callout.type === 'tip' && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-slate-700">{section.callout.text}</p>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          {/* Interactive FAQ Section */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 uppercase tracking-wider">
                  <HelpCircle className="h-4 w-4" />
                  <span>Frequently Asked Questions</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Common Questions from Kashmir Business Owners
                </h3>
              </div>

              <div className="divide-y divide-slate-100">
                {post.faqs.map((faq, fIdx) => (
                  <details key={fIdx} className="group py-4 cursor-pointer">
                    <summary className="flex items-center justify-between font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base list-none min-h-[44px] py-1 cursor-pointer">
                      <span>{faq.question}</span>
                      <span className="ml-4 h-6 w-6 rounded-full bg-slate-100 text-slate-500 group-open:rotate-180 flex items-center justify-center transition-transform shrink-0 text-xs">
                        ▼
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-slate-600 leading-relaxed pr-4">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Direct CTA Box for Kashmir Businesses */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-8 sm:p-12 text-white shadow-xl space-y-6">
            <div className="relative z-10 max-w-2xl space-y-3">
              <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-wider border border-blue-400/30">
                Partner with Kashmir&apos;s Engineering Agency
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Want to Implement This Strategy for Your Business?
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Whether you need a high-converting Next.js website, local Google Maps ranking in Srinagar, or custom WhatsApp AI automation—Waadi Media is here to engineer your growth.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
              <a
                href="https://wa.me/917006841203?text=Hi%20Waadi%20Media,%20I%20read%20your%20guide%20and%20want%20to%20discuss%20growing%20my%20business%20in%20Kashmir."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                <span>Chat on WhatsApp (+91 7006841203)</span>
              </a>

              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-3 min-h-[48px] rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
              >
                Book a Free Discovery Call
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-bold text-slate-900">
              More Guides for Kashmir Entrepreneurs
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.slug}
                  className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-300 transition-colors"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-blue-600 uppercase">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                      <Link href={`/blog/${rel.slug}`} className="hover:text-blue-600">
                        {rel.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {rel.excerpt}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${rel.slug}`}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 pt-2 border-t border-slate-100"
                  >
                    <span>Read Guide</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </>
  );
}
