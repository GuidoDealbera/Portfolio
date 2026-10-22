import "server-only";
import { z } from "zod";
import { EMAIL_PATTERN, limits } from "./shared";

/**
 * Las reglas de validación. Sólo el servidor usa Zod: el navegador no lo descarga y valida con
 * `validateContact` (shared.ts), que repite estas reglas con el mismo patrón de email.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(limits.name, "tooLong"),
  email: z
    .string()
    .trim()
    .min(1, "required")
    .max(limits.email, "tooLong")
    .pipe(z.email({ pattern: EMAIL_PATTERN, error: "invalid" })),
  message: z.string().trim().min(1, "required").min(limits.messageMin, "tooShort").max(limits.message, "tooLong"),
});
