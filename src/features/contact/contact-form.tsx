"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useActionState, useEffect, useRef, useState } from "react";
import { chalkEase } from "@/components/motion/ease";
import { Button } from "@/components/ui/button";
import { submitContact } from "./actions";
import { MessageSent, measureLaunch, type Launch } from "./message-sent";
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

/** Un trazo de tiza que gira mientras el mensaje viaja. */
function ChalkSpinner() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 animate-spin">
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="30 18" />
    </svg>
  );
}

export function ContactForm({ labels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  // Se mide al enviar, con JavaScript. Sin medida (sin JS, o con movimiento reducido) la confirmación no se anima.
  const [launch, setLaunch] = useState<Launch | null>(null);
  const reduceMotion = useReducedMotion();
  const sent = state.status === "success";

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
    // Formulario y confirmación comparten la misma celda: mientras uno se va, el otro llega en el mismo lugar.
    <div className="grid">
      {/* Región viva persistente: se anuncia el cambio de contenido, no el montaje del elemento. */}
      <div role="status" aria-live="polite" className="col-start-1 row-start-1">
        {pending && <span className="sr-only">{labels.sending}</span>}
        {sent && (
          <>
            <span className="sr-only">{`${labels.successTitle} ${labels.successBody}`}</span>
            <MessageSent title={labels.successTitle} body={labels.successBody} launch={reduceMotion ? null : launch} />
          </>
        )}
      </div>

      <AnimatePresence initial={false}>
        {!sent && (
          // noValidate: los mensajes de error salen en el idioma del sitio, no en el del navegador.
          <motion.form
            key="form"
            ref={formRef}
            action={formAction}
            onSubmit={(event) => setLaunch(measureLaunch(event.currentTarget))}
            noValidate
            className="col-start-1 row-start-1 flex flex-col gap-5"
            // Al confirmarse el envío, el formulario se deshace en polvo de tiza mientras el botón se pliega en avión.
            exit={{ opacity: 0, filter: "blur(10px)", y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: chalkEase }}
          >
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
                {pending && <ChalkSpinner />}
                {pending ? labels.sending : labels.submit}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
