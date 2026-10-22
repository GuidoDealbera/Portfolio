/**
 * Constantes y tipos que comparten el servidor y el formulario del navegador.
 * Sin dependencias a propósito: lo que se importe desde acá viaja al cliente,
 * así que Zod vive aparte, en schema.ts.
 */

export const limits = { name: 120, email: 254, messageMin: 10, message: 5000 } as const;

/** Campo trampa: un humano no lo ve, un bot que rellena todo lo completa. Vive acá porque un archivo "use server" sólo exporta funciones. */
export const HONEYPOT_FIELD = "website";

export const fieldNames = ["name", "email", "message"] as const;
export type FieldName = (typeof fieldNames)[number];

/**
 * Los errores son códigos, no texto: la acción corre en el servidor sin saber
 * el idioma, y el formulario los traduce con el diccionario.
 */
export type FieldError = "required" | "invalid" | "tooShort" | "tooLong";

export type ContactValues = Record<FieldName, string>;
export type ContactErrors = Partial<Record<FieldName, FieldError>>;

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: ContactErrors; values: ContactValues }
  | { status: "failed"; values: ContactValues };

export const initialContactState: ContactState = { status: "idle" };

/** El patrón de email por defecto de Zod. Lo usan el navegador y el servidor, así aceptan exactamente lo mismo. */
export const EMAIL_PATTERN =
  /^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;

/**
 * Las mismas reglas que `contactSchema` (schema.ts), sin Zod: el formulario las usa para avisar mientras
 * se escribe y para no habilitar el envío hasta que todo esté bien. La última palabra la tiene el servidor.
 */
export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "required";
  else if (name.length > limits.name) errors.name = "tooLong";

  if (!email) errors.email = "required";
  else if (email.length > limits.email) errors.email = "tooLong";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "invalid";

  if (!message) errors.message = "required";
  else if (message.length < limits.messageMin) errors.message = "tooShort";
  else if (message.length > limits.message) errors.message = "tooLong";

  return errors;
}
