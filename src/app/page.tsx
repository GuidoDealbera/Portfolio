import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { site } from "@/content/site";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]">
      <section className="pt-[clamp(112px,18vh,180px)] pb-[clamp(72px,13vh,128px)]">
        {site.availableForFreelance && (
          <Reveal y={10}>
            <span className="soft-accent inline-flex items-center gap-2.5 rounded-full border border-accent/30 px-3.5 py-1.5 text-xs font-semibold tracking-[0.1em] text-accent uppercase">
              <span aria-hidden="true" className="relative block size-[7px] rounded-full bg-accent">
                <span className="absolute -inset-1 animate-ping-soft rounded-full border border-accent" />
              </span>
              Agenda abierta para proyectos
            </span>
          </Reveal>
        )}

        <SplitText
          className="mt-6 max-w-[15ch] font-display text-[clamp(38px,7.4vw,86px)] leading-[1.03] font-bold tracking-[-0.035em]"
          segments={[{ text: site.headline.lead }, { text: site.headline.highlight, className: "text-accent" }]}
        />

        <Reveal delay={0.5}>
          <p className="mt-7 max-w-[54ch] text-[clamp(16px,1.6vw,19px)] leading-[1.7] text-dust">
            {site.role}. <b className="font-bold text-chalk">{site.stack.core.join(", ").replace(/, ([^,]*)$/, " y $1")}.</b>{" "}
            {site.yearsOfExperience} años llevando ideas a producción — hoy en {site.currentRole.company}, y con lugar en
            la agenda para proyectos independientes.
          </p>
        </Reveal>

        <Reveal delay={0.65} className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <a
              href="#trabajo"
              className="group inline-flex items-center gap-2.5 rounded-[10px] bg-accent px-6.5 py-4 font-bold leading-none text-on-accent transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,var(--color-chalk))]"
            >
              Ver mi trabajo
              <span aria-hidden="true" className="transition-transform duration-300 ease-chalk group-hover:translate-x-1">
                →
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contacto"
              className="inline-flex items-center rounded-[10px] border border-line-strong px-6.5 py-4 font-bold leading-none text-chalk transition-colors duration-300 hover:border-dust hover:bg-surface"
            >
              Hablemos de tu proyecto
            </a>
          </Magnetic>
          <a
            href={site.cv}
            download
            className="px-1.5 py-4 font-bold leading-none text-dust transition-colors duration-300 hover:text-accent"
          >
            Descargar CV
          </a>
        </Reveal>

        <Reveal delay={0.8}>
          <ul className="mt-11 flex flex-wrap gap-x-5.5 gap-y-2 border-t border-line pt-5.5 text-[13px] text-dust">
            {[`${site.location}`, `Remoto · ${site.timezone}`, site.languages, site.education.degree].map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-accent/65" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>
    </main>
  );
}
