import { site } from "@/content/site";

function Group() {
  return (
    <div className="flex shrink-0 items-center gap-11 pr-11">
      {site.stack.marquee.map((name) => (
        <span key={name} className="flex items-center gap-11">
          <span className="font-display text-[clamp(17px,2.2vw,26px)] font-medium tracking-[-0.02em] whitespace-nowrap text-dust transition-colors duration-300 hover:text-accent">
            {name}
          </span>
          <span className="text-accent/50">◦</span>
        </span>
      ))}
    </div>
  );
}

/**
 * Decorativa: el stack real y legible está en "Sobre mí". Se oculta a los
 * lectores de pantalla y con reduced motion queda quieta.
 */
export function Marquee() {
  return (
    <div aria-hidden="true" className="group fade-edges overflow-hidden border-y border-line py-5">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Group />
        <Group />
      </div>
    </div>
  );
}
