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

  const stack = new Intl.ListFormat(locale, { style: "long", type: "conjunction" }).format(site.stack.core);
  const years = new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(site.yearsOfExperience);
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

        <SplitText
          id="hero-title"
          className="mt-6 max-w-[15ch] font-display text-[clamp(38px,7.4vw,86px)] leading-[1.03] font-bold tracking-[-0.035em]"
          segments={[{ text: hero.headline.lead }, { text: hero.headline.highlight, className: "text-accent" }]}
        />

        <Intro delay={0.5}>
          <p className="mt-7 max-w-[54ch] text-[clamp(16px,1.6vw,19px)] leading-[1.7] text-dust">
            {hero.role}. <b className="font-bold text-chalk">{hero.ledeStack(stack)}</b>{" "}
            {hero.ledeRest({ years, company: site.career.company.name })}
          </p>
        </Intro>

        <Intro delay={0.65} className="mt-9 flex flex-wrap items-center gap-3">
          <Magnetic>
            <ButtonLink href="#work" arrow>
              {hero.ctaWork}
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href="#contact" variant="secondary">
              {hero.ctaContact}
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={site.cv} variant="ghost" download>
            {hero.ctaCv}
          </ButtonLink>
        </Intro>

        <Intro delay={0.8}>
          <ul className="mt-11 flex flex-wrap gap-x-5.5 gap-y-2 border-t border-line pt-5.5 text-[13px] text-dust">
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
