/**
 * Configuración de idiomas. Sin imports de servidor a propósito: la usan el
 * proxy, los componentes cliente y los servidor por igual.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/** Cookie donde el selector de idioma recuerda la elección para la próxima visita a `/`. */
export const localeCookie = "lang";

export function hasLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Etiquetas BCP 47 completas, para Open Graph y `hreflang`. */
export const localeTags: Record<Locale, string> = {
  es: "es-AR",
  en: "en",
};

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
