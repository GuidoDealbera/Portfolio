import type { Dictionary } from "./es";

/** Inglés. Mismo contenido que es.ts: el tipo obliga a mantener las dos claves en paralelo. */
export const en: Dictionary = {
  meta: {
    title: "Guido Dealbera — Fullstack Developer",
    description:
      "Fullstack developer based in Villa María, Córdoba, Argentina. React, Next.js, TypeScript, Node.js and Python. Solutions built with judgment, product vision and AI. Available for freelance projects and remote work.",
  },

  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
    backToTop: "Back to top",
  },

  nav: {
    work: "Work",
    about: "About",
    journey: "Journey",
    contact: "Contact",
  },

  hero: {
    role: "Fullstack Developer",
    photoAlt: "Guido Dealbera",
    photoCaption: "Full-Stack Developer",
    availability: "Open for projects",
    headline: {
      lead: "It's not about writing code. It's about building",
      highlight: "what really matters.",
    },
    lede: "I build digital solutions with judgment, product vision and a focus on results. I combine software engineering, analytical thinking and AI to turn real problems into scalable, efficient applications that are ready to grow.",
    strengths: ["Full-Stack Development", "Product Thinking", "AI-Assisted Engineering", "Problem Solving"],
    strengthsLabel: "Strengths",
    ctaWork: "See my work",
    ctaContact: "Let's build something worthwhile",
    ctaCv: "Download CV",
    remote: (timezone: string) => `Remote · ${timezone}`,
    languages: "Native Spanish, A2 English",
    degree: "Mathematics teaching degree",
  },

  work: {
    kicker: "Work",
    title: "Selected work.",
    body: "Each case tells the problem, the decisions I made and the outcome.",
    viewCase: "View the case",
    privateRepo: "Private code",
    cta: "More on GitHub",
  },

  projectPage: {
    caseStudy: "Case study",
    back: "Back to work",
    next: "Next case",
    stack: "Stack",
    repo: "View the code",
    live: "View live",
    privateRepo: "The code for this project is private.",
    problem: "The problem",
    decisions: "Decisions",
    result: "Outcome",
    role: "My role",
    status: "Status",
    gallery: {
      title: "Screenshots",
      enlarge: "enlarge",
      close: "Close",
      previous: "Previous screenshot",
      next: "Next screenshot",
      of: "of",
    },
    contexts: {
      mecantronic: "Mecantronic",
      freelance: "Freelance",
      personal: "Personal project",
    },
    statuses: {
      live: "In production",
      pilot: "In production · pilot",
      inProgress: "In development",
      poc: "Proof of concept",
    },
  },

  about: {
    kicker: "About",
    title: "Fullstack developer, nearly a maths teacher.",
    paragraphs: [
      "I'm Guido, from Villa María, Córdoba, Argentina. I've worked as a developer since 2023: after the SoyHenry bootcamp I was a frontend developer at NovoGas, took on projects of my own, and since April 2025 I've been developing at Mecantronic.",
      "On the side I'm finishing a teaching degree in Mathematics — I started it in 2015 and graduate in December 2026.",
      "Independent projects stay open all year: if you have something to build, write to me.",
    ],
    experienceLabel: "years of experience",
    stackTitle: "What I work with",
    groups: { frontend: "Frontend", backend: "Backend", data: "Data", mobile: "Mobile & desktop", tools: "Tools" },
    ctaCv: "Download CV",
  },

  journey: {
    kicker: "Journey",
    title: "How I got here.",
    items: [
      {
        id: "company",
        when: "Apr 2025 — present",
        title: "Mecantronic",
        body: "Remote full stack development for clients such as Durrieu Consignatarios, Plan Mi Casa and ESConecta: web platforms in React and Next.js, APIs in FastAPI and NestJS, Telegram and WhatsApp bots, and integrations with Keycloak and Moodle.",
      },
      {
        id: "previousCompany",
        when: "Aug 2023 — Apr 2025",
        title: "NovoGas",
        body: "Remote web and mobile frontend: the admin dashboard for smart valves on bottled-gas cylinders (React, Redux Toolkit) and the end-user app, with real-time consumption and QR sign-up (React Native, Expo).",
      },
      {
        id: "freelance",
        when: "May 2023 — present",
        title: "Freelance developer",
        body: "Custom projects: the Grupo Oeste Seguros landing page (2024) and, currently, Mecánica Dealbera, a desktop app to run a car repair shop.",
      },
      {
        id: "bootcamp",
        when: "Jan — May 2023",
        title: "SoyHenry",
        body: "Full Stack Developer bootcamp (800 hours). From March to May I was also a Teaching Assistant, guiding a group of students through their onboarding.",
      },
      {
        id: "degree",
        when: "2015 — Dec 2026",
        title: "Teaching degree in Mathematics",
        body: "Started in 2015. Graduating in December 2026.",
      },
    ],
  },

  contact: {
    title: "Have something to build?",
    body: "Tell me what you need and we'll see if I can help.",
    direct: "Or write to me directly",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      submit: "Send message",
      hint: (min: number) => `Add your name, a valid email and a message of at least ${min} characters.`,
      sending: "Sending…",
      successTitle: "Message sent.",
      successBody: "Thanks for writing. I'll read it and reply by email.",
      failed: (email: string) =>
        `The message couldn't be sent. Try again in a while, or write to me directly at ${email}.`,
      errors: {
        required: "Please fill in this field.",
        invalid: "Check the email address: it looks incomplete.",
        tooShort: (min: number) => `Tell me a bit more: write at least ${min} characters.`,
        tooLong: "This is too long.",
      },
    },
  },

  footer: {
    copyright: (year: number, name: string) => `© ${year} ${name}`,
    tagline: "Fullstack Developer · Villa María, Córdoba, Argentina",
  },

  notFound: {
    title: "This page doesn't exist.",
    body: "The link is broken, or the page moved.",
    back: "Back to home",
  },
};
