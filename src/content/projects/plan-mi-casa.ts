import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (fichas 3.2 y 3.3) y lo que Guido confirmó el
 * 2026-10-21. Un solo caso para los dos proyectos: Tu Casa en Cuotas es el
 * template que nació de Plan Mi Casa, y juntos cuentan esa evolución. El
 * backend, la base del monorepo y la configuración de marca son de otros
 * integrantes; acá sólo se cuenta como propio lo que el inventario le atribuye.
 */
export const planMiCasa: Project = {
  slug: "plan-mi-casa",
  year: 2025,
  context: "mecantronic",
  status: "live",
  stack: ["React", "TypeScript", "MUI", "Redux Toolkit"],
  links: {},
  copy: {
    es: {
      title: "Plan Mi Casa y Tu Casa en Cuotas",
      summary:
        "El sistema de un plan de ahorro para la vivienda, hoy el sistema principal del cliente, y el template SaaS que nació de él para replicarlo en planes similares. Desarrollé la mayor parte del portal del suscriptor y gran parte del frontend del template.",
      role: "Frontend: la mayor parte del portal del suscriptor y módulos del panel administrativo de Plan Mi Casa, y gran parte del frontend de Tu Casa en Cuotas.",
      problem: [
        "Plan Mi Casa es un plan de ahorro para la vivienda: los suscriptores pagan cuotas en unidades de ahorro, con intereses, adelantos y gastos de entrega, y acceden a departamentos por sorteo o adjudicación. Administrarlo implica muchas reglas de negocio, y cada suscriptor necesita ver y pagar lo suyo sin depender de la oficina.",
        "Con el sistema en marcha apareció la idea de convertirlo en un producto para otros planes similares. Eso pedía una base común para clientes con distinta marca, distinta terminología y planes configurables.",
      ],
      decisions: [
        "Un portal del suscriptor centrado en la cuenta corriente: movimientos, cuotas, adelanto de cuotas con pago por QR, recibos y el detalle del cálculo de intereses a la vista en cada cuota.",
        "En el panel administrativo, módulos de auditoría, mora, dashboard y notificaciones con editor de texto enriquecido, y exportación de cualquier grilla a Excel y PDF.",
        "Tu Casa en Cuotas como monorepo pnpm, con dos aplicaciones (panel y portal) sobre un paquete compartido de funcionalidades, tema y configuración.",
        "Sobre una base white-label, con marca y terminología configurables por cliente, implementé los módulos de planes (reglas de inicio, adjudicación y posesión, métodos de cálculo y productos), suscripciones, cuentas corrientes y notificaciones, con permisos por rol en cada acción.",
      ],
      result: [
        "Plan Mi Casa está en producción y es el sistema principal del cliente; el portal del suscriptor es, en su mayor parte, desarrollo mío. Tu Casa en Cuotas quedó como prueba de concepto lista para ofrecerse como SaaS.",
        "Las dos versiones muestran la evolución del mismo dominio: de una aplicación React 18 con MUI 6 a un monorepo con React 19, MUI 7 y funcionalidades compartidas entre aplicaciones.",
      ],
    },
    en: {
      title: "Plan Mi Casa and Tu Casa en Cuotas",
      summary:
        "The system behind a home savings plan, now the client's core system, and the SaaS template born from it to serve similar plans. I built most of the subscriber portal and a large part of the template's frontend.",
      role: "Frontend: most of the subscriber portal and several back-office modules for Plan Mi Casa, and a large part of the Tu Casa en Cuotas frontend.",
      problem: [
        "Plan Mi Casa is a home savings plan: subscribers pay installments in savings units, with interest, prepayments and handover fees, and get apartments through draws or allocation. Running it involves many business rules, and every subscriber needs to see and pay what they owe without going through the office.",
        "Once the system was running, the idea came up to turn it into a product for other similar plans. That called for a shared codebase serving clients with different branding, different terminology and configurable plans.",
      ],
      decisions: [
        "A subscriber portal built around the account statement: transactions, installments, installment prepayment via QR payment, receipts, and the interest calculation shown on every installment.",
        "In the back office, audit log, overdue accounts, dashboard and notifications with a rich-text editor, plus Excel and PDF export for any data grid.",
        "Tu Casa en Cuotas as a pnpm monorepo, with two apps (back office and customer portal) on top of a shared package of features, theme and configuration.",
        "On a white-label foundation with per-client branding and terminology, I built the plans module (start, allocation and handover rules, calculation methods and products), subscriptions, accounts and notifications, with role-based permissions on every action.",
      ],
      result: [
        "Plan Mi Casa is in production and is the client's core system; most of the subscriber portal is my work. Tu Casa en Cuotas stands as a proof of concept, ready to be offered as SaaS.",
        "Together they show the same domain evolving: from a React 18 app with MUI 6 to a monorepo with React 19, MUI 7 and features shared across apps.",
      ],
    },
  },
};
