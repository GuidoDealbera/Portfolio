import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/cn";

type IntroProps = {
  children: ReactNode;
  /** Segundos de retraso, para escalonar. */
  delay?: number;
  /** Cuánto sube al entrar. */
  rise?: string;
  className?: string;
};

/**
 * Entrada para todo lo que está en la primera pantalla. Es CSS puro y se renderiza en el servidor: el
 * navegador la anima apenas carga la hoja de estilos, sin esperar a que JavaScript se descargue e hidrate
 * (eso retrasaba el LCP casi 2 s en celular). Sin JS también anima, y con reduced motion el CSS global la salta.
 *
 * Lo que queda más abajo usa <Reveal>, que espera a que aparezca en pantalla.
 */
export function Intro({ children, delay = 0, rise = "30px", className }: IntroProps) {
  return (
    <div className={cn("animate-chalk-in", className)} style={introStyle(delay, rise)}>
      {children}
    </div>
  );
}

/**
 * La misma entrada aplicada directo a un elemento, con la clase `animate-chalk-in`: para los hijos de una
 * lista, donde el <div> de <Intro> no puede ir, y para escalonarlos de a uno.
 */
export function introStyle(delay: number, rise = "12px") {
  return { animationDelay: `${delay}s`, "--rise": rise } as CSSProperties;
}
