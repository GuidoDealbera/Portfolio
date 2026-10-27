import type { ProjectContext, ProjectStatus } from "@/content/projects/types";

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
      "Desarrollador Fullstack en Villa María, Córdoba. React, Next.js, TypeScript, Node.js y Python. Soluciones con criterio, visión de producto e IA. Disponible para proyectos freelance y trabajo remoto.",
  },

  a11y: {
    skipToContent: "Saltar al contenido",
    mainNav: "Navegación principal",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    language: "Idioma",
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
    photoAlt: "Guido Dealbera",
    // Leyenda de la foto, debajo del nombre. En inglés en los dos idiomas, como las fortalezas.
    photoCaption: "Full-Stack Developer",
    availability: "Agenda abierta para proyectos",
    headline: {
      lead: "No se trata de escribir código. Se trata de construir",
      highlight: "lo que realmente importa.",
    },
    lede: "Desarrollo soluciones digitales con criterio, visión de producto y foco en resultados. Combino ingeniería de software, pensamiento analítico e IA para transformar problemas reales en aplicaciones escalables, eficientes y preparadas para crecer.",
    // En inglés en los dos idiomas: son los términos con los que se buscan estos perfiles.
    strengths: ["Full-Stack Development", "Product Thinking", "AI-Assisted Engineering", "Problem Solving"],
    strengthsLabel: "Fortalezas",
    ctaWork: "Ver mi trabajo",
    ctaContact: "Construyamos algo que valga la pena",
    ctaCv: "Descargar CV",
    remote: (timezone: string) => `Remoto · ${timezone}`,
    // Igual que en el CV: A2, sin inflarlo (antes B1; corregido por Guido el 2026-10-23).
    languages: "Español nativo, inglés A2",
    degree: "Profesorado en Matemáticas",
  },

  work: {
    kicker: "Trabajo",
    title: "Trabajo seleccionado.",
    body: "Cada caso cuenta el problema, las decisiones que tomé y el resultado.",
    viewCase: "Ver el caso",
    privateRepo: "Código privado",
    cta: "Más en GitHub",
  },

  projectPage: {
    caseStudy: "Caso de estudio",
    back: "Volver al trabajo",
    next: "Siguiente caso",
    stack: "Stack",
    repo: "Ver el código",
    live: "Ver online",
    privateRepo: "El código de este proyecto es privado.",
    problem: "El problema",
    decisions: "Decisiones",
    result: "Resultado",
    role: "Mi rol",
    status: "Estado",
    // Galería de capturas del caso y el visor que se abre al tocar una.
    gallery: {
      title: "Capturas",
      // Se lee después de la descripción de la imagen: "…, ampliar".
      enlarge: "ampliar",
      close: "Cerrar",
      previous: "Captura anterior",
      next: "Captura siguiente",
      // "2 de 5"
      of: "de",
    },
    // `satisfies` obliga a tener un texto por cada valor del tipo: un contexto o
    // estado nuevo en types.ts no compila hasta que se lo nombre acá (y en en.ts).
    contexts: {
      mecantronic: "Mecantronic",
      freelance: "Freelance",
      personal: "Proyecto personal",
    } satisfies Record<ProjectContext, string>,
    statuses: {
      live: "En producción",
      pilot: "En producción · piloto",
      inProgress: "En desarrollo",
      poc: "Prueba de concepto",
    } satisfies Record<ProjectStatus, string>,
  },

  about: {
    kicker: "Sobre mí",
    title: "Desarrollador fullstack, casi profesor de matemáticas.",
    paragraphs: [
      "Soy Guido, de Villa María, Córdoba. Trabajo como desarrollador desde 2023: después del bootcamp de SoyHenry fui desarrollador frontend en NovoGas, tomé proyectos por mi cuenta y desde abril de 2025 desarrollo en Mecantronic.",
      "En paralelo estoy terminando el Profesorado en Matemáticas, que empecé en 2015 y cierro en diciembre de 2026.",
      "Los proyectos independientes siguen abiertos todo el año: si tenés algo para construir, escribime.",
    ],
    experienceLabel: "años de experiencia",
    stackTitle: "Con qué trabajo",
    groups: { frontend: "Frontend", backend: "Backend", data: "Datos", mobile: "Mobile y escritorio", tools: "Herramientas" },
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
        body: "Desarrollo full stack remoto para clientes como Durrieu Consignatarios, Plan Mi Casa y ESConecta: plataformas web en React y Next.js, APIs en FastAPI y NestJS, bots de Telegram y WhatsApp e integraciones con Keycloak y Moodle.",
      },
      {
        id: "previousCompany",
        when: "ago. 2023 — abr. 2025",
        title: "NovoGas",
        body: "Frontend web y mobile, remoto: el panel de administración de válvulas inteligentes de gas envasado (React, Redux Toolkit) y la app para usuarios finales, con consumo en tiempo real y registro por QR (React Native, Expo).",
      },
      {
        id: "freelance",
        when: "may. 2023 — actualidad",
        title: "Desarrollador freelance",
        body: "Proyectos a medida: la landing de Grupo Oeste Seguros (2024) y, hoy, Mecánica Dealbera, una aplicación de escritorio para la gestión de un taller mecánico.",
      },
      {
        id: "bootcamp",
        when: "ene. — may. 2023",
        title: "SoyHenry",
        body: "Bootcamp Full Stack Developer (800 horas). De marzo a mayo, también Teaching Assistant: acompañé a un grupo de estudiantes en su adaptación al programa.",
      },
      {
        id: "degree",
        when: "2015 — dic. 2026",
        title: "Profesorado en Matemáticas",
        body: "Ingresé en 2015. Egreso previsto en diciembre de 2026.",
      },
    ] as {
      id: "company" | "previousCompany" | "freelance" | "bootcamp" | "degree";
      when: string;
      title: string;
      body: string;
    }[],
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
      // Al lado del botón mientras no se puede enviar. El mínimo del mensaje sale de `limits`.
      hint: (min: number) => `Completá tu nombre, un email válido y un mensaje de al menos ${min} caracteres.`,
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
