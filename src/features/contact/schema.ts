import "server-only";
import { z } from "zod";
import { limits } from "./shared";

/** Las reglas de validación. Sólo el servidor la usa: el navegador no descarga Zod. */
export const contactSchema = z.object({
  name: z.string().trim().min(1, "required").max(limits.name, "tooLong"),
  email: z.string().trim().min(1, "required").max(limits.email, "tooLong").pipe(z.email("invalid")),
  message: z.string().trim().min(1, "required").min(limits.messageMin, "tooShort").max(limits.message, "tooLong"),
});
