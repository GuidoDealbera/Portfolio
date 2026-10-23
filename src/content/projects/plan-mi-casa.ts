import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (fichas 3.2 y 3.3) y lo que Guido confirmó el
 * 2026-10-21. Un solo caso para los dos proyectos: Tu Casa en Cuotas es el
 * template que nació de Plan Mi Casa, y juntos cuentan esa evolución. El
 * backend, la base del monorepo y la configuración de marca son de otros
 * integrantes; acá sólo se cuenta como propio lo que el inventario le atribuye
 * y lo que Guido confirmó el 2026-10-23: participó en la gran mayoría de las
 * pantallas de Plan Mi Casa, del portal y del panel.
 */
export const planMiCasa: Project = {
  slug: "plan-mi-casa",
  year: 2025,
  context: "mecantronic",
  status: "live",
  stack: ["React", "TypeScript", "MUI", "Redux Toolkit"],
  links: {},
  // Entornos de demo: los suscriptores y sus datos son de prueba. El portal del suscriptor va primero
  // (y es la portada) porque es el centro del trabajo de Guido en este caso.
  shots: [
    {
      src: "/projects/plan-mi-casa/portal-pmc-cuenta-corriente.webp",
      width: 1917,
      height: 987,
      alt: {
        es: "Cuenta corriente en el portal del suscriptor de Plan Mi Casa: una tarjeta por grupo con estado, saldo, cuotas pagadas de cada etapa y unidades de ahorro, y pestañas de primeros pasos, propietario y adelantos.",
        en: "Account statement in the Plan Mi Casa subscriber portal: one card per group with status, balance, installments paid per stage and savings units, and tabs for first steps, owner and prepayments.",
      },
      caption: { es: "Plan Mi Casa · Portal · Cuenta corriente", en: "Plan Mi Casa · Portal · Account statement" },
    },
    {
      src: "/projects/plan-mi-casa/portal-pmc-suscripciones.webp",
      width: 1917,
      height: 987,
      alt: {
        es: "Suscripciones en el portal de Plan Mi Casa: el bien base de cada una, su estado y el de su cuenta corriente, y los datos de la suscripción y del grupo, con pestañas de cuotas y documentos.",
        en: "Subscriptions in the Plan Mi Casa portal: each one's base property, its status and its account status, plus subscription and group details, with installments and documents tabs.",
      },
      caption: { es: "Plan Mi Casa · Portal · Suscripciones", en: "Plan Mi Casa · Portal · Subscriptions" },
    },
    {
      src: "/projects/plan-mi-casa/portal-pmc-mis-datos.webp",
      width: 1917,
      height: 986,
      alt: {
        es: "Mis datos en el portal de Plan Mi Casa: datos personales e información profesional del suscriptor de demo.",
        en: "My details in the Plan Mi Casa portal: the demo subscriber's personal and professional information.",
      },
      caption: { es: "Plan Mi Casa · Portal · Mis datos", en: "Plan Mi Casa · Portal · My details" },
    },
    {
      src: "/projects/plan-mi-casa/pmc-dashboard.webp",
      width: 1917,
      height: 987,
      alt: {
        es: "Dashboard del panel de Plan Mi Casa: valor de la unidad de ahorro y su variación, tasas de interés del mes, suscriptores y suscripciones activas, y unidades funcionales disponibles.",
        en: "Plan Mi Casa back-office dashboard: the savings unit value and its change, the month's interest rates, active subscribers and subscriptions, and available housing units.",
      },
      caption: { es: "Plan Mi Casa · Panel · Dashboard", en: "Plan Mi Casa · Back office · Dashboard" },
    },
    {
      src: "/projects/plan-mi-casa/pmc-cuentas-corrientes.webp",
      width: 1917,
      height: 985,
      alt: {
        es: "Cuentas corrientes activas de Plan Mi Casa: búsqueda por nombre, legajo o CUIL, filtros por grupo, estado y tipo de plan, totales al día y en mora, y exportación a CSV, XLS y PDF.",
        en: "Plan Mi Casa active accounts: search by name, file number or tax ID, filters by group, status and plan type, totals up to date and overdue, and CSV, XLS and PDF export.",
      },
      caption: { es: "Plan Mi Casa · Panel · Cuentas corrientes", en: "Plan Mi Casa · Back office · Accounts" },
    },
    {
      src: "/projects/plan-mi-casa/pmc-unidades-funcionales.webp",
      width: 1917,
      height: 987,
      alt: {
        es: "Unidades funcionales de Plan Mi Casa por proyecto, con superficie, ambientes, precio en unidades de ahorro, terminaciones y estado de asignación y de construcción.",
        en: "Plan Mi Casa housing units by project, with floor area, rooms, price in savings units, finish and allocation and construction status.",
      },
      caption: { es: "Plan Mi Casa · Panel · Unidades funcionales", en: "Plan Mi Casa · Back office · Housing units" },
    },
    {
      src: "/projects/plan-mi-casa/portal-tcc-inicio.webp",
      width: 1917,
      height: 985,
      alt: {
        es: "Inicio del portal de Tu Casa en Cuotas: el avance de los pagos realizados, el próximo pago con su vencimiento y el aviso de documentos pendientes de carga.",
        en: "Tu Casa en Cuotas portal home: progress of payments made, the next payment with its due date and a notice about documents still to upload.",
      },
      caption: { es: "Tu Casa en Cuotas · Portal · Inicio", en: "Tu Casa en Cuotas · Portal · Home" },
    },
    {
      src: "/projects/plan-mi-casa/portal-tcc-mis-datos.webp",
      width: 1917,
      height: 987,
      alt: {
        es: "Mis datos en el portal de Tu Casa en Cuotas: datos personales, domicilio y contacto del suscriptor de demo, con emails y CUIL adicionales.",
        en: "My details in the Tu Casa en Cuotas portal: the demo subscriber's personal details, address and contact information, with additional emails and tax IDs.",
      },
      caption: { es: "Tu Casa en Cuotas · Portal · Mis datos", en: "Tu Casa en Cuotas · Portal · My details" },
    },
    {
      src: "/projects/plan-mi-casa/portal-tcc-mis-documentos.webp",
      width: 1917,
      height: 986,
      alt: {
        es: "Mis documentos en el portal de Tu Casa en Cuotas: documentos personales y documentos de cada suscripción, como el contrato y el certificado de posesión.",
        en: "My documents in the Tu Casa en Cuotas portal: personal documents and each subscription's documents, such as the contract and the possession certificate.",
      },
      caption: { es: "Tu Casa en Cuotas · Portal · Mis documentos", en: "Tu Casa en Cuotas · Portal · My documents" },
    },
    {
      src: "/projects/plan-mi-casa/tcc-dashboard.webp",
      width: 1917,
      height: 986,
      alt: {
        es: "Panel del personal de Tu Casa en Cuotas: totales de suscriptores, suscripciones, documentos y pagos, y suscriptores recientes.",
        en: "Tu Casa en Cuotas staff panel: totals for subscribers, subscriptions, documents and payments, and recent subscribers.",
      },
      caption: { es: "Tu Casa en Cuotas · Panel", en: "Tu Casa en Cuotas · Staff panel" },
    },
    {
      src: "/projects/plan-mi-casa/tcc-planes.webp",
      width: 1917,
      height: 986,
      alt: {
        es: "Planes de Tu Casa en Cuotas: contratos de financiación por tipo, con sus etapas, sorteos y licitaciones, y exportación a CSV, XLS y PDF.",
        en: "Tu Casa en Cuotas plans: financing contracts by type, with their stages, draws and bids, and CSV, XLS and PDF export.",
      },
      caption: { es: "Tu Casa en Cuotas · Panel · Planes", en: "Tu Casa en Cuotas · Staff panel · Plans" },
    },
  ],
  copy: {
    es: {
      title: "Plan Mi Casa y Tu Casa en Cuotas",
      summary:
        "El sistema de un plan de ahorro para la vivienda, hoy el sistema principal del cliente, y el template SaaS que nació de él para replicarlo en planes similares. Desarrollé la mayor parte del portal del suscriptor y gran parte del frontend del template.",
      role: "Frontend: trabajo en la gran mayoría de las pantallas de Plan Mi Casa, del portal del suscriptor (en su mayor parte desarrollo propio) y del panel administrativo, y gran parte del frontend de Tu Casa en Cuotas.",
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
      role: "Frontend: work on the vast majority of Plan Mi Casa's screens, across the subscriber portal (mostly my own work) and the back office, and a large part of the Tu Casa en Cuotas frontend.",
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
