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

export type ContactState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "invalid"; errors: Partial<Record<FieldName, FieldError>>; values: ContactValues }
  | { status: "failed"; values: ContactValues };

export const initialContactState: ContactState = { status: "idle" };
