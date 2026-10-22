"use client";

import { animate, motion } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { ChalkUnderline } from "@/components/motion/chalk-underline";
import { chalkEase } from "@/components/motion/ease";
import { SplitText } from "@/components/motion/split-text";

/** El formulario en el momento del envío, medido en el navegador: el avión despega de su botón. */
export type Launch = {
  width: number;
  height: number;
  /** Centro del botón de envío, relativo al formulario. */
  x: number;
  y: number;
};

export function measureLaunch(form: HTMLFormElement): Launch {
  const box = form.getBoundingClientRect();
  const button = form.querySelector('[type="submit"]')?.getBoundingClientRect() ?? box;
  return {
    width: box.width,
    height: box.height,
    x: button.left + button.width / 2 - box.left,
    y: button.top + button.height / 2 - box.top,
  };
}

/** Segundos desde que llega la confirmación. */
const cue = {
  fold: 0.1, // el botón se pliega en un avión de papel
  takeOff: 0.55,
  flight: 1.75, // el avión sale del panel a los ~1,45 s; lo que sigue es la cola del rastro saliendo detrás
  circle: 1.45, // cuando el avión ya dejó el rizo
  check: 1.9,
  title: 1.95,
  underline: 2.4,
  body: 2.5,
} as const;

// Avión de papel visto desde arriba, apuntando a +x y centrado en el origen: el pliegue central separa las alas.
const PLANE = "M22 0 L-20 -14 L-11 0 L-20 14 Z";
const CREASE = "M-11 0 L22 0";

// Polvo de tiza que levanta el despegue, detrás del avión: desplazamiento (px) y radio de cada partícula.
const DUST = [
  [-36, 6, 2.6],
  [-24, -12, 2],
  [-47, -4, 1.7],
  [-18, 14, 2.3],
  [-40, 17, 1.5],
  [-29, -20, 1.8],
  [-55, 9, 1.4],
  [-12, -7, 2.1],
  [-50, -13, 1.3],
  [-26, 22, 1.6],
] as const;

// El rastro se desvanece hacia la cola: tres tramos superpuestos en la máscara, del más largo y tenue al más
// corto y opaco. El largo (px) alcanza para ver el rizo entero justo cuando el avión sale de él.
const TAILS = [
  { length: 420, opacity: 0.35 },
  { length: 250, opacity: 0.55 },
  { length: 110, opacity: 1 },
] as const;

/**
 * El recorrido, en px del formulario (así el rizo es un círculo en cualquier ancho): sale del botón en S,
 * nivela, hace un rizo y se va por la esquina de arriba a la derecha, fuera del panel.
 */
function flightPath({ width: w, height: h, x, y }: Launch) {
  const r = Math.min(58, Math.max(36, h * 0.11)); // radio del rizo
  const loopX = Math.max(w * 0.55, x + 70); // punto más bajo del rizo
  const loopY = Math.min(h * 0.58, y - 2.4 * r);
  const half = (loopX - x) / 2;
  return [
    `M${x} ${y}`,
    `C${x + half} ${y} ${loopX - half} ${loopY} ${loopX} ${loopY}`,
    `A${r} ${r} 0 0 0 ${loopX} ${loopY - 2 * r}`,
    `A${r} ${r} 0 0 0 ${loopX} ${loopY}`,
    `C${loopX + w * 0.25} ${loopY} ${w * 0.92} ${h * 0.2} ${w + 90} -90`,
  ].join(" ");
}

/** El avión de papel: se dibuja sobre el botón, despega, hace un rizo y se va dejando un rastro de tiza. */
function Flight({ launch }: { launch: Launch }) {
  const routeRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<SVGGElement>(null);
  const maskRef = useRef<SVGMaskElement>(null);
  const maskId = useId();
  const route = flightPath(launch);

  useEffect(() => {
    const path = routeRef.current;
    const plane = planeRef.current;
    const tails = Array.from(maskRef.current?.querySelectorAll("path") ?? []);
    if (!path || !plane) return;

    const total = path.getTotalLength();
    // La animación sigue más allá del final del recorrido, lo que mide la cola más larga: así el rastro
    // también sale del panel detrás del avión, en lugar de quedar dibujado.
    const reach = total + TAILS[0].length;
    // Un solo guion por tramo: el hueco es más largo que todo el vuelo, así el patrón no se repite más atrás.
    tails.forEach((tail, i) => (tail.style.strokeDasharray = `${TAILS[i].length} ${reach + total}`));

    // En cada cuadro, el avión va a su punto del recorrido, girado según la tangente, y el rastro termina en él.
    // Es un solo valor animado para los dos, así nunca se desincronizan.
    const fly = (distance: number) => {
      const along = Math.min(distance, total);
      const behind = path.getPointAtLength(Math.max(0, along - 1));
      const ahead = path.getPointAtLength(Math.min(total, along + 1));
      const { x, y } = path.getPointAtLength(along);
      const angle = (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;
      plane.setAttribute("transform", `translate(${x} ${y}) rotate(${angle})`);
      tails.forEach((tail, i) => (tail.style.strokeDashoffset = `${TAILS[i].length - distance}`));
    };

    fly(0);
    // Arranca despacio, como un despegue, y sale del panel todavía acelerando.
    const flight = animate(0, reach, {
      delay: cue.takeOff,
      duration: cue.flight,
      ease: [0.45, 0, 0.75, 0.6],
      onUpdate: fly,
    });
    return () => flight.stop();
  }, [route]);

  const { width, height } = launch;

  return (
    <svg
      aria-hidden="true"
      width={width}
      height={height}
      className="pointer-events-none absolute top-0 left-0 z-10 overflow-visible"
    >
      <defs>
        <mask ref={maskRef} id={maskId} maskUnits="userSpaceOnUse" x={-200} y={-200} width={width + 400} height={height + 400}>
          {TAILS.map(({ opacity }, i) => (
            // Sin trazo hasta que el efecto mide el recorrido: el primer cuadro no muestra el rastro entero.
            <path key={i} d={route} fill="none" stroke="white" strokeOpacity={opacity} strokeWidth={12} style={{ strokeDasharray: "0 100000" }} />
          ))}
        </mask>
      </defs>

      <path ref={routeRef} d={route} fill="none" />
      <path
        d={route}
        fill="none"
        stroke="var(--color-chalk)"
        strokeOpacity={0.6}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeDasharray="0.1 9"
        mask={`url(#${maskId})`}
      />

      {DUST.map(([dx, dy, r], i) => (
        <motion.circle
          key={i}
          cx={launch.x - 12}
          cy={launch.y}
          r={r}
          fill="var(--color-chalk)"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0], x: [0, dx], y: [0, dy] }}
          transition={{ delay: cue.takeOff + i * 0.02, duration: 0.9, ease: "easeOut" }}
        />
      ))}

      <g ref={planeRef}>
        <motion.g
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: cue.fold, duration: 0.5, ease: chalkEase }}
        >
          <motion.path
            d={PLANE}
            fill="var(--color-surface)"
            stroke="var(--color-accent)"
            strokeWidth={2}
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: cue.fold, duration: 0.45, ease: chalkEase }}
          />
          <motion.path
            d={CREASE}
            stroke="var(--color-accent)"
            strokeOpacity={0.7}
            strokeWidth={1.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: cue.fold + 0.25, duration: 0.3, ease: chalkEase }}
          />
        </motion.g>
      </g>
    </svg>
  );
}

// Círculo a mano alzada que se pasa de largo al cerrar, como cuando se marca en el pizarrón algo que está bien.
const CIRCLE = "M61 15 C45 4 14 8 9 36 C4 63 29 80 51 74 C73 68 81 44 71 25 C66 16 56 11 45 10";
const CHECK = "M26 43 C30 47 33 51 37 56 C44 45 52 35 62 26";

function CircledCheck({ animated }: { animated: boolean }) {
  // La opacidad entra de golpe: con pathLength en 0, la punta redondeada del trazo dejaría un punto suelto.
  const draw = (delay: number, duration: number) => ({
    initial: animated ? { pathLength: 0, opacity: 0 } : false,
    animate: { pathLength: 1, opacity: 1 },
    transition: { delay, duration, ease: chalkEase, opacity: { delay, duration: 0.05 } },
  });

  return (
    <svg
      viewBox="0 0 84 84"
      fill="none"
      stroke="var(--color-accent)"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-18 overflow-visible"
    >
      <motion.path d={CIRCLE} strokeWidth={2.6} {...draw(cue.circle, 0.7)} />
      <motion.path d={CHECK} strokeWidth={3.2} {...draw(cue.check, 0.45)} />
    </svg>
  );
}

type MessageSentProps = {
  title: string;
  body: string;
  /** Sin lanzamiento (sin JavaScript, o con movimiento reducido) la confirmación aparece quieta. */
  launch: Launch | null;
};

const titleClass = "mt-5 font-display text-[clamp(26px,3vw,34px)] leading-[1.1] font-bold tracking-[-0.03em]";

/**
 * La confirmación del envío. Ocupa el alto que tenía el formulario, así la página no salta: el avión despega
 * del botón, y cuando sale del panel aparecen el tilde, el título letra por letra y el texto.
 */
export function MessageSent({ title, body, launch }: MessageSentProps) {
  const animated = launch !== null;

  return (
    // Es la versión visual: el lector de pantalla recibe el mismo texto por la región viva del formulario.
    <div
      aria-hidden="true"
      className="relative flex flex-col justify-center"
      style={launch ? { minHeight: launch.height } : undefined}
    >
      {launch && <Flight launch={launch} />}
      <CircledCheck animated={animated} />
      {animated ? (
        <SplitText as="h3" segments={[{ text: title }]} delay={cue.title} step={0.03} className={titleClass} />
      ) : (
        <p className={titleClass}>{title}</p>
      )}
      <ChalkUnderline variant={2} delay={animated ? cue.underline : undefined} className="mt-1.5" />
      <motion.p
        className="mt-4 max-w-[36ch] text-dust"
        initial={animated ? { opacity: 0, y: 8, filter: "blur(6px)" } : false}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ delay: cue.body, duration: 0.7, ease: chalkEase }}
      >
        {body}
      </motion.p>
    </div>
  );
}
