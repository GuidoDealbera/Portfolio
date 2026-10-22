import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { projects } from "@/content/projects";
import { channelHref } from "@/content/site";
import { ProjectCard } from "@/features/projects/project-card";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function Work() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { work, projectPage } = dict;
  const labels = {
    viewCase: work.viewCase,
    privateRepo: work.privateRepo,
    stack: projectPage.stack,
    contexts: projectPage.contexts,
    statuses: projectPage.statuses,
  };

  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <Container>
        <SectionHead id="work-title" kicker={work.kicker} title={work.title}>
          <p className="mt-4 max-w-[56ch] text-[17px] text-dust">{work.body}</p>
        </SectionHead>

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              locale={locale}
              labels={labels}
              // Con cantidad impar, la primera ocupa el ancho completo y las demás quedan de a dos.
              featured={index === 0 && projects.length % 2 === 1}
              delay={index * 0.09}
            />
          ))}
        </div>

        <Reveal className="mt-10">
          <ButtonLink
            href={channelHref("github")}
            variant="secondary"
            target="_blank"
            rel="noreferrer"
            icon="github"
            trailingIcon="arrowUpRight"
          >
            {work.cta}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  );
}
