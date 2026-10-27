"use client";

import { useEffect, useRef } from "react";

/** `kx` y `ky` son el empujón del mouse: se suma a la deriva y se apaga solo. */
type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number; kx: number; ky: number };

/** Polvo que suelta el mouse: vive `ttl` cuadros, cae despacio y se desvanece. */
type Speck = { x: number; y: number; r: number; vx: number; vy: number; life: number; ttl: number };

type Curve = {
  drawn: number;
  life: number;
  seed: number;
  a: number;
  b: number;
  ox: number;
  oy: number;
  sx: number;
  sy: number;
  rot: number;
};

const STEPS = 620; // segmentos de una vuelta completa de la curva
const DRAW_SPEED = 3.2; // segmentos por frame
const FADE_START = 560; // frame en que la curva empieza a borrarse
const LIFESPAN = 790; // frame en que se reemplaza por otra
const HEAD = 90; // segmentos de la punta, que brillan y tiemblan en cada cuadro
const REPEL_RADIUS = 130; // px alrededor del mouse en los que el polvo se aparta
const REPEL_FORCE = 0.45; // empujón por cuadro en el centro; baja hasta 0 en el borde del radio
const REPEL_DAMPING = 0.93; // cuánto del empujón queda en el cuadro siguiente
const MAX_SPECKS = 140; // tope del polvo del mouse, para que un movimiento largo no lo acumule
const SPECK_EVERY = 9; // px de recorrido del mouse por cada partícula que suelta
const IDLE_SPECK_CHANCE = 0.22; // probabilidad por cuadro de que aparezca una partícula flotando en la luz

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/**
 * Fondo de pizarrón: polvo de tiza a la deriva y una curva de Lissajous que se
 * dibuja sola, se borra y vuelve con otros parámetros. El trazo lleva jitter por
 * segmento para que parezca tiza y no un vector limpio. Con mouse, el polvo cercano al cursor se aparta y el
 * cursor suelta su propio polvo, que cae y se desvanece; quieto, deja flotando algunas partículas en la luz.
 * Se pausa con la pestaña oculta y no corre con reduced motion.
 *
 * Costo: el rastro ya dibujado no cambia, así que se acumula una sola vez en un lienzo auxiliar y cada
 * cuadro sólo se vuelca y se redibuja la punta (90 segmentos en lugar de los ~620 de la curva entera).
 * El lienzo va a resolución 1×: son líneas y partículas tenues, la nitidez retina no se nota y cuesta 4× en pantallas 2×.
 */
export function Chalkboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const accent = getComputedStyle(document.documentElement).getPropertyValue("--color-accent");
    const [r, g, b] = hexToRgb(accent || "#f0c86a");
    const chalk = (alpha: number) => `rgba(${r},${g},${b},${alpha})`;

    // Rastro acumulado de la curva: lo que ya se dibujó no se vuelve a trazar.
    const trail = document.createElement("canvas");
    const trailCtx = trail.getContext("2d");
    if (!trailCtx) return;

    let width = 0;
    let height = 0;
    let dust: Mote[] = [];
    let curve: Curve;
    let trailDrawn = 0; // segmentos de la curva que ya están en el rastro
    let frame = 0;
    let running = !document.hidden;

    const mote = (anywhere: boolean): Mote => ({
      x: Math.random() * width,
      y: anywhere ? Math.random() * height : height + 12,
      r: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.14,
      vy: -(Math.random() * 0.22 + 0.06),
      a: Math.random() * 0.3 + 0.07,
      phase: Math.random() * Math.PI * 2,
      kx: 0,
      ky: 0,
    });

    // Posición del mouse. Lejos de la pantalla cuando no hay mouse, así nada reacciona en táctil.
    let pointerX = -9999;
    let pointerY = -9999;
    let specks: Speck[] = [];

    /** Una partícula cerca del cursor. `spread` es cuán lejos puede nacer y `speed`, con qué fuerza sale. */
    const addSpeck = (spread: number, speed: number) => {
      if (specks.length >= MAX_SPECKS) return;
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * spread;
      const velocity = (Math.random() * 0.8 + 0.2) * speed;
      specks.push({
        x: pointerX + Math.cos(angle) * distance,
        y: pointerY + Math.sin(angle) * distance,
        r: Math.random() * 1.1 + 0.35,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        life: 0,
        ttl: 45 + Math.random() * 70,
      });
    };

    const newCurve = (): Curve => {
      const sx = Math.min(width, height) * (0.17 + Math.random() * 0.12);
      return {
        drawn: 0,
        life: 0,
        seed: Math.random() * 1000,
        a: 2 + Math.floor(Math.random() * 3),
        b: 2 + Math.floor(Math.random() * 4),
        ox: width * (0.25 + Math.random() * 0.5),
        oy: height * (0.3 + Math.random() * 0.4),
        sx,
        sy: sx * (0.6 + Math.random() * 0.5),
        rot: Math.random() * Math.PI,
      };
    };

    /** Empieza una curva nueva y vacía el rastro de la anterior. */
    const startCurve = () => {
      curve = newCurve();
      trailDrawn = 0;
      trailCtx.clearRect(0, 0, width, height);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = trail.width = width;
      canvas.height = trail.height = height;
      const count = Math.round(Math.min((width * height) / 26000, 78));
      dust = Array.from({ length: count }, () => mote(true));
      startCurve();
    };

    const point = (step: number) => {
      const t = (step / STEPS) * Math.PI * 2;
      return [Math.sin(curve.a * t + curve.seed) * curve.sx, Math.sin(curve.b * t) * curve.sy];
    };

    /** Un tramo de la curva con jitter, para que parezca tiza y no un vector limpio. */
    const segment = (target: CanvasRenderingContext2D, i: number) => {
      const [x0, y0] = point(i);
      const [x1, y1] = point(i + 1);
      target.lineWidth = 1 + Math.random() * 1.3;
      target.beginPath();
      target.moveTo(x0 + Math.random() - 0.5, y0 + Math.random() - 0.5);
      target.lineTo(x1 + Math.random() - 0.5, y1 + Math.random() - 0.5);
      target.stroke();
    };

    const placeCurve = (target: CanvasRenderingContext2D) => {
      target.translate(curve.ox, curve.oy);
      target.rotate(curve.rot);
      target.lineCap = "round";
    };

    const drawCurve = () => {
      const steps = Math.floor(curve.drawn);
      if (steps < 2) return;
      const fade = curve.life > FADE_START ? Math.max(0, 1 - (curve.life - FADE_START) / (LIFESPAN - FADE_START)) : 1;

      // 1) Los segmentos nuevos se suman, una sola vez, al rastro acumulado.
      trailCtx.save();
      placeCurve(trailCtx);
      trailCtx.strokeStyle = chalk(0.05);
      for (let i = Math.max(1, trailDrawn); i < steps; i++) segment(trailCtx, i);
      trailCtx.restore();
      trailDrawn = steps;

      // 2) Se vuelca el rastro con el desvanecimiento, y encima se redibuja sólo la punta, que brilla más.
      ctx.globalAlpha = fade;
      ctx.drawImage(trail, 0, 0);
      ctx.globalAlpha = 1;

      ctx.save();
      placeCurve(ctx);
      for (let i = Math.max(1, steps - HEAD); i < steps; i++) {
        ctx.strokeStyle = chalk((1 - (steps - i) / HEAD) * 0.16 * fade);
        segment(ctx, i);
      }
      ctx.restore();
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      if (!running) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < dust.length; i++) {
        const m = dust[i];
        m.phase += 0.01;

        const dx = m.x - pointerX;
        const dy = m.y - pointerY;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_RADIUS * REPEL_RADIUS && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = (1 - d / REPEL_RADIUS) * REPEL_FORCE;
          m.kx += (dx / d) * force;
          m.ky += (dy / d) * force;
        }
        m.kx *= REPEL_DAMPING;
        m.ky *= REPEL_DAMPING;

        m.y += m.vy + m.ky;
        m.x += m.vx + Math.sin(m.phase) * 0.18 + m.kx;
        // Si el mouse la saca por un costado, vuelve a entrar por el otro.
        if (m.x < -12) m.x = width + 12;
        else if (m.x > width + 12) m.x = -12;
        if (m.y < -12) dust[i] = mote(false);
        ctx.beginPath();
        ctx.fillStyle = chalk(m.a);
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Con el mouse quieto también hay polvo: partículas lentas que flotan dentro de la luz.
      if (pointerX > -9999 && Math.random() < IDLE_SPECK_CHANCE) addSpeck(70, 0.25);
      specks = specks.filter((s) => s.life < s.ttl);
      for (const s of specks) {
        s.life++;
        s.vx *= 0.97;
        s.vy = s.vy * 0.97 + 0.012; // el polvo de tiza cae
        s.x += s.vx;
        s.y += s.vy;
        ctx.beginPath();
        ctx.fillStyle = chalk(0.55 * (1 - s.life / s.ttl));
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      curve.life++;
      if (curve.drawn < STEPS) curve.drawn += DRAW_SPEED;
      if (curve.life > LIFESPAN) startCurve();
      drawCurve();
    };

    const onVisibility = () => {
      running = !document.hidden;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      // Suelta polvo según cuánto se movió: más rápido, más polvo. Al entrar no hay recorrido previo.
      const moved = pointerX > -9999 ? Math.hypot(event.clientX - pointerX, event.clientY - pointerY) : 0;
      pointerX = event.clientX;
      pointerY = event.clientY;
      for (let i = 0; i < Math.min(3, Math.floor(moved / SPECK_EVERY)); i++) addSpeck(14, 0.6);
    };
    const onPointerLeave = () => {
      pointerX = pointerY = -9999;
    };

    resize();
    tick();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("mouseleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
