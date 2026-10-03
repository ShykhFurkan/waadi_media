import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projectsData, getProjectBySlug } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { OutboundLink } from '@/components/ui/OutboundLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getCreativeWorkSchema, getBreadcrumbSchema } from '@/lib/seo';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: 'Project Not Found - Waadi Media' };
  }

  return {
    title: `${project.name} Case Study - Waadi Media`,
    description: project.metaDescription || project.summary,
    alternates: {
      canonical: `/work/${project.slug}`,
    },
    openGraph: {
      title: `${project.name} Case Study - Waadi Media`,
      description: project.metaDescription || project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  const creativeWorkSchema = getCreativeWorkSchema({
    name: project.name,
    slug: project.slug,
    summary: project.summary,
    sector: project.sector,
    liveUrl: project.liveUrl,
  });

  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
    { name: project.name, url: `/work/${project.slug}` },
  ]);

  return (
    <article className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={creativeWorkSchema} />
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[1000px] mx-auto px-5 sm:px-8 space-y-16 md:space-y-20">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs text-mist font-medium"
        >
          <Link href="/" className="hover:text-blue transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/work" className="hover:text-blue transition-colors">
            Work
          </Link>
          <span>/</span>
          <span className="text-ink font-semibold">{project.name}</span>
        </nav>

        {/* Hero Section */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-wider text-blue font-semibold">
                {project.sector}
              </span>
              {project.badge && (
                <span className="px-3 py-0.5 rounded-full text-xs font-medium bg-blue-tint text-blue">
                  {project.badge}
                </span>
              )}
            </div>

            <h1 className="text-h1 text-ink">
              {project.name}
            </h1>

            <p className="text-lead text-mist max-w-2xl">
              {project.summary}
            </p>
          </div>

          {/* Services list tags & Visit live site button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-line">
            <div className="flex flex-wrap gap-2">
              {project.services.map((serviceName) => (
                <span
                  key={serviceName}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-paper border border-line text-graphite"
                >
                  {serviceName}
                </span>
              ))}
            </div>

            <OutboundLink
              href={project.liveUrl}
              label={project.name}
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue text-white text-sm font-medium hover:bg-blue-deep transition-colors shrink-0"
            >
              Visit live site
            </OutboundLink>
          </div>

          {/* Cover mockup in CSS browser window frame */}
          <div className="rounded-2xl border border-line bg-paper overflow-hidden shadow-floating mt-6">
            <div className="h-9 px-4 border-b border-line bg-snow/80 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-line" />
              <div className="w-2.5 h-2.5 rounded-full bg-line" />
              <div className="w-2.5 h-2.5 rounded-full bg-line" />
              <div className="mx-auto text-[11px] font-mono text-mist truncate max-w-[280px]">
                {project.liveUrl.replace(/^https?:\/\//, '')}
              </div>
            </div>

            <div className="relative aspect-[16/10] bg-snow overflow-hidden">
              <Image
                src={`/work/${project.slug}/cover.png`}
                alt={`${project.name} live website screenshot`}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
            </div>
          </div>
        </div>

        {/* Narrative Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-6">
          {/* Main Story Column */}
          <div className="md:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-3">
              <h2 className="text-h3 text-ink">Overview</h2>
              <p className="text-body text-graphite leading-relaxed">
                {project.overview}
              </p>
            </section>

            {/* The Challenge */}
            <section className="space-y-3">
              <h2 className="text-h3 text-ink">The challenge</h2>
              <p className="text-body text-graphite leading-relaxed">
                {project.challenge}
              </p>
            </section>

            {/* What We Did */}
            <section className="space-y-3">
              <h2 className="text-h3 text-ink">What we did</h2>
              <p className="text-body text-graphite leading-relaxed">
                {project.whatWeDid}
              </p>
            </section>

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-h3 text-ink">Highlights</h2>
                <ul className="space-y-2.5">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-body text-graphite">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue shrink-0 mt-2.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Results block: hidden while TODO per Rule 1 */}
            {project.results && project.results.length > 0 && (
              <section className="space-y-3 p-6 bg-paper border border-line rounded-2xl">
                <h2 className="text-h3 text-ink">Results</h2>
                <ul className="space-y-2">
                  {project.results.map((res, idx) => (
                    <li key={idx} className="text-body text-graphite">
                      {res}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Client quote block: hidden while TODO per Rule 1 */}
            {project.quote && project.quote.quote && (
              <section className="p-8 bg-paper border border-line rounded-2xl space-y-4">
                <blockquote className="text-lead text-ink italic font-display">
                  &ldquo;{project.quote.quote}&rdquo;
                </blockquote>
                <div className="text-xs text-mist">
                  <strong className="text-ink block font-semibold">{project.quote.name}</strong>
                  <span>{project.quote.role ? `${project.quote.role}, ` : ''}{project.quote.business}</span>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Quick Facts Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="p-6 bg-paper border border-line rounded-2xl space-y-5">
              <div>
                <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
                  Sector
                </span>
                <span className="text-base text-ink font-medium">
                  {project.sector}
                </span>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-2">
                  Services
                </span>
                <ul className="space-y-1.5">
                  {project.services.map((s) => (
                    <li key={s} className="text-sm text-graphite">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-line pt-4">
                <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-2">
                  Live Project
                </span>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue hover:text-blue-deep transition-colors break-all"
                >
                  {project.liveUrl.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Next Project Footer Bar */}
        <div className="pt-16 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <span className="text-xs uppercase tracking-wider text-mist font-semibold block mb-1">
              Next project
            </span>
            <h3 className="text-2xl font-sans font-semibold text-ink">
              {nextProject.name}
            </h3>
            <p className="text-sm text-mist mt-0.5">
              {nextProject.sector} &bull; {nextProject.summary}
            </p>
          </div>

          <Button href={`/work/${nextProject.slug}`} variant="secondary">
            View next case study
          </Button>
        </div>
      </div>
    </article>
  );
}
