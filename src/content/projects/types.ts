import type { Locale } from "@/i18n/config";

/** Dónde se hizo el proyecto. Los textos de cada valor están en los diccionarios (`projectPage.contexts`). */
export type ProjectContext = "mecantronic" | "freelance" | "personal";

/**
 * En qué estado está hoy. Se muestra en la tarjeta y en el caso para que un
 * proyecto en desarrollo o una prueba de concepto no parezcan algo terminado y
 * en uso. Textos en `projectPage.statuses`.
 */
export type ProjectStatus = "live" | "pilot" | "inProgress" | "poc";

/** Lo que se cuenta de un proyecto, en un idioma. */
export type ProjectCopy = {
  title: string;
  /** Una o dos frases: aparece en la tarjeta, en la descripción de la página y al compartir el link. */
  summary: string;
  role: string;
  /** Un párrafo por elemento. */
  problem: readonly string[];
  /** Una decisión por elemento: se muestran como lista. */
  decisions: readonly string[];
  /** Un párrafo por elemento. */
  result: readonly string[];
};

export type Project = {
  /** Va en la URL: /es/projects/<slug>. Minúsculas y guiones. */
  slug: string;
  year: number;
  context: ProjectContext;
  status: ProjectStatus;
  stack: readonly string[];
  /** Sin `repo`, el proyecto se muestra como privado. */
  links: { repo?: string; live?: string };
  /** Captura del proyecto, desde public/. Si falta, la tarjeta usa una portada generada. */
  image?: { src: string; width: number; height: number; alt: Record<Locale, string> };
  /** `Record<Locale, …>` obliga a escribir todos los idiomas: si falta uno, no compila. */
  copy: Record<Locale, ProjectCopy>;
};
