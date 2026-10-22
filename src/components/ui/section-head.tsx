import type { ReactNode } from "react";
import { ChalkUnderline } from "@/components/motion/chalk-underline";
import { Reveal } from "@/components/motion/reveal";

type SectionHeadProps = {
  /** Id del `<h2>`; la `<section>` lo referencia con aria-labelledby. */
  id: string;
  kicker: string;
  title: string;
  /** Qué trazo de tiza se dibuja debajo del título. */
  underline?: 0 | 1 | 2;
  children?: ReactNode;
};

export function SectionHead({ id, kicker, title, underline = 0, children }: SectionHeadProps) {
  return (
    <Reveal className="mb-[clamp(36px,6vw,64px)] max-w-[62ch]">
      <p className="flex items-center gap-3 text-xs font-bold tracking-[0.16em] text-accent uppercase before:h-px before:w-7 before:bg-accent/60">
        {kicker}
      </p>
      <h2
        id={id}
        className="mt-4 font-display text-[clamp(28px,4.6vw,50px)] leading-[1.08] font-semibold tracking-[-0.03em]"
      >
        {title}
      </h2>
      <ChalkUnderline variant={underline} className="mt-1.5" />
      {children}
    </Reveal>
  );
}
