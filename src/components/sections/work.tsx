import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { channelHref } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * PROVISORIO. Los casos de estudio dependen del MD de proyectos de Guido.
 * Cuando llegue, esta sección pasa a ser la grilla de proyectos.
 */
export async function Work() {
  const { work } = await getDictionary();

  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <Container>
        <SectionHead id="work-title" kicker={work.kicker} title={work.title}>
          <p className="mt-4 max-w-[56ch] text-[17px] text-dust">{work.body}</p>
        </SectionHead>
        <Reveal>
          <ButtonLink href={channelHref("github")} variant="secondary" target="_blank" rel="noreferrer" arrow>
            {work.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
