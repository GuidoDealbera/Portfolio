"use client";

import { motion, useInView, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { Icon, iconHover } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { Reveal } from "./reveal";

export type TimelineEntry = {
  id: string;
  when: string;
  title: string;
  body: string;
  href?: string;
};

function Entry({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  // El hito se enciende cuando la línea lo alcanza, no apenas asoma por abajo.
  const lit = useInView(ref, { once: true, margin: "0px 0px -30% 0px" });

  return (
    <li ref={ref} className="relative pb-10 pl-(--tl-pad) last:pb-0">
      <span
        aria-hidden="true"
        className={
          lit
            ? "absolute top-2.5 left-0.5 size-[9px] scale-125 rounded-full border-2 border-accent bg-accent transition-[transform,background-color,border-color] duration-500 ease-chalk"
            : "absolute top-2.5 left-0.5 size-[9px] rounded-full border-2 border-line-strong bg-board transition-[transform,background-color,border-color] duration-500 ease-chalk"
        }
      />
      <Reveal delay={index * 0.08}>
        <p className="text-[12.5px] font-bold tracking-[0.1em] text-accent uppercase">{entry.when}</p>
        <h3 className="mt-2 mb-1.5 font-display text-[21px] font-semibold tracking-[-0.02em]">
          {entry.href ? (
            <a
              href={entry.href}
              target="_blank"
              rel="noreferrer"
              className="group underline decoration-line-strong underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              {entry.title}
              <Icon
                name="arrowUpRight"
                className={cn("ml-1 inline size-[0.75em] align-baseline transition-transform duration-300 ease-chalk", iconHover.arrowUpRight)}
              />
            </a>
          ) : (
            entry.title
          )}
        </h3>
        <p className="max-w-[56ch] text-[15px] leading-[1.65] text-dust">{entry.body}</p>
      </Reveal>
    </li>
  );
}

/** Línea de tiempo vertical: el trazo se llena con el scroll y cada hito se enciende al alcanzarlo. */
export function Timeline({ items }: { items: readonly TimelineEntry[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative [--tl-pad:clamp(28px,5vw,56px)]">
      <span aria-hidden="true" className="absolute top-2 bottom-2 left-1.5 w-px bg-line" />
      <motion.span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-1.5 w-px origin-top bg-accent"
        style={{ scaleY }}
      />
      {items.map((entry, index) => (
        <Entry key={entry.id} entry={entry} index={index} />
      ))}
    </ol>
  );
}
