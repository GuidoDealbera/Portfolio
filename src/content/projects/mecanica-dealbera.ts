import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (ficha 3.5) y lo que Guido confirmó el
 * 2026-10-21: es freelance, para el taller de un familiar, sigue en desarrollo y
 * el taller todavía no la usa, con la condición de costo cero. El repo es
 * público para distribuir el instalador por GitHub Releases.
 */
export const mecanicaDealbera: Project = {
  slug: "mecanica-dealbera",
  year: 2026,
  context: "freelance",
  status: "inProgress",
  stack: ["Electron", "React", "TypeScript", "SQLite", "TypeORM"],
  links: { repo: "https://github.com/GuidoDealbera/mecanica-dealbera" },
  copy: {
    es: {
      title: "Mecánica Dealbera",
      summary:
        "Aplicación de escritorio para gestionar un taller mecánico: clientes, vehículos, trabajos, recordatorios de service y presupuestos en PDF. Funciona sin internet, guarda los datos en la PC del taller y se actualiza sola.",
      role: "Diseño y desarrollo completos, como freelance.",
      problem: [
        "Un taller chico pierde clientes y plata por cosas que no son mecánica: se olvida de avisar el próximo service, no encuentra qué se le hizo a un auto hace un año y arma los presupuestos a mano. Todo vive en un cuaderno o en una planilla que se puede perder.",
        "El taller, de un familiar, necesitaba ordenar todo eso sin pagar una suscripción ni depender de internet. La condición era que funcionar no costara nada.",
      ],
      decisions: [
        "Escritorio con Electron y datos locales en SQLite: funciona sin conexión, sin servidor ni cuota mensual. La interfaz está hecha en React 19, TypeScript, HeroUI y Tailwind CSS.",
        "Primero, no perder datos: antes de cada migración se saca una copia consistente de la base y después se verifica su integridad; si no se puede copiar, la aplicación no arranca. Además hay un respaldo diario y una papelera para recuperar lo borrado.",
        "Las reglas se validan en el proceso principal, no sólo en el formulario: un test de contrato recorre todos los canales entre la interfaz y la base y comprueba que ninguno falle ante datos inválidos.",
        "La lógica de negocio no depende de Electron: los servicios reciben la conexión a la base como parámetro, así se prueban contra una base real y se pueden llevar a un servidor sin reescribirlos.",
        "Publicación automatizada: la integración continua arma el instalador y sólo publica la actualización si el hash del archivo coincide. Se diseñó así después de dos versiones que salieron rotas.",
      ],
      result: [
        "Va por la versión 2.1: recordatorios de service por fecha o por kilómetros con aviso por WhatsApp, documentos numerados que se reimprimen tal como salieron, búsqueda global y tema claro y oscuro. Tiene más de 400 pruebas automáticas que corren en la integración continua.",
        "Todavía está en desarrollo: el taller la va a empezar a usar cuando esté terminada. La documentación del proyecto ya analiza qué falta para ofrecerla a otros talleres.",
      ],
    },
    en: {
      title: "Mecánica Dealbera",
      summary:
        "A desktop app to run a car repair shop: customers, vehicles, jobs, service reminders and PDF quotes. It works offline, keeps the data on the shop's own computer and updates itself.",
      role: "End-to-end design and development, as a freelancer.",
      problem: [
        "A small repair shop loses customers and money over things that have nothing to do with mechanics: forgetting to remind someone about their next service, not finding what was done to a car a year ago, writing quotes by hand. Everything lives in a notebook or a spreadsheet that can get lost.",
        "The shop, owned by a relative, needed to get organized without paying for a subscription or depending on an internet connection. The requirement was that running it would cost nothing.",
      ],
      decisions: [
        "A desktop app with Electron and local data in SQLite: it works offline, with no server and no monthly fee. The interface is built with React 19, TypeScript, HeroUI and Tailwind CSS.",
        "Never lose data: before every migration the app takes a consistent copy of the database and then checks its integrity; if the copy fails, the app won't start. On top of that there's a daily backup and a trash bin to restore deleted records.",
        "Rules are validated in the main process, not just in the form: a contract test goes through every channel between the interface and the database and checks that none of them breaks on invalid input.",
        "Business logic doesn't depend on Electron: services receive the database connection as a parameter, so they are tested against a real database and could move to a server without a rewrite.",
        "Automated releases: CI builds the installer and only publishes the update if the file hash matches. It was designed that way after two releases shipped broken.",
      ],
      result: [
        "It's at version 2.1: service reminders by date or mileage with a WhatsApp notice, numbered documents that reprint exactly as issued, global search, and light and dark themes. More than 400 automated tests run in CI.",
        "It's still in development: the shop will start using it once it's finished. The project docs already map out what's missing to offer it to other shops.",
      ],
    },
  },
};
