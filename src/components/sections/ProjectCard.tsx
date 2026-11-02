import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/projects";
import { Badge } from "@/components/ui/primitives";

const tone: Record<Project["status"], "forest" | "cobalt" | "gold" | "neutral"> = {
  production: "forest",
  live: "cobalt",
  functional: "gold",
  prototype: "neutral",
};

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  return (
    <article className={`card flex h-full flex-col p-6 ${large ? "sm:p-8" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <Badge tone={tone[project.status]}>{project.statusLabel}</Badge>
        <span className="font-mono text-[11px] text-muted">{project.period}</span>
      </div>
      <h3 className={`mt-4 font-display ${large ? "text-3xl" : "text-2xl"}`}>
        <Link href={`/projects/${project.slug}`} className="hover:underline underline-offset-4">
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-ink-soft">{project.oneLiner}</p>
      {large && (
        <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {project.evidence.slice(0, 3).map((e) => (
            <li key={e.label} className="rounded-lg bg-surface-2 px-3 py-2">
              <p className="text-[11px] uppercase tracking-wider text-muted">{e.label}</p>
              <p className="text-sm font-medium">{e.value}</p>
            </li>
          ))}
        </ul>
      )}
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Stack">
        {project.stack.slice(0, large ? 7 : 4).map((s) => (
          <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted">
            {s}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center gap-4 pt-5 text-sm">
        <Link href={`/projects/${project.slug}`} className="font-medium underline-offset-4 hover:underline">
          Case study
        </Link>
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-muted hover:text-ink">
            {project.liveLabel} <ArrowUpRight size={14} />
          </a>
        )}
      </div>
    </article>
  );
}
