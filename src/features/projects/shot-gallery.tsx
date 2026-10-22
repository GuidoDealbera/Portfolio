"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { chalkEase } from "@/components/motion/ease";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Icon, iconHover } from "@/components/ui/icons";
import { cn } from "@/lib/cn";

/** Una captura ya en el idioma de la página: el servidor elige los textos y el cliente sólo los muestra. */
export type GalleryShot = { src: string; width: number; height: number; alt: string; caption: string };

type GalleryLabels = { enlarge: string; close: string; previous: string; next: string; of: string };

type ShotGalleryProps = {
  shots: readonly GalleryShot[];
  /** "cover": sólo la primera, grande; "rest": las demás, en grilla. El visor recorre todas. */
  show: "cover" | "rest";
  labels: GalleryLabels;
  className?: string;
};

/**
 * Capturas de un caso. Cada una abre el visor a pantalla completa. Sin JavaScript, cada captura es un link
 * a la imagen.
 */
export function ShotGallery({ shots, show, labels, className }: ShotGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const thumb = (index: number, sizes: string, priority = false) => (
    <Thumb shot={shots[index]} sizes={sizes} priority={priority} labels={labels} onOpen={() => setOpen(index)} />
  );

  return (
    <>
      {show === "cover" ? (
        <div className={className}>{thumb(0, "(min-width: 1180px) 1052px, 100vw", true)}</div>
      ) : (
        <Stagger step={0.08} className={cn("grid gap-x-5 gap-y-8 md:grid-cols-2", className)}>
          {shots.slice(1).map((shot, i) => (
            <StaggerItem key={shot.src}>{thumb(i + 1, "(min-width: 1180px) 516px, (min-width: 768px) 50vw, 100vw")}</StaggerItem>
          ))}
        </Stagger>
      )}
      <Lightbox shots={shots} index={open} labels={labels} onChange={setOpen} />
    </>
  );
}

type ThumbProps = {
  shot: GalleryShot;
  sizes: string;
  priority: boolean;
  labels: GalleryLabels;
  onOpen: () => void;
};

/** La captura en la página: al pasar el mouse se acerca, se ilumina el borde y aparece el ícono de ampliar. */
function Thumb({ shot, sizes, priority, labels, onOpen }: ThumbProps) {
  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    // Con Ctrl o Cmd se abre la imagen en otra pestaña, como cualquier link.
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    onOpen();
  }

  return (
    <figure className="group">
      <a
        href={shot.src}
        onClick={onClick}
        className="relative block overflow-hidden rounded-2xl border border-line bg-raised transition-[border-color,box-shadow] duration-500 hover:border-accent/40 hover:shadow-[0_24px_60px_-34px_rgb(0_0_0/0.75)]"
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          priority={priority}
          className="h-auto w-full transition-transform duration-700 ease-chalk group-hover:scale-[1.025]"
        />
        <span className="sr-only">, {labels.enlarge}</span>
        <span
          aria-hidden="true"
          className="absolute top-3 right-3 grid size-10 scale-75 place-items-center rounded-full border border-line-strong bg-board/80 text-chalk opacity-0 backdrop-blur-sm transition-[opacity,scale] duration-300 ease-chalk group-hover:scale-100 group-hover:opacity-100 group-has-focus-visible:scale-100 group-has-focus-visible:opacity-100"
        >
          <Icon name="expand" className="size-4.5" />
        </span>
      </a>
      <figcaption className="mt-3 flex items-center gap-2.5 text-[14px] text-dust transition-colors duration-300 group-hover:text-chalk">
        <span aria-hidden="true" className="h-px w-5 origin-left bg-accent/60 transition-[scale] duration-500 ease-chalk group-hover:scale-x-150" />
        {shot.caption}
      </figcaption>
    </figure>
  );
}

type LightboxProps = {
  shots: readonly GalleryShot[];
  /** La captura abierta, o `null` con el visor cerrado. */
  index: number | null;
  labels: GalleryLabels;
  onChange: (index: number | null) => void;
};

/**
 * Visor a pantalla completa sobre un <dialog> nativo: atrapa el foco, cierra con Escape y devuelve el foco
 * a la captura que lo abrió. Entra y sale con el CSS de `.lightbox` (globals.css). Entre capturas se
 * desliza hacia donde se avanza; en táctil, se puede arrastrar.
 */
function Lightbox({ shots, index, labels, onChange }: LightboxProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  // +1 hacia la siguiente, -1 hacia la anterior: de qué lado entra la captura nueva.
  const [direction, setDirection] = useState(1);
  const several = shots.length > 1;

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (index !== null && !dialog.open) dialog.showModal();
    if (index === null && dialog.open) dialog.close();
  }, [index]);

  function go(step: 1 | -1) {
    if (index === null || !several) return;
    setDirection(step);
    onChange((index + step + shots.length) % shots.length);
  }

  const shot = index === null ? null : shots[index];

  return (
    <dialog
      ref={ref}
      aria-labelledby={captionId}
      // Escape o `close()`: el estado vuelve a "cerrado" en los dos casos.
      onClose={() => onChange(null)}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") go(1);
        if (event.key === "ArrowLeft") go(-1);
      }}
      className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none bg-transparent p-0 text-chalk"
    >
      {shot && index !== null && (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-[clamp(16px,3vw,32px)] pt-4">
            <p aria-hidden="true" className="text-[13px] font-bold tracking-[0.12em] text-dust tabular-nums">
              {several && `${index + 1} ${labels.of} ${shots.length}`}
            </p>
            <button
              type="button"
              onClick={() => onChange(null)}
              aria-label={labels.close}
              className="group grid size-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface/80 transition-[background-color,scale] duration-300 hover:bg-raised active:scale-90"
            >
              <Icon name="close" className={cn("transition-transform duration-300 ease-chalk", iconHover.close)} />
            </button>
          </div>

          {/* Tocar fuera de la imagen cierra el visor. */}
          <div
            className="lightbox-stage relative min-h-0 flex-1 overflow-hidden"
            onClick={(event) => event.target === event.currentTarget && onChange(null)}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ x: d * 80, opacity: 0, filter: "blur(6px)" }),
                  center: { x: 0, opacity: 1, filter: "blur(0px)" },
                  exit: (d: number) => ({ x: d * -80, opacity: 0, filter: "blur(6px)" }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: chalkEase }}
                drag={several ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.5}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1);
                  else if (info.offset.x > 70) go(-1);
                }}
                onClick={(event) => event.target === event.currentTarget && onChange(null)}
                // En celular, casi todo el ancho para la imagen: las flechas bajan y no la tapan.
                className="absolute inset-0 grid place-items-center px-3 py-4 md:px-[clamp(64px,7vw,96px)]"
              >
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  width={shot.width}
                  height={shot.height}
                  sizes="100vw"
                  quality={90}
                  draggable={false}
                  className="h-auto max-h-full w-auto max-w-full rounded-xl border border-line shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] select-none"
                />
              </motion.div>
            </AnimatePresence>

            {several && (
              <>
                <NavButton step={-1} label={labels.previous} onClick={() => go(-1)} />
                <NavButton step={1} label={labels.next} onClick={() => go(1)} />
              </>
            )}
          </div>

          {/* Región viva: al cambiar de captura, el lector de pantalla dice cuál es. */}
          <p id={captionId} aria-live="polite" className="px-6 pt-2 pb-6 text-center text-[15px] text-dust">
            <span className="sr-only">{several && `${index + 1} ${labels.of} ${shots.length}. `}</span>
            <motion.span
              key={index}
              className="inline-block"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: chalkEase }}
            >
              {shot.caption}
            </motion.span>
          </p>
        </div>
      )}
    </dialog>
  );
}

function NavButton({ step, label, onClick }: { step: 1 | -1; label: string; onClick: () => void }) {
  const icon = step === 1 ? "arrowRight" : "arrowLeft";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        // Abajo en celular, a los costados desde 768 px.
        "group absolute bottom-4 z-10 grid size-11 cursor-pointer place-items-center rounded-full border border-line-strong bg-surface/80 backdrop-blur-sm transition-[background-color,scale] duration-300 hover:bg-raised active:scale-90 md:top-1/2 md:bottom-auto md:-translate-y-1/2",
        step === 1 ? "right-[clamp(16px,2vw,24px)]" : "left-[clamp(16px,2vw,24px)]",
      )}
    >
      <Icon name={icon} className={cn("transition-transform duration-300 ease-chalk", iconHover[icon])} />
    </button>
  );
}
