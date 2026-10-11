/**
 * Fuente única de los datos del perfil que NO dependen del idioma: nombres,
 * fechas, stack, links. Los textos van en src/dictionaries.
 *
 * Los campos marcados PENDIENTE son supuestos que hay que confirmar.
 */

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
    company: { name: "Mecantronic", since: "2025-04" },
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

  // Stack agrupado por uso real, tal como figuraba en el sitio anterior.
  stack: {
    core: ["React", "Next.js", "NestJS", "PostgreSQL"],
    groups: {
      frontend: ["React", "Next.js", "TypeScript", "Redux", "Tailwind CSS", "Material UI", "HTML", "CSS"],
      backend: ["Node.js", "NestJS", "Express"],
      data: ["PostgreSQL", "Sequelize"],
      mobile: ["React Native"],
    },
    // Lo que desfila en la marquesina.
    marquee: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Node.js",
      "Tailwind CSS",
      "React Native",
      "Redux",
      "Express",
      "Sequelize",
      "Material UI",
    ],
  },

  cv: "/cv-guido-dealbera.pdf",

  email: "guidojdealbera@gmail.com",
} as const;

type Placement = "contact" | "footer";

export type Channel = {
  id: string;
  label: string;
  href: string;
  external: boolean;
  /** En qué partes de la página aparece. El primero de "contact" es el botón principal. */
  placements: readonly Placement[];
};

/**
 * Todos los canales de contacto y redes, en un solo lugar. Para sumar uno
 * (Instagram, X…) alcanza con agregar una línea acá: el contacto y el footer
 * lo muestran solos.
 */
export const channels: readonly Channel[] = [
  { id: "email", label: site.email, href: `mailto:${site.email}`, external: false, placements: ["contact"] },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/543775432263",
    external: true,
    placements: ["contact"],
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/guido-jos%C3%A9-dealbera-5433a0261/",
    external: true,
    placements: ["contact", "footer"],
  },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/GuidoDealbera",
    external: true,
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
