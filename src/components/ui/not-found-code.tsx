import { ChalkUnderline } from "@/components/motion/chalk-underline";
import { introStyle } from "@/components/motion/intro";

/**
 * El "404" grande de las páginas de error: cada cifra se escribe en tiza y debajo se traza un subrayado.
 * Las cifras animadas son decorativas; el lector de pantalla lee el número una sola vez.
 */
export function NotFoundCode() {
  return (
    <div>
      <p className="font-display text-[clamp(72px,16vw,160px)] leading-none font-bold tracking-tighter text-accent">
        <span className="sr-only">404</span>
        <span aria-hidden="true">
          {Array.from("404", (digit, index) => (
            <span key={index} className="inline-block animate-chalk-in" style={introStyle(0.1 + index * 0.14, "0.25em")}>
              {digit}
            </span>
          ))}
        </span>
      </p>
      <ChalkUnderline variant={1} delay={0.55} className="mx-auto mt-2" />
    </div>
  );
}
