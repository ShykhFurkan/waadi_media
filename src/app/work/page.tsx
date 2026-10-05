import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { OutboundLink } from '@/components/ui/OutboundLink';
import { JsonLd } from '@/components/seo/JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Our Work - Waadi Media',
  description:
    'Websites and software we built for a Kashmir tour operator, an education consultancy and an AI hiring platform.',
  alternates: {
    canonical: '/work',
  },
  openGraph: {
    title: 'Our Work - Waadi Media',
    description:
      'Websites and software we built for a Kashmir tour operator, an education consultancy and an AI hiring platform.',
    url: '/work',
  },
};

export default function WorkPage() {
  const breadcrumbsSchema = getBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Work', url: '/work' },
  ]);

  return (
    <div className="w-full min-h-screen bg-snow text-graphite py-16 md:py-24">
      <JsonLd data={breadcrumbsSchema} />

      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-16 md:mb-20">
          <h1 className="text-h1 text-ink mb-4">
            Work we&apos;re proud of.
          </h1>
          <p className="text-lead text-mist">
            A few projects that show how we think and build.
          </p>
        </div>

        {/* Selected Work Panels (Section 6.7 alternating layout) */}
        <div className="space-y-16 md:space-y-24">
          {projectsData.map((project, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <div
                key={project.slug}
                className={cn(
                  'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center py-8 border-b border-line last:border-b-0'
                )}
              >
                {/* Text column */}
                <div
                  className={cn(
                    'lg:col-span-5 space-y-6',
                    isReversed && 'lg:col-start-8 lg:order-2'
                  )}
                >
                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-wider text-blue font-semibold">
                      {project.sector}
                    </span>
                    <h2 className="text-h2 text-ink">
                      {project.name}
                    </h2>
                  </div>

                  <p className="text-body text-graphite">
                    {project.summary}
                  </p>

                  {/* Services used tags */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.services.map((serviceName) => (
                      <span
                        key={serviceName}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-snow border border-line text-graphite"
                      >
                        {serviceName}
                      </span>
                    ))}
                    {project.slug === 'smarthire' && (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-tint text-blue">
                        Engineering final-year project
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-3">
                    <Button
                      href={`/work/${project.slug}`}
                      variant="primary"
                    >
                      View case study
                    </Button>
                    <OutboundLink
                      href={project.liveUrl}
                      label={project.name}
                      className="min-h-[44px] inline-flex items-center text-sm font-medium text-graphite hover:text-blue transition-colors underline underline-offset-4"
                    >
                      Visit site
                    </OutboundLink>
                  </div>
                </div>

                {/* Visual / Screenshot in CSS browser window frame */}
                <div
                  className={cn(
                    'lg:col-span-7',
                    isReversed && 'lg:col-start-1 lg:order-1'
                  )}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="group block rounded-2xl border border-line bg-paper overflow-hidden shadow-floating hover:border-blue/50 transition-all duration-300"
                  >
                    {/* Browser Chrome Header */}
                    <div className="h-9 px-4 border-b border-line bg-snow/80 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-line" />
                      <div className="w-2.5 h-2.5 rounded-full bg-line" />
                      <div className="w-2.5 h-2.5 rounded-full bg-line" />
                      <div className="mx-auto text-[11px] font-mono text-mist truncate max-w-[240px]">
                        {project.liveUrl.replace(/^https?:\/\//, '')}
                      </div>
                    </div>

                    {/* Screenshot Container */}
                    <div className="relative aspect-[16/10] bg-snow overflow-hidden">
                      {project.slug ? (
                        <Image
                          src={project.coverImage || `/work/${project.slug}/cover.png`}
                          alt={`${project.name} website preview`}
                          fill
                          className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          sizes="(max-width: 1024px) 100vw, 55vw"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-mist font-medium">
                          Preview coming soon
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Want to be next? Block */}
        <div className="mt-20 pt-16 border-t border-line text-center max-w-xl mx-auto space-y-5">
          <h2 className="text-h2 text-ink">
            Want to be next?
          </h2>
          <p className="text-lead text-mist">
            Tell us about your project. The first call is free and there is no pressure.
          </p>
          <div className="pt-2">
            <Button href="/book-a-call" variant="primary">
              Book a free call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
