import { site, sections } from "@/content/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";
import { SiteHeader } from "./site-header";

export async function Header() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <SiteHeader
      locale={locale}
      initials={[site.initials.first, site.initials.second]}
      items={sections.map((id) => ({ id, label: dict.nav[id] }))}
      labels={{
        mainNav: dict.a11y.mainNav,
        openMenu: dict.a11y.openMenu,
        closeMenu: dict.a11y.closeMenu,
        language: dict.a11y.language,
      }}
    />
  );
}
