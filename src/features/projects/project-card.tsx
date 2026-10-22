import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { TiltCard } from "@/components/motion/tilt-card";
import type { Project, ProjectContext, ProjectStatus } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { ProjectCover } from "./project-cover";
import { StatusLabel } from "./status-label";

type ProjectCardProps = {
  project: Project;
  locale: Locale;
  labels: {
    viewCase: string;
    privateRepo: string;
    stack: string;
    contexts: Record<ProjectContext, string>;
    statuses: Record<ProjectStatus, string>;
  };
  /** Ocupa las dos columnas. */
  featured?: boolean;
  /** Segundos de retraso del revelado, para escalonar las tarjetas. */
  delay?: number;
};

export function ProjectCard({ project, locale, labels, featured = false, delay = 0 }: ProjectCardProps) {
  const copy = project.copy[locale];

  return (
    <Reveal as="article" delay={delay} className={cn("group", featured && "md:col-span-2")}>
      <TiltCard className="h-full">
        <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-500 group-hover:border-accent/40 group-hover:shadow-[0_24px_60px_-34px_rgb(0_0_0/0.75)] has-focus-visible:outline-2 has-focus-visible:outline-offset-4 has-focus-visible:outline-accent">
          <ProjectCover project={project} locale={locale} featured={featured} />

          <div className="flex flex-1 flex-col p-6">
            <p className="mb-3 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] font-bold tracking-[0.12em] uppercase">
              <span className="text-accent">{labels.contexts[project.context]}</span>
              <span aria-hidden="true" className="text-dust">
                ·
              </span>
              <StatusLabel status={project.status} label={labels.statuses[project.status]} className="text-dust" />
            </p>
            <h3 className="font-display text-[clamp(20px,2.4vw,27px)] font-semibold tracking-tight">
              {/* Link "estirado": toda la tarjeta es clicable, pero hay un solo enlace para teclado y lectores de pantalla. */}
              <Link
                href={`/${locale}/projects/${project.slug}`}
                className="outline-none after:absolute after:inset-0 after:content-['']"
              >
                {copy.title}
              </Link>
            </h3>
            <p className="mt-2 max-w-[58ch] text-[15px] leading-[1.6] text-dust">{copy.summary}</p>

            <ul className="mt-4 flex flex-wrap gap-2" aria-label={labels.stack}>
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-md border border-line px-2.5 py-1 text-[12px] font-semibold text-dust">
                  {tech}
                </li>
              ))}
            </ul>

            <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4 text-[13px] text-dust">
              <span className="tabular-nums">
                {project.year}
                {!project.links.repo && ` · ${labels.privateRepo}`}
              </span>
              <span className="inline-flex items-center gap-1.5 font-bold text-chalk">
                {labels.viewCase}
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-chalk group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </div>
          </div>
        </div>
      </TiltCard>
    </Reveal>
  );
}
