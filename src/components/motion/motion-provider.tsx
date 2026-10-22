"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/** Con reduced motion del sistema, Motion apaga solo todas las animaciones de transform. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
