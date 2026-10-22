"use server";

import { sendContactEmail } from "./mailer";
import { contactSchema } from "./schema";
import {
  fieldNames,
  HONEYPOT_FIELD,
  type ContactState,
  type ContactValues,
  type FieldError,
  type FieldName,
} from "./shared";

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Si el campo trampa vino lleno, se responde "enviado" y no se hace nada: el bot no aprende que falló.
  if (text(formData, HONEYPOT_FIELD)) return { status: "success" };

  const values = Object.fromEntries(fieldNames.map((name) => [name, text(formData, name)])) as ContactValues;
  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    const errors: Partial<Record<FieldName, FieldError>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as FieldName;
      // Un campo puede fallar por varias reglas: se muestra la primera.
      errors[field] ??= issue.message as FieldError;
    }
    return { status: "invalid", errors, values };
  }

  const sent = await sendContactEmail(parsed.data);
  return sent ? { status: "success" } : { status: "failed", values };
}
