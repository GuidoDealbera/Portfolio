"use client";

import { motion, useScroll, useTransform } from "motion/react";

/** Cuadrícula de papel milimetrado que se desplaza más lento que el contenido. */
export function GraphPaper() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * -0.12);

  return (
    <motion.div
      aria-hidden="true"
      className="graph-paper pointer-events-none fixed inset-x-0 -inset-y-[10vh] z-0"
      style={{ y }}
    />
  );
}
