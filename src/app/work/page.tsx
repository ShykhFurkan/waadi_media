import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { projectsData } from '@/data/projects';

export const metadata: Metadata = {
  title: 'Our Work - Waadi Media',
  description:
    'Websites and software we built for a Kashmir tour operator, an education consultancy and an AI hiring platform.',
};

export default function WorkPage() {
  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-5xl mx-auto">
      <h1 className="text-h1 mb-4 text-ink">Work we&apos;re proud of</h1>
      <p className="text-lead text-mist mb-12">
        A few projects that show how we think and build.
      </p>

      <div className="space-y-12">
        {projectsData.map((project) => (
          <div key={project.slug} className="p-8 bg-paper border border-line rounded-3xl">
            <span className="text-xs uppercase tracking-wider text-blue font-semibold">{project.sector}</span>
            <h2 className="text-h2 text-ink mt-1 mb-3">{project.name}</h2>
            <p className="text-body text-graphite mb-6">{project.summary}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.services.map((s) => (
                <span key={s} className="px-3 py-1 bg-blue-tint text-blue text-xs rounded-md">
                  {s}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <Link
                href={`/work/${project.slug}`}
                className="text-sm font-medium text-blue hover:text-blue-deep"
              >
                View case study
              </Link>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-graphite hover:text-ink"
              >
                Visit live site
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
