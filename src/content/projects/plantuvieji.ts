import type { Project } from "./types";

/**
 * Fuente: el repo `Mecantronic/plantuvieji`, leído el 2026-10-23. Guido se sumó en octubre de 2026 y sus
 * seis primeros PRs (#133, #143, #149, #150, #151 y #152) están mergeados en `develop`. Sólo se cuenta lo
 * que hacen esos commits. El proyecto está en la etapa de demo (docs/planes/E1-demo.md), camino a
 * producción. El repo no nombra al cliente: el caso tampoco.
 */
export const plantuvieji: Project = {
  slug: "plantuvieji",
  year: 2026,
  context: "mecantronic",
  status: "inProgress",
  stack: ["FastAPI", "PostgreSQL", "Celery", "React", "TypeScript", "Claude API"],
  links: {},
  copy: {
    es: {
      title: "Plantuvieji",
      summary:
        "Módulo de compras con IA: pide cotizaciones a proveedores por email, lee los presupuestos que mandan, arma la comparativa y deja elegir al ganador, siempre con aprobación humana. Me sumé al equipo en octubre de 2026.",
      role: "Desarrollo full stack dentro del equipo: seguridad del servicio de IA, reglas de envío de comunicaciones, fechas y zonas horarias, e interfaz de la licitación.",
      problem: [
        "Una licitación de compras se maneja con muchos emails: invitar a los proveedores, recordarles, recibir sus presupuestos en PDF, Excel o el cuerpo del mensaje, y compararlos. El sistema automatiza ese circuito y usa IA para leer los presupuestos, pero cada envío y cada elección pasan por una persona.",
        "El proyecto está en su etapa de demo, camino a producción. El objetivo de la etapa es que la demo corra de punta a punta sin mostrar un dato falso ni mandarle a un proveedor un email que no corresponde.",
      ],
      decisions: [
        "El servicio que lee los presupuestos con IA sólo atiende pedidos del sistema: exige una clave compartida, responde 401 antes de llegar al endpoint (así nunca llama al modelo, que cuesta por uso) y no arranca si la clave falta.",
        "Una comunicación que cambia el estado de un proveedor (invitación, recordatorio, baja, confirmación) sólo sale mientras ese estado lo admite. Las que quedaron pendientes y dejaron de corresponder se rechazan, y justo antes de enviar se vuelve a verificar; si el estado cambia mientras el email sale, el envío queda registrado sin pisar el estado.",
        "Las horas se guardaban en UTC sin zona y la API las devolvía sin offset, así que en Argentina se veían tres horas adelantadas. Se marcan como UTC al salir por la API, sin migrar lo guardado.",
        "Un diagnóstico medido para las pruebas que fallaban de a ratos: en el contenedor sobre WSL2 el reloj retrocede hasta un segundo varias veces por minuto, y la sesión firmada se lee como del futuro y se rechaza. Quedó documentado con su causa.",
        "La pantalla y el PDF dicen exactamente lo que hace el sistema, y el encabezado de la licitación se reorganizó para leerse completo y en castellano.",
      ],
      result: [
        "Mis primeros seis pull requests están integrados en la rama principal del proyecto. Los cambios de backend llevan pruebas automáticas que cubren cada caso, incluidas las transiciones de estado de los proveedores.",
      ],
    },
    en: {
      title: "Plantuvieji",
      summary:
        "An AI-powered purchasing module: it requests quotes from suppliers by email, reads the quotes they send back, builds the comparison and lets a person pick the winner, always with human approval. I joined the team in October 2026.",
      role: "Full stack development within the team: securing the AI service, rules for sending communications, dates and time zones, and the tender interface.",
      problem: [
        "A purchasing tender runs on a lot of email: inviting suppliers, sending reminders, receiving their quotes as PDFs, spreadsheets or in the message body, and comparing them. The system automates that cycle and uses AI to read the quotes, but every message and every choice goes through a person.",
        "The project is in its demo stage, on the way to production. The stage's goal is for the demo to run end to end without showing false data or sending a supplier an email that no longer applies.",
      ],
      decisions: [
        "The service that reads quotes with AI only serves requests from the system: it requires a shared key, returns 401 before reaching the endpoint (so it never calls the model, which is billed per use) and won't start without the key.",
        "A message that changes a supplier's status (invitation, reminder, opt-out, confirmation) only goes out while that status allows it. Pending ones that no longer apply are rejected, and it's checked again right before sending; if the status changes while the email is going out, the send is recorded without overwriting the status.",
        "Timestamps were stored in UTC without a zone and the API returned them without an offset, so in Argentina they showed up three hours ahead. They're now marked as UTC on the way out of the API, with no migration of stored data.",
        "A measured diagnosis for tests that failed intermittently: in the container on WSL2 the clock goes back up to a second several times a minute, so the signed session looks like it's from the future and gets rejected. It's documented along with its cause.",
        "The screen and the PDF now say exactly what the system does, and the tender header was reorganized to read in full and in Spanish.",
      ],
      result: [
        "My first six pull requests are merged into the project's main branch. The backend changes come with automated tests covering each case, including the suppliers' status transitions.",
      ],
    },
  },
};
