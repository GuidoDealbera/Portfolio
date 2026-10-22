import type { ReactNode } from "react";
import { ChalkUnderline } from "@/components/motion/chalk-underline";
import { Kicker } from "@/components/motion/kicker";
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
      <Kicker>{kicker}</Kicker>
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
