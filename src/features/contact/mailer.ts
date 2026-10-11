import "server-only";
import { site } from "@/content/site";
import type { ContactValues } from "./shared";

/**
 * ÚNICO archivo que conoce al proveedor de email. Para cambiar de Resend a
 * otro servicio (EmailJS, SES…) se reescribe `sendContactEmail` y nada más:
 * la validación, la acción y el formulario no se enteran.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const TIMEOUT_MS = 10_000;

/** Un nombre con saltos de línea no puede colarse en el asunto. */
function oneLine(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

/** `true` si el mensaje quedó enviado. Nunca lanza: el que llama sólo necesita saber si salió. */
export async function sendContactEmail({ name, email, message }: ContactValues): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    if (process.env.NODE_ENV === "production") {
      console.error("[contact] Falta RESEND_API_KEY: el mensaje no se envió.");
      return false;
    }
    // Sin clave en desarrollo se puede probar todo el flujo del formulario sin enviar nada.
    console.info(`[contact] Sin RESEND_API_KEY: el mensaje NO se envía, se imprime acá.\n`, { name, email, message });
    return true;
  }

  // `||` y no `??`: una variable declarada pero vacía en .env.local tiene que caer al valor por defecto.
  const to = process.env.CONTACT_TO_EMAIL || site.email;
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to,
        reply_to: email, // contestar desde el mail desemboca en el visitante, no en el remitente técnico
        subject: `Portfolio · ${oneLine(name)}`,
        text: `Nombre: ${oneLine(name)}\nEmail: ${email}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!response.ok) {
      // El cuerpo del error de Resend no incluye el mensaje del visitante: es seguro loguearlo.
      console.error(`[contact] Resend respondió ${response.status}:`, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("[contact] No se pudo contactar a Resend:", error);
    return false;
  }
}
