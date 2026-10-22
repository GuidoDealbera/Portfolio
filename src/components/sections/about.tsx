import Image from "next/image";
import { CountUp } from "@/components/motion/count-up";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { site } from "@/content/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

type StackGroup = keyof typeof site.stack.groups;

export async function About() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { about } = dict;
  const groups = Object.entries(site.stack.groups) as [StackGroup, readonly string[]][];

  return (
    <section id="about" aria-labelledby="about-title" className="py-section">
      <Container className="grid gap-[clamp(28px,5vw,64px)] md:grid-cols-[1.15fr_0.85fr] md:items-start">
        <div>
          <SectionHead id="about-title" kicker={about.kicker} title={about.title} underline={1} />
          <Reveal className="flex flex-col gap-5">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="max-w-[58ch] text-[17px] leading-[1.78] text-dust">
                {paragraph}
              </p>
            ))}
            <div className="mt-2">
              <ButtonLink href={site.cv[locale]} variant="secondary" download>
                {about.ctaCv}
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="flex flex-col gap-8">
          {/* Sólo si hay foto cargada en site.ts. Ancho y alto reales reservan el lugar: no hay salto al cargar. */}
          {site.photo && (
            <Image
              src={site.photo.src}
              alt={about.photoAlt}
              width={site.photo.width}
              height={site.photo.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-auto w-full rounded-[14px] border border-line"
            />
          )}

          <div className="rounded-[14px] border border-line bg-surface/60 p-6">
            <p className="font-display text-[clamp(44px,6vw,68px)] leading-none font-bold tracking-[-0.04em]">
              <CountUp to={site.yearsOfExperience} decimals={1} locale={locale} />
            </p>
            <p className="mt-2 text-sm text-dust">{about.experienceLabel}</p>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">{about.stackTitle}</h3>
            {/* Columna de rótulos de 124 px: el más largo ("Herramientas") es una sola palabra y no puede partirse. */}
            <dl className="mt-3 divide-y divide-line border-y border-line">
              {groups.map(([group, items]) => (
                <div key={group} className="grid gap-2 py-4 sm:grid-cols-[124px_1fr]">
                  <dt className="pt-1 text-xs font-bold tracking-[0.14em] text-dust uppercase">{about.groups[group]}</dt>
                  <dd className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <span key={item} className="rounded-md border border-line px-2.5 py-1 text-[13px] font-semibold">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
