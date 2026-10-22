import type { Project } from "./types";

/**
 * BORRADOR. El único caso que se puede escribir sin el MD de proyectos de
 * Guido, porque es este mismo sitio. Cada dato sale de lo medido durante el
 * rediseño. Editar o reemplazar cuando lleguen los demás casos.
 */
export const portfolio: Project = {
  slug: "portfolio",
  year: 2026,
  context: "personal",
  status: "live",
  stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Motion"],
  links: {
    repo: "https://github.com/GuidoDealbera/Portfolio",
    live: "https://guidodealbera-dev.vercel.app/",
  },
  copy: {
    es: {
      title: "Este portfolio",
      summary:
        "El sitio que estás viendo: un rediseño completo desde cero, bilingüe, accesible y con movimiento pensado para no estorbar la lectura.",
      role: "Diseño y desarrollo completos",
      problem: [
        "La versión anterior era un template seguido paso a paso. Mostraba una pantalla de carga artificial de 2 segundos antes de pintar nada, no tenía descripción ni imagen para compartir el link, y varios textos no llegaban al contraste mínimo de accesibilidad: el botón principal medía 3,68:1 y el subtítulo del inicio, 2,35:1, cuando el piso es 4,5:1.",
        "Además, el menú capturaba las flechas del teclado en toda la página, así que el scroll con teclado dejaba de funcionar.",
      ],
      decisions: [
        "Next.js 16 con Cache Components: las dos versiones de idioma se generan en el build y salen como HTML estático.",
        "Un solo lugar para cada cosa: los datos del perfil en un archivo, los textos en diccionarios tipados (si falta una clave en inglés, el proyecto no compila) y los colores como tokens CSS.",
        "Movimiento con criterio: el contenido aparece al scrollear en lugar de cargarse de golpe, y todo se apaga con prefers-reduced-motion.",
        "El envío del formulario de contacto está aislado en un solo archivo, así cambiar de proveedor de email no toca nada más.",
      ],
      result: [
        "El botón principal pasó de 3,68:1 a 9,42:1 de contraste y el texto secundario, de 2,35:1 a 6,09:1.",
        "La página se pinta apenas llega, sin pantalla de carga, y cada link compartido muestra una imagen propia en el idioma de la página.",
      ],
    },
    en: {
      title: "This portfolio",
      summary:
        "The site you're looking at: a complete redesign from scratch, bilingual, accessible, with motion designed not to get in the way of reading.",
      role: "Design and development, end to end",
      problem: [
        "The previous version was a template followed step by step. It showed an artificial 2-second loading screen before painting anything, had no description or image for sharing the link, and several texts missed the minimum accessibility contrast: the main button measured 3.68:1 and the hero subtitle 2.35:1, when the floor is 4.5:1.",
        "On top of that, the menu captured the keyboard arrows across the whole page, so keyboard scrolling stopped working.",
      ],
      decisions: [
        "Next.js 16 with Cache Components: both language versions are generated at build time and ship as static HTML.",
        "One place for each thing: profile data in one file, text in typed dictionaries (if an English key is missing, the project doesn't compile) and colors as CSS tokens.",
        "Motion with judgment: content appears as you scroll instead of loading all at once, and everything switches off with prefers-reduced-motion.",
        "Sending the contact form is isolated in a single file, so changing email provider touches nothing else.",
      ],
      result: [
        "The main button went from 3.68:1 to 9.42:1 contrast, and the secondary text from 2.35:1 to 6.09:1.",
        "The page paints as soon as it arrives, with no loading screen, and every shared link shows its own image in the page's language.",
      ],
    },
  },
};
