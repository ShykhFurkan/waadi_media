import Image from "next/image";
import { ExternalLink, ArrowUpRight, CheckCircle2 } from "lucide-react";

export interface ProjectData {
  title: string;
  category: string;
  url?: string;
  image: string;
  alt: string;
  description: string;
  outcomes: string[];
  tech: string[];
}

export function ProjectCard({ project }: { project: ProjectData }) {
  return (
    <div className="glass-card glass-card-hover group flex flex-col overflow-hidden rounded-3xl bg-white/85 backdrop-blur-2xl border border-slate-200/80 shadow-xl transition-all">
      {/* Project Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-900">
        <Image
          src={project.image}
          alt={project.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="inline-block rounded-full bg-slate-900/80 backdrop-blur-xl border border-white/20 px-3.5 py-1 text-xs font-bold text-white shadow-lg">
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-7 sm:p-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full p-2 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                title={`Visit ${project.title}`}
              >
                <ArrowUpRight className="h-5 w-5" />
              </a>
            )}
          </div>

          <p className="text-sm leading-relaxed text-slate-600">
            {project.description}
          </p>

          {/* Key Outcomes */}
          <div className="space-y-2 pt-2">
            {project.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-blue-600 shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Badges & Link */}
        <div className="space-y-4 pt-3 border-t border-slate-100">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 border border-slate-200/60"
              >
                {t}
              </span>
            ))}
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Visit Live Platform</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
