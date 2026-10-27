import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { defaultLocale, locales } from "@/i18n/config";

/**
 * Una página existe en cada idioma: se lista una vez por idioma, cada una apuntando a sus equivalentes.
 * Las dos versiones comparten la fecha del último cambio.
 */
function localized(path: string, lastModified: string): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, `${site.url}/${locale}${path}`])),
    "x-default": `${site.url}/${defaultLocale}${path}`,
  };

  return locales.map((locale) => ({
    url: `${site.url}/${locale}${path}`,
    lastModified,
    alternates: { languages },
  }));
}

// Fechas fijas, escritas a mano: con Cache Components, `new Date()` no puede correr en el prerender, y la
// fecha del build cambiaría en cada deploy aunque el contenido siguiera igual. La home lista todos los
// casos, así que toma la fecha más reciente entre la suya y la de ellos (en AAAA-MM-DD, el orden de texto
// es el cronológico).
export default function sitemap(): MetadataRoute.Sitemap {
  const homeUpdatedAt = [site.updatedAt, ...projects.map((project) => project.updatedAt)].sort().at(-1) ?? site.updatedAt;

  return [
    ...localized("", homeUpdatedAt),
    ...projects.flatMap(({ slug, updatedAt }) => localized(`/projects/${slug}`, updatedAt)),
  ];
}
