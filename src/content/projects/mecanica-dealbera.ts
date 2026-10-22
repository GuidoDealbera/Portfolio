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
  // Datos de prueba: clientes, patentes y teléfonos son inventados (los correos son @example.com).
  shots: [
    {
      src: "/projects/mecanica-dealbera/dashboard.webp",
      width: 1917,
      height: 1110,
      alt: {
        es: "Inicio de la aplicación: vehículos registrados, clientes activos, trabajos en curso e ingresos del mes, un gráfico de ingresos de los últimos seis meses, trabajos por estado y el aviso de vehículos que necesitan service.",
        en: "The app's home screen: registered vehicles, active customers, jobs in progress and monthly revenue, a six-month revenue chart, jobs by status and a warning about vehicles due for service.",
      },
      caption: { es: "Inicio", en: "Home" },
    },
    {
      src: "/projects/mecanica-dealbera/autos.webp",
      width: 1917,
      height: 1106,
      alt: {
        es: "Listado de vehículos con búsqueda por patente y filtros por marca y año: patente, marca, modelo, año, kilometraje y dueño.",
        en: "Vehicle list with search by license plate and filters by make and year: plate, make, model, year, mileage and owner.",
      },
      caption: { es: "Vehículos", en: "Vehicles" },
    },
    {
      src: "/projects/mecanica-dealbera/clientes.webp",
      width: 1917,
      height: 1103,
      alt: {
        es: "Listado de clientes con búsqueda por nombre y filtro por ciudad: teléfono, correo, dirección, vehículos y estado.",
        en: "Customer list with search by name and a city filter: phone, email, address, vehicles and status.",
      },
      caption: { es: "Clientes", en: "Customers" },
    },
    {
      src: "/projects/mecanica-dealbera/detalle-vehiculo.webp",
      width: 1917,
      height: 1108,
      alt: {
        es: "Ficha de un vehículo: próximo service por fecha y por kilometraje, con una estimación de cuándo se llegaría al kilometraje, intervalos propios del vehículo y documentos emitidos.",
        en: "A vehicle's record: next service by date and by mileage, with an estimate of when the mileage will be reached, vehicle-specific intervals and issued documents.",
      },
      caption: { es: "Ficha del vehículo", en: "Vehicle record" },
    },
    {
      src: "/projects/mecanica-dealbera/detalle-vehiculo-trabajos.webp",
      width: 1917,
      height: 952,
      alt: {
        es: "Trabajos de un vehículo con estado y precio, los datos del vehículo y del titular, y un botón para escribirle por WhatsApp.",
        en: "A vehicle's jobs with status and price, the vehicle and owner details, and a button to message the owner on WhatsApp.",
      },
      caption: { es: "Trabajos y titular", en: "Jobs and owner" },
    },
    {
      src: "/projects/mecanica-dealbera/detalle-vehiculo-historial.webp",
      width: 1917,
      height: 958,
      alt: {
        es: "Historial de un vehículo en una línea de tiempo: trabajos realizados y actualizaciones de kilometraje con su fecha.",
        en: "A vehicle's history on a timeline: completed jobs and mileage updates with their dates.",
      },
      caption: { es: "Historial del vehículo", en: "Vehicle history" },
    },
    {
      src: "/projects/mecanica-dealbera/recordatorios.webp",
      width: 1917,
      height: 1107,
      alt: {
        es: "Recordatorios de service vencidos o por vencer, por fecha o por kilometraje, con aviso al cliente por WhatsApp y opciones para posponer, marcar como hecho o descartar.",
        en: "Service reminders that are overdue or coming up, by date or mileage, with a WhatsApp message to the customer and options to postpone, mark as done or dismiss.",
      },
      caption: { es: "Recordatorios de service", en: "Service reminders" },
    },
  ],
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
