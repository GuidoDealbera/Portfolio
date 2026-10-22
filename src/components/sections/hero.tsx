import { Magnetic } from "@/components/motion/magnetic";
import { Intro } from "@/components/motion/intro";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function Hero() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { hero } = dict;

  const facts = [`${site.place.city}, ${site.place.region}`, hero.remote(site.timezone), hero.languages, hero.degree];

  return (
    <section aria-labelledby="hero-title" className="pt-[clamp(112px,18vh,180px)] pb-section">
      <Container>
        {site.availableForFreelance && (
          <Intro rise="10px">
            <span className="soft-accent inline-flex items-center gap-2.5 rounded-full border border-accent/30 px-3.5 py-1.5 text-xs font-semibold tracking-widest text-accent uppercase">
              <span aria-hidden="true" className="relative block size-1.75 rounded-full bg-accent">
                <span className="absolute -inset-1 animate-ping-soft rounded-full border border-accent" />
              </span>
              {hero.availability}
            </span>
          </Intro>
        )}

        {/* El titular es una frase larga: el tamaño y el ancho están ajustados para que la
            primera pantalla siga entrando completa desde 720 px de alto. */}
        <SplitText
          id="hero-title"
          className="mt-6 max-w-[24ch] font-display text-[clamp(32px,4.8vw,62px)] leading-[1.06] font-bold tracking-[-0.035em]"
          segments={[{ text: hero.headline.lead }, { text: hero.headline.highlight, className: "text-accent" }]}
        />

        <Intro delay={0.5}>
          <p className="mt-6 max-w-[62ch] text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-dust">{hero.lede}</p>
        </Intro>

        <Intro delay={0.58}>
          <ul aria-label={hero.strengthsLabel} className="mt-5 flex flex-wrap gap-2">
            {hero.strengths.map((strength) => (
              <li key={strength} className="rounded-full bg-raised px-3 py-1 text-[13px] font-semibold text-chalk">
                {strength}
              </li>
            ))}
          </ul>
        </Intro>

        <Intro delay={0.65} className="mt-8 flex flex-wrap items-center gap-3">
          <Magnetic>
            <ButtonLink href="#contact" arrow>
              {hero.ctaContact}
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href="#work" variant="secondary">
              {hero.ctaWork}
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={site.cv[locale]} variant="ghost" download>
            {hero.ctaCv}
          </ButtonLink>
        </Intro>

        <Intro delay={0.8}>
          <ul className="mt-10 flex flex-wrap gap-x-5.5 gap-y-2 border-t border-line pt-5 text-[13px] text-dust">
            {facts.map((fact) => (
              <li key={fact} className="inline-flex items-center gap-2">
                <span aria-hidden="true" className="size-1 rounded-full bg-accent/65" />
                {fact}
              </li>
            ))}
          </ul>
        </Intro>
      </Container>
    </section>
  );
}
