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

/**
 * Cómo se anuncia el link a cada idioma. Va en el idioma de destino y no en el de la página (así la voz
 * del lector de pantalla coincide con el `lang` del link) y empieza con el texto visible, como pide WCAG 2.5.3.
 * El código va fuera de paréntesis a propósito: las herramientas de auditoría ignoran lo parentético al comparar.
 */
export const switchLabels: Record<Locale, string> = {
  es: "ES — Cambiar a español",
  en: "EN — Switch to English",
};

export function otherLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}
