"use client";

import { motion, stagger, type Variants } from "motion/react";
import type { ComponentProps, ReactNode } from "react";
import { chalkEase } from "./ease";

const groups = { ul: motion.ul, ol: motion.ol, div: motion.div, dd: motion.dd };
const items = { li: motion.li, span: motion.span, div: motion.div, p: motion.p };

type StaggerProps = Pick<ComponentProps<"ul">, "className" | "aria-label"> & {
  as?: keyof typeof groups;
  /** Segundos entre un hijo y el siguiente. */
  step?: number;
  /** Segundos antes del primero. */
  delay?: number;
  children: ReactNode;
};

/**
 * Lista que entra de a un elemento cuando aparece en pantalla: cada hijo es un <StaggerItem>.
 * Como <Reveal>, una sola vez; sin JS o con reduced motion, el CSS global la muestra completa.
 */
export function Stagger({ as = "ul", step = 0.05, delay = 0, children, ...props }: StaggerProps) {
  const Tag = groups[as] as typeof motion.ul;
  return (
    <Tag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={{ hidden: {}, visible: { transition: { delayChildren: stagger(step, { startDelay: delay }) } } }}
      {...props}
    >
      {children}
    </Tag>
  );
}

/** Cómo entra cada elemento: el mismo desenfoque que sube a foco de <Reveal>, en chico. */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: chalkEase } },
};

type StaggerItemProps = Pick<ComponentProps<"li">, "className"> & {
  as?: keyof typeof items;
  children: ReactNode;
};

export function StaggerItem({ as = "li", children, ...props }: StaggerItemProps) {
  const Tag = items[as] as typeof motion.li;
  return (
    <Tag data-reveal variants={staggerItem} {...props}>
      {children}
    </Tag>
  );
}

/** El guion de tiza de una lista: se traza de izquierda a derecha cuando entra su elemento. */
export function StaggerDash({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden="true"
      data-reveal
      className={className}
      style={{ originX: 0 }}
      variants={{
        hidden: { scaleX: 0 },
        visible: { scaleX: 1, transition: { duration: 0.7, ease: chalkEase, delay: 0.15 } },
      }}
    />
  );
}
