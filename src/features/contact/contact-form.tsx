"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { chalkEase } from "@/components/motion/ease";
import { introStyle } from "@/components/motion/intro";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { submitContact } from "./actions";
import { MessageSent, measureLaunch, type Launch } from "./message-sent";
import {
  HONEYPOT_FIELD,
  initialContactState,
  limits,
  validateContact,
  type ContactValues,
  type FieldError,
  type FieldName,
} from "./shared";

type ContactFormProps = {
  labels: {
    name: string;
    email: string;
    message: string;
    submit: string;
    hint: string;
    sending: string;
    successTitle: string;
    successBody: string;
    failed: string;
    errors: Record<FieldError, string>;
  };
};

// Al enfocar, el borde se vuelve tiza y aparece un halo, que reemplaza al anillo de foco general (los dos
// juntos se ven como un doble contorno). Con error, el campo tiembla una vez.
const control =
  "w-full rounded-[10px] border border-line-strong bg-board py-3.5 pr-11 pl-4 text-chalk transition-[border-color,box-shadow] duration-300 focus:border-accent focus:shadow-[0_0_0_4px_color-mix(in_srgb,var(--color-accent)_22%,transparent)] focus-visible:outline-none aria-invalid:animate-shake aria-invalid:border-danger";
const labelClass =
  "mb-2 block text-[13px] font-bold tracking-[0.04em] text-dust transition-colors duration-300 group-focus-within:text-accent";

const emptyValues: ContactValues = { name: "", email: "", message: "" };
const noFields: Record<FieldName, boolean> = { name: false, email: false, message: false };

// Sin JavaScript nadie valida en el navegador: el botón tiene que quedar habilitado y que decida el servidor.
const subscribeNothing = () => () => {};
function useHydrated() {
  return useSyncExternalStore(
    subscribeNothing,
    () => true,
    () => false,
  );
}

/** Un trazo de tiza que gira mientras el mensaje viaja. */
function ChalkSpinner() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 animate-spin">
      <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="30 18" />
    </svg>
  );
}

/** Tilde de tiza dentro del campo cuando lo escrito ya es válido: se dibuja cada vez que aparece. */
function ValidMark({ show, className }: { show: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cn("pointer-events-none absolute right-3.5 size-5 text-accent", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {show && (
        <path
          d="M5 12.8 C6.6 14.2 8 15.6 9.4 17.2 C12.2 13.4 15.4 9.8 19.2 6.6"
          pathLength={1}
          strokeDasharray="1"
          className="animate-draw"
        />
      )}
    </svg>
  );
}

export function ContactForm({ labels }: ContactFormProps) {
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);
  const hydrated = useHydrated();
  // Se mide al enviar, con JavaScript. Sin medida (sin JS, o con movimiento reducido) la confirmación no se anima.
  const [launch, setLaunch] = useState<Launch | null>(null);
  const reduceMotion = useReducedMotion();
  const sent = state.status === "success";

  // Campos controlados: se valida mientras se escribe. Si el servidor devolvió el formulario, arranca con lo enviado.
  const [values, setValues] = useState<ContactValues>(() =>
    state.status === "invalid" || state.status === "failed" ? state.values : emptyValues,
  );
  // Un campo muestra su error recién cuando se lo dejó con algo escrito: no se reta a nadie por un campo
  // que todavía no completó. A partir de ahí, el error se actualiza con cada tecla.
  const [touched, setTouched] = useState(noFields);
  // Los errores que mande el servidor valen hasta que se edita ese campo; una respuesta nueva los repone.
  const [response, setResponse] = useState(state);
  const [edited, setEdited] = useState(noFields);
  if (response !== state) {
    setResponse(state);
    setEdited(noFields);
  }

  // Tras un envío inválido, el foco va al primer campo con error: el teclado no se pierde.
  useEffect(() => {
    if (state.status === "invalid") {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }
  }, [state]);

  const clientErrors = validateContact(values);
  const serverErrors = state.status === "invalid" ? state.errors : {};
  const ready = Object.keys(clientErrors).length === 0;
  // Sólo con JavaScript: sin él, el botón queda habilitado y valida el servidor.
  const blocked = hydrated && !ready;

  const errorFor = (name: FieldName): FieldError | undefined =>
    (!edited[name] && serverErrors[name]) || (touched[name] ? clientErrors[name] : undefined);

  const fieldProps = (name: FieldName) => {
    const error = errorFor(name);
    return {
      id: `contact-${name}`,
      name,
      value: values[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValues((current) => ({ ...current, [name]: value }));
        setEdited((current) => ({ ...current, [name]: true }));
      },
      onBlur: () => {
        if (values[name].trim()) setTouched((current) => ({ ...current, [name]: true }));
      },
      "aria-invalid": error ? (true as const) : undefined,
      "aria-describedby": error ? `contact-${name}-error` : undefined,
      className: control,
    };
  };

  const errorText = (name: FieldName) => {
    const code = errorFor(name);
    return code ? (
      // Entra desde arriba, desenfocado, cada vez que cambia el motivo.
      <p
        key={code}
        id={`contact-${name}-error`}
        className="mt-1.5 animate-chalk-in text-[13px] text-danger"
        style={introStyle(0, "-6px")}
      >
        {labels.errors[code]}
      </p>
    ) : null;
  };

  const isValid = (name: FieldName) => values[name].trim() !== "" && !clientErrors[name];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    // Con el botón deshabilitado no se llega acá, salvo con Enter en algún navegador viejo: se cancela y se
    // muestran todos los errores.
    if (!ready) {
      event.preventDefault();
      setTouched({ name: true, email: true, message: true });
      return;
    }
    setLaunch(measureLaunch(event.currentTarget));
  }

  // El mensaje tiene un mínimo: una línea de tiza se llena hasta alcanzarlo.
  const messageLength = values.message.trim().length;
  const progress = Math.min(messageLength / limits.messageMin, 1);

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
            onSubmit={onSubmit}
            noValidate
            className="col-start-1 row-start-1 flex flex-col gap-5"
            // Al confirmarse el envío, el formulario se deshace en polvo de tiza mientras el botón se pliega en avión.
            exit={{ opacity: 0, filter: "blur(10px)", y: -12 }}
            transition={{ duration: reduceMotion ? 0 : 0.45, ease: chalkEase }}
          >
            <div className="group">
              <label htmlFor="contact-name" className={labelClass}>
                {labels.name}
              </label>
              <div className="relative flex items-center">
                <input {...fieldProps("name")} type="text" autoComplete="name" maxLength={limits.name} />
                <ValidMark show={isValid("name")} />
              </div>
              {errorText("name")}
            </div>

            <div className="group">
              <label htmlFor="contact-email" className={labelClass}>
                {labels.email}
              </label>
              <div className="relative flex items-center">
                <input
                  {...fieldProps("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  maxLength={limits.email}
                />
                <ValidMark show={isValid("email")} />
              </div>
              {errorText("email")}
            </div>

            <div className="group">
              <label htmlFor="contact-message" className={labelClass}>
                {labels.message}
              </label>
              <div className="relative">
                <textarea
                  {...fieldProps("message")}
                  rows={6}
                  maxLength={limits.message}
                  className={`${control} block min-h-36 resize-y`}
                />
                <ValidMark show={isValid("message")} className="top-3.5" />
              </div>
              {/* Decorativo: el mínimo lo dicen la ayuda junto al botón y, si hace falta, el error. */}
              <div aria-hidden="true" className="mt-2 flex items-center gap-3">
                <span className="relative h-px flex-1 overflow-hidden bg-line">
                  <span
                    className={cn(
                      "absolute inset-0 origin-left transition-[scale,background-color] duration-500 ease-chalk",
                      progress === 1 ? "bg-accent" : "bg-dust",
                    )}
                    style={{ scale: `${progress} 1` }}
                  />
                </span>
                <span
                  className={cn(
                    "text-[12px] tabular-nums transition-colors duration-300",
                    progress === 1 ? "text-dust" : "text-dust/70",
                  )}
                >
                  {values.message.length}/{limits.message}
                </span>
              </div>
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
              <p role="alert" className="animate-chalk-in text-[14px] text-danger" style={introStyle(0, "-6px")}>
                {labels.failed}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              {/* Cuando todo queda bien, el botón se habilita con un pequeño salto. */}
              <Button
                type="submit"
                disabled={pending || blocked}
                aria-describedby={blocked ? "contact-hint" : undefined}
                trailingIcon={pending ? undefined : "paperPlane"}
                className={cn(hydrated && ready && "animate-pop")}
              >
                {pending ? labels.sending : labels.submit}
                {pending && <ChalkSpinner />}
              </Button>
              <AnimatePresence>
                {blocked && (
                  <motion.p
                    id="contact-hint"
                    className="max-w-[32ch] text-[13px] leading-normal text-dust"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    transition={{ duration: 0.35, ease: chalkEase }}
                  >
                    {labels.hint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
