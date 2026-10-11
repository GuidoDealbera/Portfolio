"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Inclinación máxima en grados cuando el puntero está en el borde. */
  maxTilt?: number;
};

const spring = { stiffness: 200, damping: 22, mass: 0.5 };

/** La tarjeta se inclina hacia el puntero y se eleva un poco. Sólo con mouse: nunca en táctil ni con reduced motion. */
export function TiltCard({ children, className, maxTilt = 4.5 }: TiltCardProps) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0); // -0.5 .. 0.5 respecto del centro
  const pointerY = useMotionValue(0);
  const rotateY = useSpring(useTransform(pointerX, (value) => value * maxTilt * 2), spring);
  const rotateX = useSpring(useTransform(pointerY, (value) => -value * maxTilt * 2), spring);
  const lift = useSpring(0, spring);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    lift.set(-5);
  }

  function onPointerLeave() {
    pointerX.set(0);
    pointerY.set(0);
    lift.set(0);
  }

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        className="h-full [transform-style:preserve-3d]"
        style={{ rotateX, rotateY, y: lift }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {children}
      </motion.div>
    </div>
  );
}
