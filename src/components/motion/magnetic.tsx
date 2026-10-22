"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { PointerEvent, ReactNode } from "react";

type MagneticProps = {
  children: ReactNode;
  /** Desplazamiento máximo en px cuando el puntero está en el borde. */
  strength?: number;
};

const spring = { stiffness: 260, damping: 18, mass: 0.4 };

/** El hijo se inclina hacia el cursor y vuelve con resorte al salir. Sólo con mouse, nunca en táctil. */
export function Magnetic({ children, strength = 12 }: MagneticProps) {
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  function onPointerMove(event: PointerEvent<HTMLSpanElement>) {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - rect.left) / rect.width - 0.5) * strength);
    y.set(((event.clientY - rect.top) / rect.height - 0.5) * strength * 0.66);
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      className="inline-flex"
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.span>
  );
}
