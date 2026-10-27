"use client";

import { animate, motion, useMotionTemplate, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";

const LIGHT_SPRING = { stiffness: 260, damping: 32, mass: 0.6 };

/**
 * Cuadrícula de papel milimetrado que se desplaza más lento que el contenido, y una luz que sigue al mouse:
 * un brillo dorado suave y, debajo del cursor, la cuadrícula encendida.
 *
 * La luz es sólo para mouse (en táctil no hay cursor que seguir) y no corre con reduced motion: arranca
 * apagada y sólo se enciende cuando se mueve un mouse de verdad.
 */
export function GraphPaper() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (value) => value * -0.12);

  // Posición del cursor en la ventana. El resorte le da a la luz un poco de inercia.
  const pointerX = useMotionValue(-1000);
  const pointerY = useMotionValue(-1000);
  const x = useSpring(pointerX, LIGHT_SPRING);
  const cy = useSpring(pointerY, LIGHT_SPRING);
  const light = useMotionValue(0);

  // La luz respira: crece, se achica y late en intensidad aunque el mouse esté quieto.
  const breath = useMotionValue(0);
  const glowRadius = useTransform(breath, [0, 1], [230, 310]);
  const glowStrength = useTransform(breath, [0, 1], [9, 15]);
  const spotRadius = useTransform(breath, [0, 1], [120, 170]);

  const glow = useMotionTemplate`radial-gradient(${glowRadius}px circle at ${x}px ${cy}px, color-mix(in srgb, var(--color-accent) ${glowStrength}%, transparent), transparent 70%)`;
  const spot = useMotionTemplate`radial-gradient(${spotRadius}px circle at ${x}px ${cy}px, #000, transparent)`;
  // La capa encendida es fija y no se mueve: corre su cuadrícula lo mismo que se corre la de abajo
  // (-10vh de inset más el parallax), así las líneas coinciden.
  const gridOffset = useMotionTemplate`calc(-10vh + ${y}px)`;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // La respiración sólo corre mientras la luz está prendida: en táctil nunca arranca.
    let breathing: ReturnType<typeof animate> | undefined;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      // Al entrar, la luz aparece donde está el cursor, sin viajar desde afuera de la pantalla.
      if (!breathing) {
        x.jump(event.clientX);
        cy.jump(event.clientY);
        animate(light, 1, { duration: 0.6 });
        breathing = animate(breath, 1, { duration: 2.8, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" });
      }
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    const onLeave = () => {
      breathing?.stop();
      breathing = undefined;
      animate(light, 0, { duration: 0.6 });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      breathing?.stop();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, cy, pointerX, pointerY, light, breath]);

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="graph-paper pointer-events-none fixed inset-x-0 -inset-y-[10vh] z-0"
        style={{ y }}
      />
      <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" style={{ opacity: light }}>
        <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />
        <motion.div
          className="graph-paper-lit absolute inset-0"
          style={{ backgroundPositionY: gridOffset, maskImage: spot }}
        />
      </motion.div>
    </>
  );
}
