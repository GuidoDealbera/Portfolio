import type { Project } from "./types";

/**
 * Fuente: INVENTARIO_PORTFOLIO.md (ficha 3.1), con autoría medida con git, y lo
 * que Guido confirmó el 2026-10-21 (permiso para nombrar al cliente, en
 * producción en etapa piloto). Proyecto de equipo: sólo se cuenta como propio
 * lo que el inventario le atribuye; el cotizador, las comisiones, los puntos y
 * la base de la web son de otros integrantes.
 */
export const durrieu: Project = {
  slug: "durrieu",
  year: 2026,
  context: "mecantronic",
  status: "pilot",
  stack: ["Next.js", "React", "FastAPI", "PostgreSQL", "Telegram", "WhatsApp"],
  links: {},
  copy: {
    es: {
      title: "Durrieu Consignatarios",
      summary:
        "Plataforma web y bot de Telegram y WhatsApp para una consignataria de hacienda, que reemplaza el WhatsApp y las planillas con que se operaban la faena y la invernada. Diseñé el bot y desarrollé funcionalidades en el backend y en la web.",
      role: "Diseño e implementación del bot; funcionalidades full stack en el backend y la web, dentro de un equipo de cuatro desarrolladores.",
      problem: [
        "Durrieu Consignatarios intermedia la venta de hacienda: ganado para faena, que va a frigoríficos, e invernada, que se negocia entre productores. Los pedidos, las cotizaciones, las ofertas y las liquidaciones se manejaban por WhatsApp y en planillas de Excel.",
        "La plataforma web ordenaba el trabajo de la oficina, pero buena parte de la operación seguía pasando por chats. Hacía falta que representantes y clientes pudieran cargar negocios, ofertas y pedidos desde Telegram o WhatsApp, sin abrir la web.",
      ],
      decisions: [
        "Un bot con arquitectura hexagonal: un motor conversacional determinista que no modifica la sesión, para que un webhook repetido no haga avanzar dos veces la conversación, y un test de arquitectura que impide que el núcleo dependa de los canales.",
        "Cuestionarios declarativos: cada flujo (alta de faena, oferta y pedido de invernada, contactos nuevos) es un dato tipado, con listas repetibles, corrección desde el resumen y los rechazos del backend llevados al paso exacto donde hay que corregir.",
        "El bot no tiene reglas de negocio propias: usa la misma API que la web mediante un cliente tipado generado desde OpenAPI, y la integración continua verifica que ese contrato no se desvíe.",
        "Seguridad en lo que queda expuesto: webhooks de WhatsApp verificados con HMAC sobre el cuerpo crudo, vinculación de cuentas de chat con códigos de un solo uso guardados como hash y con vencimiento, y límite de pedidos sobre PostgreSQL.",
        "PostgreSQL como única pieza de coordinación: las tareas periódicas del bot toman su trabajo con SELECT ... FOR UPDATE SKIP LOCKED, sin sumar Redis.",
      ],
      result: [
        "La plataforma está en producción y el cliente la usa en una etapa piloto. El bot es casi íntegramente mío (el 97 % de su código actual), y al backend y a la web les sumé la vinculación de cuentas de chat, el módulo de notificaciones, la ficha pública de lotes y mejoras en los flujos de faena e invernada.",
        "Cada cambio pasa por integración continua con pruebas del backend, del bot (incluida una de punta a punta contra el backend real) y de la web.",
      ],
    },
    en: {
      title: "Durrieu Consignatarios",
      summary:
        "A web platform and a Telegram and WhatsApp bot for a livestock trading firm, replacing the WhatsApp chats and spreadsheets its operations used to run on. I designed the bot and built features across the backend and the web app.",
      role: "Designed and built the bot; full stack features across the backend and the web app, in a team of four developers.",
      problem: [
        "Durrieu Consignatarios brokers cattle sales: finished cattle sold to meat packers, and feeder cattle traded between producers. Requests, quotes, offers and settlements were handled over WhatsApp and in Excel spreadsheets.",
        "The web platform organized the office, but much of the day-to-day still happened in chats. Agents and clients needed to log deals, offers and requests from Telegram or WhatsApp, without opening the web app.",
      ],
      decisions: [
        "A bot with hexagonal architecture: a deterministic conversation engine that never mutates the session, so a retried webhook can't advance a conversation twice, plus an architecture test that keeps the core independent from the channels.",
        "Declarative questionnaires: each flow (new deals, feeder-cattle offers and requests, new leads) is typed data, with repeatable lists, editing from the summary, and backend rejections mapped back to the exact step that needs fixing.",
        "The bot holds no business rules of its own: it uses the same API as the web app through a typed client generated from OpenAPI, and CI checks that the contract doesn't drift.",
        "Security on everything exposed: WhatsApp webhooks verified with HMAC over the raw body, chat-account linking through single-use codes stored as hashes with an expiry, and rate limiting on PostgreSQL.",
        "PostgreSQL as the only coordination layer: the bot's scheduled jobs claim work with SELECT ... FOR UPDATE SKIP LOCKED instead of adding Redis.",
      ],
      result: [
        "The platform is in production and the client is using it in a pilot stage. The bot is almost entirely my work (97% of its current code), and I added chat-account linking, the notifications module, the public lot page and improvements to the trading flows on the backend and the web app.",
        "Every change goes through CI with backend, bot (including an end-to-end test against the real backend) and web tests.",
      ],
    },
  },
};
