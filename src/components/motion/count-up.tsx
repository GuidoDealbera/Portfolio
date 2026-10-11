"use client";

import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

type CountUpProps = {
  to: number;
  /** Cantidad de decimales a mostrar. */
  decimals?: number;
  /** Idioma del formato numérico: 3,5 en "es", 3.5 en "en". */
  locale: string;
  /** Segundos. */
  duration?: number;
};

/**
 * Cuenta desde cero cuando entra en pantalla, una sola vez.
 * El servidor renderiza el valor final: sin JS, con reduced motion o para un
 * buscador, el número que se lee es el correcto. Sólo con JS se rebobina a 0.
 */
export function CountUp({ to, decimals = 0, locale, duration = 1.1 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduceMotion = useReducedMotion();

  const format = useMemo(
    () => new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }),
    [locale, decimals],
  );
  const value = useMotionValue(to);
  const text = useTransform(value, (current) => format.format(current));

  useEffect(() => {
    if (!reduceMotion) value.set(0);
  }, [reduceMotion, value]);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(value, to, { duration, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, reduceMotion, value, to, duration]);

  return (
    <motion.span ref={ref} className="tabular-nums">
      {text}
    </motion.span>
  );
}
