import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projectsData, getProjectBySlug } from '@/data/projects';

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
    description: project.summary,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-snow text-graphite p-8 max-w-4xl mx-auto">
      <Link href="/work" className="text-sm text-blue hover:text-blue-deep mb-8 inline-block">
        ← Back to our work
      </Link>

      <div className="mb-10">
        <span className="text-xs uppercase tracking-wider text-blue font-semibold">{project.sector}</span>
        <h1 className="text-h1 text-ink mt-2 mb-4">{project.name}</h1>
        <p className="text-lead text-graphite mb-6">{project.summary}</p>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue text-white rounded-full font-medium text-sm shadow-floating hover:bg-blue-deep transition-colors"
        >
          Visit live site ↗
        </a>
      </div>

      <div className="space-y-10 border-t border-line pt-8">
        <section>
          <h2 className="text-h3 text-ink mb-3">The Challenge</h2>
          <p className="text-body text-graphite">{project.challenge}</p>
        </section>

        <section>
          <h2 className="text-h3 text-ink mb-3">What We Did</h2>
          <p className="text-body text-graphite mb-4">{project.whatWeDid}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {project.highlights.map((h, idx) => (
              <li key={idx} className="p-3 bg-paper border border-line rounded-xl text-sm">
                {h}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
