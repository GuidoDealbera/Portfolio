"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef } from "react";

type CountUpProps = {
  to: number;
  /** Segundos. */
  duration?: number;
};

/**
 * Cuenta desde cero cuando entra en pantalla, una sola vez.
 * El servidor ya renderiza el valor final: sin JS, o para un buscador, el número es el correcto.
 */
export function CountUp({ to, duration = 1.1 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    const node = ref.current;
    if (!inView || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (value) => {
        node.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {to}
    </span>
  );
}
