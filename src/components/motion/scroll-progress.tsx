"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Barra fina arriba de todo que marca cuánto de la página llevás leído. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-[60] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
