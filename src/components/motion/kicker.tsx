"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { chalkEase } from "./ease";

type KickerProps = {
  children: ReactNode;
  className?: string;
};

/** La volanta de cada sección: la línea de tiza se traza antes de que se lea el texto. */
export function Kicker({ children, className }: KickerProps) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-accent uppercase", className)}>
      <motion.span
        aria-hidden="true"
        data-reveal
        className="h-px w-7 shrink-0 bg-accent/60"
        style={{ originX: 0 }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: chalkEase, delay: 0.25 }}
      />
      {children}
    </p>
  );
}
