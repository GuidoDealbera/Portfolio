import type { ProjectStatus } from "@/content/projects";
import { cn } from "@/lib/cn";

type StatusLabelProps = {
  status: ProjectStatus;
  label: string;
  className?: string;
};

/**
 * Estado del proyecto con un punto delante: tiza amarilla si está en uso
 * (producción o piloto), gris si todavía no. El punto es decorativo, porque el
 * texto ya dice lo mismo; no transmite nada que dependa sólo del color.
 * Lo que está en uso late, como el aviso de disponibilidad del inicio.
 */
export function StatusLabel({ status, label, className }: StatusLabelProps) {
  const inUse = status === "live" || status === "pilot";
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span aria-hidden="true" className={cn("relative size-1.5 shrink-0 rounded-full", inUse ? "bg-accent" : "bg-dust")}>
        {inUse && <span className="absolute -inset-1 animate-ping-soft rounded-full border border-accent" />}
      </span>
      {label}
    </span>
  );
}
