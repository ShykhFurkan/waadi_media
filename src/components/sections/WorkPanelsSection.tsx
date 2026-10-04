import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projectsData } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { Sticker } from '@/components/ui/Sticker';
import { OutboundLink } from '@/components/ui/OutboundLink';
import { Container } from '@/components/layout/Container';
import { StickerIcon } from '@/components/illustrations/StickerSprite';

export function WorkPanelsSection() {
  const tileColors: ('saffron' | 'almond' | 'mint')[] = ['saffron', 'almond', 'mint'];
  const rotations: (-1.5 | 1.5 | -1)[] = [-1.5, 1.5, -1];
  const sectorIcons = ['crocus', 'blossom', 'bolt'] as const;

  return (
    <section id="work" className="py-24 sm:py-32 bg-paper relative">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-block mb-3">
              <Sticker color="white" rotate={-2} icon={<StickerIcon name="star" size={16} />}>
                Recent Projects
              </Sticker>
            </div>
            <h2 className="text-h2 text-ink">
              WORK WE&apos;RE PROUD OF.
            </h2>
            <p className="text-lead mt-2">
              Three systems engineered specifically for Kashmir&apos;s commercial landscape.
            </p>
          </div>
          <div>
            <Button href="/work" variant="outline">
              View all work
            </Button>
          </div>
        </div>

        {/* Three Big Bento Tiles (Saffron, Almond, Mint) */}
        <div className="space-y-12 sm:space-y-16">
          {projectsData.map((project, index) => {
            const color = tileColors[index % tileColors.length];
            const rotate = rotations[index % rotations.length];
            const iconName = sectorIcons[index % sectorIcons.length];

            const colorBgClasses = {
              saffron: 'bg-saffron',
              almond: 'bg-almond',
              mint: 'bg-mint',
            }[color];

            return (
              <div
                key={project.slug}
                style={{ transform: `rotate(${rotate}deg)` }}
                className={`tile-neo ${colorBgClasses} text-ink p-7 sm:p-10 rounded-[20px] border-[3px] border-ink shadow-hard-md hover:shadow-hard-lg transition-transform duration-200`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Project Details & Stickers (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <Sticker color="white" rotate={1} icon={<StickerIcon name={iconName} size={16} />}>
                        {project.sector}
                      </Sticker>
                      {project.badge && (
                        <span className="font-display font-black text-xs uppercase px-3 py-1 rounded-full bg-paper border-2 border-ink shadow-hard-sm">
                          {project.badge}
                        </span>
                      )}
                    </div>

                    <Link href={`/work/${project.slug}`} className="block group">
                      <h3 className="text-h2 text-ink group-hover:underline decoration-[3px] underline-offset-4">
                        {project.name}
                      </h3>
                    </Link>

                    <p className="text-body font-medium">
                      {project.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.services.map((serviceName) => (
                        <span
                          key={serviceName}
                          className="px-3 py-1 rounded-full bg-white border-2 border-ink text-xs font-display font-black uppercase shadow-hard-sm"
                        >
                          {serviceName}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-6 pt-4">
                      <Link
                        href={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1 font-display font-black text-sm uppercase underline decoration-[3px] underline-offset-4 hover:text-chinar transition-colors"
                      >
                        <span>Read case study</span>
                        <span>→</span>
                      </Link>
                      <OutboundLink
                        href={project.liveUrl}
                        label={project.name}
                        className="inline-flex items-center gap-1 font-display font-black text-sm uppercase text-ink/80 hover:text-ink transition-colors"
                      >
                        <span>Visit site</span>
                        <span>↗</span>
                      </OutboundLink>
                    </div>
                  </div>

                  {/* Right: Thick-Bordered Browser Frame (7 cols) */}
                  <div className="lg:col-span-7">
                    <div className="rounded-[16px] overflow-hidden border-[3px] border-ink bg-white shadow-hard-md">
                      {/* Browser Chrome Bar */}
                      <div className="h-10 bg-paper-2 border-b-[3px] border-ink px-4 flex items-center justify-between select-none">
                        <div className="flex items-center gap-2" aria-hidden="true">
                          <span className="w-3 h-3 rounded-full bg-chinar border-[1.5px] border-ink" />
                          <span className="w-3 h-3 rounded-full bg-saffron border-[1.5px] border-ink" />
                          <span className="w-3 h-3 rounded-full bg-mint border-[1.5px] border-ink" />
                        </div>
                        <div className="h-6 bg-white rounded-full border-2 border-ink px-4 text-xs font-mono font-bold text-ink flex items-center justify-center max-w-xs truncate">
                          {project.liveUrl.replace('https://', '').replace(/\/$/, '')}
                        </div>
                        <div className="w-6" />
                      </div>

                      {/* Mockup Preview */}
                      <div className="relative aspect-[16/10] w-full bg-paper overflow-hidden">
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
                            alt={`${project.name} preview`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 55vw"
                            className="object-cover object-top"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-display font-bold text-sm text-ink/60">
                            Preview Coming Soon
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
