/**
 * Fuente única de los datos del perfil. Todo lo que aparece en más de un
 * lugar (hero, footer, metadata, imagen OG, contacto) se lee de acá.
 *
 * Los campos marcados PENDIENTE son supuestos que hay que confirmar.
 */

export const site = {
  url: "https://guidodealbera-dev.vercel.app",
  name: "Guido Dealbera",
  fullName: "Guido José Dealbera",
  initials: { first: "G", second: "D" },
  role: "Desarrollador Fullstack",
  location: "Villa María, Córdoba",
  country: "Argentina",
  timezone: "GMT−3",
  languages: "Español / Inglés",

  // PENDIENTE: confirmar. En 2023 el sitio decía "2+ años".
  yearsOfExperience: 5,

  // PENDIENTE: confirmar empleador actual y si la agenda freelance está abierta.
  currentRole: { company: "Mecantronic", since: null as number | null },
  availableForFreelance: true,

  headline: {
    lead: "Construyo productos web que la gente",
    highlight: "usa todos los días.",
  },

  description:
    "Desarrollador Fullstack en Villa María, Córdoba. React, Next.js, NestJS y PostgreSQL. Disponible para proyectos freelance y trabajo remoto.",

  stack: {
    core: ["React", "Next.js", "NestJS", "PostgreSQL"],
    all: [
      "React",
      "Next.js",
      "TypeScript",
      "NestJS",
      "PostgreSQL",
      "Node.js",
      "Express",
      "Sequelize",
      "Tailwind",
      "React Native",
      "Redux",
      "Material UI",
    ],
  },

  education: {
    degree: "Profesorado en Matemáticas",
    bootcamp: { name: "SoyHenry", year: 2023, url: "https://www.soyhenry.com/" },
  },

  cv: "/cv-guido-dealbera.pdf",

  contact: {
    email: "guidojdealbera@gmail.com",
    whatsapp: { display: "+54 3775 432263", url: "https://wa.me/543775432263" },
  },

  social: {
    github: "https://github.com/GuidoDealbera",
    linkedin: "https://www.linkedin.com/in/guido-jos%C3%A9-dealbera-5433a0261/",
  },
} as const;

export const nav = [
  { label: "Trabajo", href: "#trabajo" },
  { label: "Sobre mí", href: "#sobre" },
  { label: "Contacto", href: "#contacto" },
] as const;
