import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (ficha 3.13), verificada contra el repo
 * público, y lo que Guido confirmó el 2026-10-21: la agencia la usa como
 * publicidad y el backend del formulario lo hizo otro freelance. Es JavaScript,
 * no TypeScript (el CV de 2024 decía lo contrario). Sin enlace "Ver online"
 * porque el dominio actual no está a mano.
 */
export const grupoOesteSeguros: Project = {
  slug: "grupo-oeste-seguros",
  updatedAt: "2026-10-22",
  year: 2024,
  context: "freelance",
  status: "live",
  stack: ["React", "JavaScript", "Tailwind CSS", "Swiper"],
  links: { repo: "https://github.com/GuidoDealbera/seguros-front" },
  // Captura de 2024, la del portfolio anterior.
  shots: [
    {
      src: "/projects/grupo-oeste-seguros/inicio.webp",
      width: 1366,
      height: 605,
      alt: {
        es: "Sección “Quiénes somos” del sitio de Grupo Oeste Seguros: el logo de la agencia en un celular y tres párrafos que presentan su forma de asesorar.",
        en: "The “About us” section of the Grupo Oeste Seguros site: the agency's logo on a phone and three paragraphs introducing how they advise clients.",
      },
      caption: { es: "Quiénes somos", en: "About us" },
    },
  ],
  copy: {
    es: {
      title: "Grupo Oeste Seguros",
      summary:
        "Landing page de una agencia de seguros, hoy en uso como su sitio publicitario: presenta a la agencia y a sus aseguradoras, y lleva cada consulta al formulario con la cotización ya elegida.",
      role: "Frontend completo, como freelance. El backend del formulario lo hizo otro desarrollador.",
      problem: [
        "La agencia necesitaba un sitio simple que contara quién es, con qué aseguradoras trabaja y qué seguros ofrece, y que las consultas llegaran sabiendo qué le interesa a cada persona.",
      ],
      decisions: [
        "Una sola página con cuatro secciones (inicio, aseguradoras, servicios y contacto) y desplazamiento suave entre ellas.",
        "Cada servicio completa el asunto del formulario (\"Cotización de...\") y lleva directo al contacto, así la consulta llega identificada.",
        "Un formulario con archivos adjuntos y vista previa, enviado a un backend aparte, con avisos claros de envío, éxito o error.",
        "Un modo urgente, que se activa con un enlace especial, marca la consulta como urgente y suma un acceso directo a WhatsApp.",
        "Diseño minimalista con un carrusel automático de las aseguradoras, hecho en React, Vite y Tailwind CSS.",
      ],
      result: [
        "El sitio está publicado y la agencia lo usa como publicidad. Lo desarrollé en mayo de 2024, con ajustes en julio, junto con otro freelance que hizo el backend del formulario.",
      ],
    },
    en: {
      title: "Grupo Oeste Seguros",
      summary:
        "A landing page for an insurance agency, now live as its advertising site: it introduces the agency and its insurers, and takes every inquiry to the contact form with the chosen quote already filled in.",
      role: "The entire frontend, as a freelancer. Another developer built the form's backend.",
      problem: [
        "The agency needed a simple site that explained who they are, which insurers they work with and which policies they offer, with inquiries arriving already tagged with what each person was interested in.",
      ],
      decisions: [
        "A single page with four sections (home, insurers, services and contact) and smooth scrolling between them.",
        "Each service fills in the form's subject (\"Quote for...\") and jumps straight to the contact section, so the inquiry arrives already identified.",
        "A contact form with file attachments and previews, sent to a separate backend, with clear sending, success and error states.",
        "An urgent mode, enabled through a special link, that flags the inquiry as urgent and adds a direct WhatsApp shortcut.",
        "A minimalist design with an auto-playing carousel of insurers, built with React, Vite and Tailwind CSS.",
      ],
      result: [
        "The site is live and the agency uses it for advertising. I built it in May 2024, with adjustments in July, alongside another freelancer who built the form's backend.",
      ],
    },
  },
};
