import Image from "next/image";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import type { Project } from "@/content/projects";

type ProjectCoverProps = {
  project: Project;
  locale: Locale;
  /** Proporción más panorámica, para la tarjeta destacada. */
  featured?: boolean;
  className?: string;
};

/** Captura del proyecto o, si no hay, una portada generada con el año. El destello cruza al pasar el mouse. */
export function ProjectCover({ project, locale, featured = false, className }: ProjectCoverProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden border-b border-line bg-raised",
        featured ? "aspect-[16/8] md:aspect-[21/8]" : "aspect-[16/8]",
        // Destello que cruza la portada al hacer hover en la tarjeta.
        "after:absolute after:inset-0 after:-translate-x-full after:bg-[linear-gradient(115deg,transparent_38%,color-mix(in_srgb,var(--color-chalk)_12%,transparent)_50%,transparent_62%)] after:transition-transform after:duration-700 after:ease-chalk group-hover:after:translate-x-full",
        className,
      )}
    >
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt[locale]}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          className="size-full object-cover object-top"
        />
      ) : (
        <div
          aria-hidden="true"
          className="grid size-full place-items-center bg-[radial-gradient(120%_90%_at_18%_8%,color-mix(in_srgb,var(--color-accent)_24%,transparent),transparent_58%)]"
        >
          <span className="font-display text-[clamp(56px,11vw,128px)] leading-none font-bold tracking-[-0.05em] text-chalk/10 tabular-nums">
            {project.year}
          </span>
        </div>
      )}
    </div>
  );
}
