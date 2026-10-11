"use client";

import { useActionState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { submitContact } from "./actions";
import { HONEYPOT_FIELD, initialContactState, limits, type FieldError, type FieldName } from "./shared";

type ContactFormProps = {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    sending: string;
    successTitle: string;
    successBody: string;
    failed: string;
    errors: Record<FieldError, string>;
  };
};

const control =
  "w-full rounded-[10px] border border-line-strong bg-board px-4 py-3.5 text-chalk transition-colors duration-300 focus:border-accent aria-[invalid=true]:border-danger";
const labelClass = "mb-2 block text-[13px] font-bold tracking-[0.04em] text-dust";

export function ContactForm({ labels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);

  // Tras un envío inválido, el foco va al primer campo con error: el teclado no se pierde.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [state]);

  const values = state.status === "invalid" || state.status === "failed" ? state.values : undefined;
  const errors = state.status === "invalid" ? state.errors : {};

  const fieldProps = (name: FieldName) => ({
    id: `contact-${name}`,
    name,
    defaultValue: values?.[name],
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
    className: control,
  });

  const errorText = (name: FieldName) => {
    const code = errors[name];
    return code ? (
      <p id={`contact-${name}-error`} className="mt-1.5 text-[13px] text-danger">
        {labels.errors[code]}
      </p>
    ) : null;
  };

  return (
    <div>
      {/* Región viva persistente: se anuncia el cambio de contenido, no el montaje del elemento. */}
      <div role="status" aria-live="polite">
        {pending && <span className="sr-only">{labels.sending}</span>}
        {state.status === "success" && (
          <div className="soft-accent rounded-[14px] border border-accent/30 p-7">
            <p className="font-display text-xl font-semibold tracking-[-0.02em]">{labels.successTitle}</p>
            <p className="mt-2 text-dust">{labels.successBody}</p>
          </div>
        )}
      </div>

      {state.status !== "success" && (
        // noValidate: los mensajes de error salen en el idioma del sitio, no en el del navegador.
        <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
          <div>
            <label htmlFor="contact-name" className={labelClass}>
              {labels.name}
            </label>
            <input {...fieldProps("name")} type="text" autoComplete="name" maxLength={limits.name} />
            {errorText("name")}
          </div>

          <div>
            <label htmlFor="contact-email" className={labelClass}>
              {labels.email}
            </label>
            <input
              {...fieldProps("email")}
              type="email"
              inputMode="email"
              autoComplete="email"
              maxLength={limits.email}
            />
            {errorText("email")}
          </div>

          <div>
            <label htmlFor="contact-message" className={labelClass}>
              {labels.message}
            </label>
            <textarea {...fieldProps("message")} rows={6} maxLength={limits.message} className={`${control} min-h-36 resize-y`} />
            {errorText("message")}
          </div>

          {/* Campo trampa: fuera de pantalla, sin foco y oculto a lectores de pantalla. */}
          <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label>
              Website
              <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          {state.status === "failed" && (
            <p role="alert" className="text-[14px] text-danger">
              {labels.failed}
            </p>
          )}

          <div>
            <Button type="submit" disabled={pending}>
              {pending ? labels.sending : labels.submit}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
