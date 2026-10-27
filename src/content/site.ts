/**
 * Fuente única de los datos del perfil que NO dependen del idioma: nombres,
 * fechas, stack, links. Los textos van en src/dictionaries.
 *
 * Los campos marcados PENDIENTE son supuestos que hay que confirmar.
 */

import type { IconName } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";

/** Foto del perfil, desde public/. Ancho y alto reales: reservan el espacio y evitan el salto de layout. */
type SitePhoto = {
  src: string;
  width: number;
  height: number;
  /** Versión cuadrada en JPG con el fondo del sitio: es la que ven los buscadores (JSON-LD). */
  profile: string;
};

export const site = {
  // El sitio sigue en el subdominio gratuito hasta tener guidodealbera.dev.
  url: "https://guidodealbera-dev.vercel.app",
  name: "Guido Dealbera",
  fullName: "Guido José Dealbera",
  initials: { first: "G", second: "D" },
  place: { city: "Villa María", region: "Córdoba", country: "Argentina", countryCode: "AR" },
  timezone: "GMT−3",

  // Años de experiencia, tal como los declaró Guido (octubre 2026).
  // Es un número fijo: hay que actualizarlo a mano.
  yearsOfExperience: 3.5,

  // La agenda freelance está siempre abierta.
  availableForFreelance: true,

  // Fechas en formato ISO. Los textos legibles viven en los diccionarios.
  career: {
    company: { name: "Mecantronic", since: "2025-04", url: "https://mecantronic.com.ar/" },
    previousCompany: { name: "NovoGas", legalName: "Global Energy Innovations S.A.C.", from: "2023-08", to: "2025-04" },
    freelance: { since: "2023-05-30" },
    bootcamp: {
      name: "SoyHenry",
      program: "Full Stack Developer",
      from: "2023-01-30",
      to: "2023-05-15",
      url: "https://www.soyhenry.com/",
    },
    degree: { since: "2015", expected: "2026-12" },
  },

  // Stack agrupado por uso real. Cada tecnología tiene respaldo en algún proyecto del
  // inventario o en el CV de 2024 (decidido el 2026-10-21; Sequelize salió por no usarse).
  stack: {
    // Va en la imagen para compartir del sitio.
    core: ["React", "Next.js", "TypeScript", "Node.js", "Python"],
    groups: {
      frontend: [
        "React",
        "Next.js",
        "TypeScript",
        "JavaScript",
        "Redux Toolkit",
        "TanStack Query",
        "Tailwind CSS",
        "Material UI",
        "HTML",
        "CSS",
      ],
      backend: ["Node.js", "NestJS", "Express", "Python", "FastAPI"],
      data: ["PostgreSQL", "SQL Server", "SQLite", "TypeORM", "Firebase"],
      mobile: ["React Native", "Electron"],
      tools: ["Docker", "Git", "GitHub Actions"],
    },
    // Lo que desfila en la marquesina.
    marquee: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "NestJS",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Native",
      "Electron",
      "Docker",
    ],
  },

  // Un CV por idioma: cada versión del sitio descarga el suyo.
  cv: { es: "/cv-guido-dealbera.pdf", en: "/cv-guido-dealbera-en.pdf" } satisfies Record<Locale, string>,

  // El hero la muestra sólo si está cargada; con null, se arma sin ella. Es un recorte con fondo
  // transparente: el fondo lo pone el CSS. El original en PNG quedó en ~/Proyectos/capturas-portfolio/.
  photo: { src: "/guido-dealbera.webp", width: 1088, height: 1446, profile: "/guido-dealbera-perfil.jpg" } as SitePhoto | null,

  email: "guidojdealbera@gmail.com",
} as const;

type Placement = "contact" | "footer";

export type Channel = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  /** Las redes llevan su logo oficial; el email, un sobre. */
  icon: IconName;
  /** En qué partes de la página aparece. El primero de "contact" es el botón principal. */
  placements: readonly Placement[];
};

/**
 * Todos los canales de contacto y redes, en un solo lugar. Para sumar uno
 * (Instagram, X…) alcanza con agregar una línea acá: el contacto y el footer
 * lo muestran solos.
 */
export const channels: readonly Channel[] = [
  { id: "email", label: site.email, href: `mailto:${site.email}`, external: false, icon: "mail", placements: ["contact"] },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/543775432263",
    external: true,
    icon: "whatsapp",
    placements: ["contact"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guido-jos%C3%A9-dealbera-5433a0261/",
    external: true,
    icon: "linkedin",
    placements: ["contact", "footer"],
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/GuidoDealbera",
    external: true,
    icon: "github",
    placements: ["footer"],
  },
];

export function channelsFor(placement: Placement) {
  return channels.filter((channel) => channel.placements.includes(placement));
}

export function channelHref(id: string) {
  const channel = channels.find((item) => item.id === id);
  if (!channel) throw new Error(`Canal desconocido: ${id}`);
  return channel.href;
}

/** Ids de las secciones de la home. Iguales en todos los idiomas para que los links compartidos funcionen. */
export const sections = ["work", "about", "journey", "contact"] as const;
export type SectionId = (typeof sections)[number];
