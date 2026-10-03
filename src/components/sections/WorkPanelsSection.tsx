'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { ImageWipe } from '@/components/ui/MotionHelpers';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { trackEvent } from '@/lib/analytics';

export function WorkPanelsSection() {
  return (
    <section id="work" className="py-20 md:py-28 bg-snow border-t border-line">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="text-h2 text-ink mb-2">Work we&apos;re proud of.</h2>
            <p className="text-lead text-mist">
              A few projects that show how we think and build.
            </p>
          </div>
          <div>
            <Button href="/work" variant="text">
              View all work
            </Button>
          </div>
        </div>

        {/* Selected Work Alternating Panels */}
        <div className="space-y-20 md:space-y-28">
          {projectsData.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={project.slug}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Panel (7 cols): CSS Browser Window with Clip-path Wipe */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <ImageWipe delay={index * 0.1}>
                    <div className="group relative rounded-[28px] overflow-hidden bg-paper border border-line shadow-floating">
                      {/* CSS Browser Window Chrome */}
                      <div className="h-10 bg-snow border-b border-line px-4 flex items-center gap-2 select-none">
                        <div className="flex items-center gap-1.5" aria-hidden="true">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E1E7F0]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E1E7F0]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#E1E7F0]" />
                        </div>
                        <div className="flex-1 mx-3">
                          <div className="max-w-xs mx-auto h-5 bg-paper rounded-full border border-line text-[11px] text-mist flex items-center justify-center font-mono truncate px-3">
                            {project.liveUrl.replace('https://', '').replace(/\/$/, '')}
                          </div>
                        </div>
                      </div>

                      {/* Mockup Image container with 1.03x hover zoom per Section 6.8 */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-snow">
                        <Image
                          src={project.coverImage}
                          alt={`${project.name} website preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover object-top transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </ImageWipe>
                </div>

                {/* Text Content Panel (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-5 ${
                    isReversed ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>{project.sector}</Badge>
                    {project.badge && (
                      <span className="text-xs text-mist font-medium">
                        ({project.badge})
                      </span>
                    )}
                  </div>

                  <h3 className="text-h2 text-ink">
                    {project.name}
                  </h3>

                  <p className="text-body text-graphite line-clamp-3">
                    {project.summary}
                  </p>

                  {/* Services Used */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.services.map((serviceName) => (
                      <span
                        key={serviceName}
                        className="px-2.5 py-1 rounded-[6px] bg-snow border border-line text-xs text-mist font-medium"
                      >
                        {serviceName}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="pt-3 flex items-center gap-6">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-sm font-medium text-blue hover:text-blue-deep transition-colors"
                    >
                      View case study
                    </Link>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent({
                          name: 'outbound_click',
                          params: { url: project.liveUrl, label: project.name },
                        })
                      }
                      className="text-sm font-medium text-graphite hover:text-ink transition-colors"
                    >
                      Visit site
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
