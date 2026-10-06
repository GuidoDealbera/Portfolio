"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { chalkEase } from "./ease";

const tags = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  li: motion.li,
  p: motion.p,
};

type RevealProps = {
  children: ReactNode;
  as?: keyof typeof tags;
  /** Segundos. Para escalonar hermanos: 0, 0.09, 0.18… */
  delay?: number;
  /** Cuánto sube al entrar, en px. */
  y?: number;
  className?: string;
};

/**
 * Revelado progresivo: el contenido entra desenfocado y sube al foco cuando
 * el viewport lo alcanza. Una sola vez — no se re-anima al volver a scrollear.
 */
export function Reveal({ children, as = "div", delay = 0, y = 30, className }: RevealProps) {
  const Tag = tags[as];

  return (
    <Tag
      data-reveal
      className={className}
      initial={{ opacity: 0, filter: "blur(14px)", y }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px", amount: 0.12 }}
      transition={{ duration: 0.95, ease: chalkEase, delay }}
    >
      {children}
    </Tag>
  );
}
