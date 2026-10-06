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

    let width = 0;
    let height = 0;
    let dust: Mote[] = [];
    let curve: Curve;
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

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min((width * height) / 26000, 78));
      dust = Array.from({ length: count }, () => mote(true));
      curve = newCurve();
    };

    const point = (step: number) => {
      const t = (step / STEPS) * Math.PI * 2;
      return [Math.sin(curve.a * t + curve.seed) * curve.sx, Math.sin(curve.b * t) * curve.sy];
    };

    const drawCurve = () => {
      const steps = Math.floor(curve.drawn);
      if (steps < 2) return;
      const fade = curve.life > FADE_START ? Math.max(0, 1 - (curve.life - FADE_START) / (LIFESPAN - FADE_START)) : 1;

      ctx.save();
      ctx.translate(curve.ox, curve.oy);
      ctx.rotate(curve.rot);
      ctx.lineCap = "round";
      for (let i = 1; i < steps; i++) {
        const [x0, y0] = point(i);
        const [x1, y1] = point(i + 1);
        const head = Math.max(0, 1 - (steps - i) / 90); // la punta del trazo brilla más
        ctx.strokeStyle = chalk((0.05 + head * 0.16) * fade);
        ctx.lineWidth = 1 + Math.random() * 1.3;
        ctx.beginPath();
        ctx.moveTo(x0 + Math.random() - 0.5, y0 + Math.random() - 0.5);
        ctx.lineTo(x1 + Math.random() - 0.5, y1 + Math.random() - 0.5);
        ctx.stroke();
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
      if (curve.life > LIFESPAN) curve = newCurve();
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
