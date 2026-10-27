import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (ficha 3.7) y lo que Guido confirmó el
 * 2026-10-21 (proyecto de Mecantronic, en producción). Es una participación
 * acotada (junio a agosto de 2026) en un sistema grande de otros: el caso cuenta
 * sólo la integración con Moodle y Keycloak.
 */
export const esconecta: Project = {
  slug: "esconecta",
  updatedAt: "2026-10-21",
  year: 2026,
  context: "mecantronic",
  status: "live",
  stack: ["NestJS", "TypeScript", "Azure Functions", "Keycloak", "Moodle"],
  links: {},
  copy: {
    es: {
      title: "ESConecta",
      summary:
        "Integración del campus Moodle en una plataforma de capacitación corporativa en producción: inicio de sesión único con Keycloak y alta, matrícula y suspensión automáticas de usuarios desde los microservicios del sistema.",
      role: "Diseño e implementación del servicio de integración con Moodle, y tema de login y configuración de Keycloak. Participación de junio a agosto de 2026 en un sistema existente.",
      problem: [
        "ESConecta gestiona capacitación corporativa en idiomas (empresas, alumnos, facilitadores, grupos y cursos) con microservicios NestJS sobre Azure Functions y microfrontends en Vue. El campus se estaba migrando a Moodle, y las dos plataformas tenían que funcionar como una sola.",
        "Eso implicaba dos cosas: entrar una sola vez y pasar de una plataforma a la otra sin volver a iniciar sesión, y que cada alta, baja o cambio de grupo en ESConecta llegara a Moodle sin intervención manual, aunque Moodle estuviera caído o respondiera con errores.",
      ],
      decisions: [
        "Un servicio de integración como única puerta hacia Moodle: un cliente de sus Web Services que detecta los errores que Moodle devuelve con estado 200, reintenta los fallos transitorios y nunca escribe el token en los logs.",
        "Operaciones idempotentes: el alta busca primero por identificador y por email antes de crear, la matrícula parte de lo que ya existe y una baja suspende sin desmatricular, así que repetir una operación nunca rompe nada.",
        "Reconciliación en lugar de colas: cada sincronización registra su estado, y un panel de operación permite reintentar lo que falló recalculando el estado deseado, sin guardar el pedido original.",
        "Las llamadas al campus quedan fuera de la transacción y no la deshacen: si Moodle falla, el alta en ESConecta se completa igual y queda pendiente de sincronizar.",
        "Inicio de sesión único con Keycloak: un tema de login propio y la configuración del realm endurecida, aplicada de forma idempotente y con pruebas de humo en el pipeline.",
      ],
      result: [
        "La integración está en producción y el cliente usa la plataforma. El servicio quedó documentado con un contrato OpenAPI de 16 endpoints cubierto por tests y conectado a cuatro microservicios del sistema.",
      ],
    },
    en: {
      title: "ESConecta",
      summary:
        "Integrating a Moodle campus into a corporate training platform in production: single sign-on with Keycloak, plus automatic user provisioning, enrollment and suspension driven by the system's microservices.",
      role: "Designed and built the Moodle integration service, plus the Keycloak login theme and configuration. A June to August 2026 engagement on an existing system.",
      problem: [
        "ESConecta manages corporate language training (companies, students, instructors, groups and courses) with NestJS microservices on Azure Functions and Vue micro-frontends. The campus was moving to Moodle, and both platforms had to work as one.",
        "That meant two things: signing in once and moving between platforms without logging in again, and having every sign-up, removal or group change in ESConecta reach Moodle without manual work, even when Moodle was down or returning errors.",
      ],
      decisions: [
        "A single integration service as the only gateway to Moodle: a Web Services client that catches the errors Moodle returns with a 200 status, retries transient failures and never writes the token to the logs.",
        "Idempotent operations: provisioning looks a user up by ID and email before creating one, enrollment starts from what already exists, and removal suspends instead of unenrolling, so repeating an operation never breaks anything.",
        "Reconciliation instead of queues: every sync records its state, and an operations endpoint retries what failed by recomputing the desired state, without storing the original request.",
        "Calls to the campus stay outside the transaction and never roll it back: if Moodle fails, the change in ESConecta still goes through and is left pending sync.",
        "Single sign-on with Keycloak: a custom login theme and a hardened realm configuration, applied idempotently and covered by smoke tests in the pipeline.",
      ],
      result: [
        "The integration is in production and the client uses the platform. The service is documented with a 16-endpoint OpenAPI contract covered by tests, and wired into four of the system's microservices.",
      ],
    },
  },
};
