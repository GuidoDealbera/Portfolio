"use client";

import { useEffect, useRef } from "react";

type Mote = { x: number; y: number; r: number; vx: number; vy: number; a: number; phase: number };

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

function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

/**
 * Fondo de pizarrón: polvo de tiza a la deriva y una curva de Lissajous que se
 * dibuja sola, se borra y vuelve con otros parámetros. El trazo lleva jitter por
 * segmento para que parezca tiza y no un vector limpio.
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
    });

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
        m.y += m.vy;
        m.x += m.vx + Math.sin(m.phase) * 0.18;
        if (m.y < -12) dust[i] = mote(false);
        ctx.beginPath();
        ctx.fillStyle = chalk(m.a);
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
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

    resize();
    tick();
    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
