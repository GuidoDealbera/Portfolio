/**
 * Español: es la fuente de verdad. El tipo `Dictionary` sale de acá, así que
 * en.ts no compila si le falta o le sobra una clave.
 *
 * Borrador de textos: sólo afirma lo que Guido confirmó (fechas, empleador,
 * bootcamp, profesorado). Revisar la redacción antes de lanzar.
 */
export const es = {
  meta: {
    title: "Guido Dealbera — Desarrollador Fullstack",
    description:
      "Desarrollador Fullstack en Villa María, Córdoba. React, Next.js, NestJS y PostgreSQL. Disponible para proyectos freelance y trabajo remoto.",
  },

  a11y: {
    skipToContent: "Saltar al contenido",
    mainNav: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
    switchTo: { es: "Cambiar a español", en: "Cambiar a inglés" },
    backToTop: "Volver arriba",
  },

  nav: {
    work: "Trabajo",
    about: "Sobre mí",
    journey: "Recorrido",
    contact: "Contacto",
  },

  hero: {
    role: "Desarrollador Fullstack",
    availability: "Agenda abierta para proyectos",
    headline: { lead: "Construyo productos web que la gente", highlight: "usa todos los días." },
    ledeStack: (stack: string) => `${stack}.`,
    ledeRest: (p: { years: string; company: string }) =>
      `${p.years} años llevando ideas a producción — hoy en ${p.company}, y con la agenda abierta para proyectos independientes.`,
    ctaWork: "Ver mi trabajo",
    ctaContact: "Hablemos de tu proyecto",
    ctaCv: "Descargar CV",
    remote: (timezone: string) => `Remoto · ${timezone}`,
    languages: "Español / Inglés",
    degree: "Profesorado en Matemáticas",
  },

  work: {
    kicker: "Trabajo",
    title: "Casos de estudio en camino.",
    body: "Estoy escribiendo cada proyecto con su problema, mis decisiones y el resultado. Mientras tanto, el código está en GitHub.",
    cta: "Ver GitHub",
  },

  about: {
    kicker: "Sobre mí",
    title: "Desarrollador fullstack, casi profesor de matemáticas.",
    paragraphs: [
      "Soy Guido, de Villa María, Córdoba. Trabajo como desarrollador desde 2023: después del bootcamp de SoyHenry empecé a tomar proyectos por mi cuenta, y desde abril de 2025 también desarrollo en Mecantronic.",
      "En paralelo estoy terminando el Profesorado en Matemáticas, que empecé en 2015 y cierro en diciembre de 2026.",
      "Los proyectos independientes siguen abiertos todo el año: si tenés algo para construir, escribime.",
    ],
    experienceLabel: "años de experiencia",
    stackTitle: "Con qué trabajo",
    groups: { frontend: "Frontend", backend: "Backend", data: "Datos", mobile: "Mobile" },
    ctaCv: "Descargar CV",
  },

  journey: {
    kicker: "Recorrido",
    title: "Cómo llegué hasta acá.",
    items: [
      {
        id: "company",
        when: "abr. 2025 — actualidad",
        title: "Mecantronic",
        body: "Desarrollo de software en relación de dependencia.",
      },
      {
        id: "freelance",
        when: "may. 2023 — actualidad",
        title: "Desarrollador freelance",
        body: "Proyectos independientes para clientes.",
      },
      {
        id: "bootcamp",
        when: "ene. — may. 2023",
        title: "SoyHenry",
        body: "Bootcamp Full Stack Developer.",
      },
      {
        id: "degree",
        when: "2015 — dic. 2026",
        title: "Profesorado en Matemáticas",
        body: "Ingresé en 2015. Egreso previsto en diciembre de 2026.",
      },
    ] as { id: "company" | "freelance" | "bootcamp" | "degree"; when: string; title: string; body: string }[],
  },

  contact: {
    title: "¿Tenés algo para construir?",
    body: "Contame qué necesitás y vemos si puedo ayudarte.",
    direct: "O escribime directo",
    form: {
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      submit: "Enviar mensaje",
      sending: "Enviando…",
      successTitle: "Mensaje enviado.",
      successBody: "Gracias por escribirme. Lo leo y te respondo por email.",
      failed: (email: string) =>
        `No se pudo enviar el mensaje. Probá de nuevo en un rato o escribime directo a ${email}.`,
      errors: {
        required: "Completá este campo.",
        invalid: "Revisá el email: parece incompleto.",
        tooShort: (min: number) => `Contame un poco más: escribí al menos ${min} caracteres.`,
        tooLong: "Es demasiado largo.",
      },
    },
  },

  footer: {
    copyright: (year: number, name: string) => `© ${year} ${name}`,
    tagline: "Desarrollador Fullstack · Villa María, Córdoba, Argentina",
  },

  notFound: {
    title: "Esta página no existe.",
    body: "El link está roto o la página cambió de lugar.",
    back: "Volver al inicio",
  },
};

export type Dictionary = typeof es;
