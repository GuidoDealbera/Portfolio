import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { getProject, projects } from "@/content/projects";
import { site } from "@/content/site";
import { loadBrandColors, loadBrandFonts } from "@/features/seo/brand";
import { OgCard } from "@/features/seo/og-card";
import { hasLocale, locales } from "@/i18n/config";
import { loadDictionary } from "@/i18n/dictionaries";

export const alt = "Guido Dealbera — case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const [colors, fonts] = await Promise.all([loadBrandColors(), loadBrandFonts()]);

// Una imagen por proyecto e idioma, generadas en el build.
export function generateStaticParams() {
  return locales.flatMap((lang) => projects.map(({ slug }) => ({ lang, slug })));
}

export default async function Image({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(lang) || !project) notFound();

  const [{ projectPage }, copy] = [await loadDictionary(lang), project.copy[lang]];

  return new ImageResponse(
    (
      <OgCard
        colors={colors}
        eyebrow={`${projectPage.caseStudy} · ${project.year}`}
        title={[{ text: copy.title }]}
        subtitle={copy.summary}
        tags={project.stack}
        footer={site.name}
      />
    ),
    { ...size, fonts },
  );
}
