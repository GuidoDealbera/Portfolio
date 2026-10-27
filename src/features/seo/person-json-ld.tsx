import { channelHref, site } from "@/content/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

/** Datos estructurados para buscadores: quién es, dónde está y dónde más se lo encuentra. */
export async function PersonJsonLd() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.fullName,
    url: `${site.url}/${locale}`,
    // La foto ayuda a que el buscador asocie la cara con el nombre. Va la versión con fondo, no la transparente.
    ...(site.photo && { image: `${site.url}${site.photo.profile}` }),
    jobTitle: dict.hero.role,
    description: dict.meta.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.place.city,
      addressRegion: site.place.region,
      addressCountry: site.place.countryCode,
    },
    worksFor: { "@type": "Organization", name: site.career.company.name, url: site.career.company.url },
    alumniOf: { "@type": "EducationalOrganization", name: site.career.bootcamp.name, url: site.career.bootcamp.url },
    knowsAbout: [...new Set(Object.values(site.stack.groups).flat())],
    sameAs: [channelHref("linkedin"), channelHref("github")],
  };

  return (
    <script
      type="application/ld+json"
      // El `<` escapado evita que un valor cierre el <script> antes de tiempo (recomendación de Next).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
