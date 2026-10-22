import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale, type Locale } from "./config";
import type { Dictionary } from "@/dictionaries/es";

// Import dinámico: cada idioma es su propio chunk y sólo se carga el pedido.
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  es: () => import("@/dictionaries/es").then((module) => module.es),
  en: () => import("@/dictionaries/en").then((module) => module.en),
};

/** Para quien ya tiene el idioma en la mano, como `generateMetadata`. */
export function loadDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}

/**
 * Idioma de la ruta actual. `lang` es un parámetro raíz (app/[lang]/layout.tsx),
 * así que cualquier Server Component lo puede leer sin recibirlo por props.
 */
export async function getLocale(): Promise<Locale> {
  const value = await lang();
  if (!hasLocale(value)) notFound();
  return value;
}

export async function getDictionary(): Promise<Dictionary> {
  return loadDictionary(await getLocale());
}
