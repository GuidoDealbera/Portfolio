import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { defaultLocale, locales } from "@/i18n/config";

/** Una página existe en cada idioma: se lista una vez por idioma, cada una apuntando a sus equivalentes. */
function localized(path: string): MetadataRoute.Sitemap {
  const languages = {
    ...Object.fromEntries(locales.map((locale) => [locale, `${site.url}/${locale}${path}`])),
    "x-default": `${site.url}/${defaultLocale}${path}`,
  };

  return locales.map((locale) => ({
    url: `${site.url}/${locale}${path}`,
    alternates: { languages },
  }));
}

// Sin `lastModified` a propósito: con Cache Components, `new Date()` no puede correr en el prerender,
// y una fecha inventada es peor que ninguna.
export default function sitemap(): MetadataRoute.Sitemap {
  return [...localized("")];
}
