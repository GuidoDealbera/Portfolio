import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Intro, introStyle } from "@/components/motion/intro";
import { Kicker } from "@/components/motion/kicker";
import { Reveal } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Stagger, StaggerDash, StaggerItem } from "@/components/motion/stagger";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Icon, iconHover } from "@/components/ui/icons";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { StatusLabel } from "@/features/projects/status-label";
import { hasLocale, localeTags, locales, otherLocale, defaultLocale } from "@/i18n/config";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

// `lang` lo aporta el layout; acá sólo se listan los proyectos.
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();

  const { title, summary } = project.copy[lang];
  const path = `/projects/${slug}`;

  return {
    title,
    description: summary,
    alternates: {
      canonical: `/${lang}${path}`,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}${path}`])),
        "x-default": `/${defaultLocale}${path}`,
      },
    },
    // `openGraph` se reemplaza entero respecto del layout, no se mezcla: hay que repetir lo común.
    openGraph: {
      type: "article",
      locale: localeTags[lang],
      alternateLocale: localeTags[otherLocale(lang)],
      url: `/${lang}${path}`,
      siteName: site.name,
      title,
      description: summary,
    },
    twitter: { card: "summary_large_image", title, description: summary },
  };
}

const sectionHeading = "font-display text-2xl font-semibold tracking-tight";

export default async function ProjectPage({ params }: PageProps<"/[lang]/projects/[slug]">) {
  const { slug } = await params;
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const project = getProject(slug);
  if (!project) notFound();

  const copy = project.copy[locale];
  const labels = dict.projectPage;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];

  const sections = [
    { id: "problem", title: labels.problem, body: copy.problem, list: false },
    { id: "decisions", title: labels.decisions, body: copy.decisions, list: true },
    { id: "result", title: labels.result, body: copy.result, list: false },
  ] as const;

  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <article>
        <header className="pt-[clamp(112px,16vh,160px)] pb-[clamp(40px,7vh,72px)]">
          <Container>
            <Intro rise="10px">
              <Link
                href={`/${locale}#work`}
                className="group inline-flex min-h-10 items-center gap-2 text-sm text-dust transition-colors duration-300 hover:text-accent"
              >
                <Icon name="arrowLeft" className={cn("transition-transform duration-300 ease-chalk", iconHover.arrowLeft)} />
                {labels.back}
              </Link>
            </Intro>

            <Intro delay={0.08} rise="10px">
              <Kicker className="mt-8">
                <span className="tabular-nums">{project.year}</span>
                <span aria-hidden="true">·</span>
                {labels.contexts[project.context]}
              </Kicker>
            </Intro>

            <SplitText
              as="h1"
              id="project-title"
              className="mt-5 max-w-[18ch] font-display text-[clamp(38px,6.6vw,76px)] leading-[1.05] font-bold tracking-[-0.035em]"
              segments={[{ text: copy.title }]}
            />

            <Intro delay={0.4}>
              <p className="mt-6 max-w-[56ch] text-[clamp(17px,1.8vw,21px)] leading-[1.65] text-dust">{copy.summary}</p>
            </Intro>

            {/* El rol va aparte y no en el renglón de arriba: en mayúsculas, un rol de dos líneas se vuelve ilegible. */}
            <Intro delay={0.48}>
              <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-5">
                <div className="max-w-[46ch]">
                  <dt className="text-xs font-bold tracking-[0.16em] text-dust uppercase">{labels.role}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.6]">{copy.role}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-[0.16em] text-dust uppercase">{labels.status}</dt>
                  <dd className="mt-2 text-[15px] leading-[1.6]">
                    <StatusLabel status={project.status} label={labels.statuses[project.status]} />
                  </dd>
                </div>
              </dl>
            </Intro>

            <Intro delay={0.55} className="mt-8 flex flex-wrap items-center gap-3">
              {project.links.live && (
                <ButtonLink href={project.links.live} target="_blank" rel="noreferrer" trailingIcon="arrowUpRight">
                  {labels.live}
                </ButtonLink>
              )}
              {project.links.repo ? (
                <ButtonLink href={project.links.repo} variant="secondary" target="_blank" rel="noreferrer" icon="github">
                  {labels.repo}
                </ButtonLink>
              ) : (
                <p className="text-sm text-dust">{labels.privateRepo}</p>
              )}
            </Intro>

            <ul aria-label={labels.stack} className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((tech, index) => (
                <li
                  key={tech}
                  className="animate-chalk-in cursor-default rounded-md border border-line px-2.5 py-1 text-[13px] font-semibold transition-[border-color,color,translate] duration-300 ease-chalk hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                  style={introStyle(0.65 + index * 0.05)}
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Container>
        </header>

        {project.image && (
          <Container>
            <Reveal>
              <Image
                src={project.image.src}
                alt={project.image.alt[locale]}
                width={project.image.width}
                height={project.image.height}
                sizes="(min-width: 1180px) 1052px, 100vw"
                priority
                className="w-full rounded-2xl border border-line"
              />
            </Reveal>
          </Container>
        )}

        {sections.map(({ id, title, body, list }) => (
          <section key={id} aria-labelledby={`${id}-title`} className="mt-[clamp(40px,7vh,72px)] border-t border-line">
            <Container className="grid gap-5 py-[clamp(32px,6vh,56px)] md:grid-cols-[0.34fr_0.66fr] md:gap-12">
              <Reveal>
                <h2 id={`${id}-title`} className={sectionHeading}>
                  {title}
                </h2>
              </Reveal>

              {/* Párrafos y decisiones entran de a uno; en la lista, cada guion de tiza se traza al entrar su punto. */}
              {list ? (
                <Stagger step={0.1} delay={0.1} className="flex flex-col gap-5">
                  {body.map((item) => (
                    <StaggerItem key={item} className="relative max-w-[62ch] pl-8 text-[17px] leading-[1.7] text-dust">
                      <StaggerDash className="absolute top-[0.85em] left-0 h-px w-5 bg-accent" />
                      {item}
                    </StaggerItem>
                  ))}
                </Stagger>
              ) : (
                <Stagger as="div" step={0.1} delay={0.1} className="flex flex-col gap-5">
                  {body.map((paragraph) => (
                    <StaggerItem as="p" key={paragraph} className="max-w-[62ch] text-[17px] leading-[1.75] text-dust">
                      {paragraph}
                    </StaggerItem>
                  ))}
                </Stagger>
              )}
            </Container>
          </section>
        ))}
      </article>

      <nav aria-label={labels.caseStudy} className="border-t border-line">
        <Container className="flex flex-wrap items-center justify-between gap-6 py-[clamp(40px,7vh,72px)]">
          <Reveal y={16}>
            <ButtonLink href={`/${locale}#contact`} trailingIcon="arrowRight">
              {dict.hero.ctaContact}
            </ButtonLink>
          </Reveal>
          {next !== project && (
            <Reveal delay={0.1} y={16}>
              <Link
                href={`/${locale}/projects/${next.slug}`}
                className="group inline-flex flex-col gap-1 text-right"
              >
                <span className="text-xs font-bold tracking-[0.16em] text-dust uppercase">{labels.next}</span>
                <span className="inline-flex items-center justify-end gap-2 font-display text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                  {next.copy[locale].title}
                  <Icon name="arrowRight" className={cn("transition-transform duration-300 ease-chalk", iconHover.arrowRight)} />
                </span>
              </Link>
            </Reveal>
          )}
        </Container>
      </nav>
    </main>
  );
}
