import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { OutboundLink } from '@/components/ui/OutboundLink';
import { Container } from '@/components/layout/Container';

export function WorkPanelsSection() {
  return (
    <section id="work" className="py-24 sm:py-32 bg-snow border-t border-line">
      <Container>
        {/* Asymmetric Section Header: Heading in cols 1-5, lead in cols 7-12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end mb-16 sm:mb-24">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-widest text-mist font-semibold block mb-3">
              Selected Projects
            </span>
            <h2 className="text-h2 text-ink">
              Work engineered for Kashmir&apos;s commercial market.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col items-start gap-4">
            <p className="text-lead text-graphite">
              Fast loading, clear pricing, and built with local context. Here are three recent systems we delivered.
            </p>
            <Button href="/work" variant="text">
              View all work
            </Button>
          </div>
        </div>

        {/* Large Editorial Project Rows */}
        <div className="divide-y divide-line border-y border-line">
          {projectsData.map((project, index) => (
            <div
              key={project.slug}
              className="group relative py-10 sm:py-16 transition-colors duration-300 hover:bg-pearl/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Row Number & Project Details (Cols 1-7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-mist font-medium uppercase tracking-widest">
                      0{index + 1}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-mist">
                      {project.sector}
                    </span>
                    {project.badge && (
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-blue-tint text-blue font-medium">
                        {project.badge}
                      </span>
                    )}
                  </div>

                  <Link href={`/work/${project.slug}`} className="block group">
                    <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-medium text-ink group-hover:text-blue transition-colors">
                      {project.name}
                    </h3>
                  </Link>

                  <p className="text-body text-graphite max-w-xl">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 pt-2">
                    <Link
                      href={`/work/${project.slug}`}
                      className="text-sm font-medium text-blue hover:text-blue-deep transition-colors"
                    >
                      Read case study
                    </Link>
                    <OutboundLink
                      href={project.liveUrl}
                      label={project.name}
                      className="text-sm font-medium text-graphite hover:text-ink transition-colors flex items-center gap-1"
                    >
                      <span>Visit site</span>
                      <span className="text-xs text-mist">↗</span>
                    </OutboundLink>
                  </div>
                </div>

                {/* Right: Media Thumbnail / Preview (Cols 8-12) */}
                <div className="lg:col-span-5">
                  <Link href={`/work/${project.slug}`} className="block group">
                    <div className="relative aspect-[16/10] w-full rounded-[28px] overflow-hidden bg-paper border border-line shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]">
                      {project.video?.mp4 || project.video?.webm ? (
                        <video
                          muted
                          loop
                          playsInline
                          preload="none"
                          poster={project.coverImage}
                          className="w-full h-full object-cover object-top"
                        >
                          {project.video.webm && (
                            <source src={project.video.webm} type="video/webm" />
                          )}
                          {project.video.mp4 && (
                            <source src={project.video.mp4} type="video/mp4" />
                          )}
                        </video>
                      ) : project.coverImage ? (
                        <Image
                          src={project.coverImage}
                          alt={`${project.name} website preview`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover object-top"
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
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
