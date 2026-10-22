"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { chalkEase } from "./ease";

// Trazos a mano alzada: ninguno es una línea recta, como cuando se subraya en el pizarrón.
const strokes = [
  "M2 8 C 48 2, 96 11, 148 6 S 252 1, 298 7",
  "M2 7 C 60 12, 110 2, 162 8 S 250 10, 298 5",
  "M2 6 C 40 10, 120 3, 170 7 S 260 9, 298 4",
] as const;

type ChalkUnderlineProps = {
  variant?: 0 | 1 | 2;
  className?: string;
};

/** Subrayado de tiza que se dibuja de izquierda a derecha al entrar en pantalla. */
export function ChalkUnderline({ variant = 0, className }: ChalkUnderlineProps) {
  return (
    <svg
      viewBox="0 0 300 12"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn("block h-3 w-[min(280px,72%)] overflow-visible", className)}
    >
      <motion.path
        d={strokes[variant]}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeOpacity={0.85}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, ease: chalkEase, delay: 0.15 }}
      />
    </svg>
  );
}
