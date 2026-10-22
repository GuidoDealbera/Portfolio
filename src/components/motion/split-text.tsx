import { Fragment, type CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Segment = { text: string; className?: string };

type SplitTextProps = {
  segments: readonly Segment[];
  /** Sólo encabezados: `aria-label` no es válido en un `<p>`. */
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
  /** Segundos antes de la primera letra. */
  delay?: number;
  /** Segundos entre letra y letra. */
  step?: number;
};

type Word = { key: string; className?: string; chars: { char: string; index: number }[] };

function toWords(segments: readonly Segment[]): Word[] {
  let index = 0;
  return segments.flatMap((segment, s) =>
    segment.text
      .split(/\s+/)
      .filter(Boolean)
      .map((word, w) => ({
        key: `${s}-${w}`,
        className: segment.className,
        // Array.from respeta los acentos y cualquier carácter fuera del BMP.
        chars: Array.from(word, (char) => ({ char, index: index++ })),
      })),
  );
}

/**
 * Entrada letra por letra: cada carácter llega desenfocado y con una rotación mínima. Las palabras no se
 * cortan al hacer wrap.
 *
 * Es CSS puro y se renderiza en el servidor (como <Intro>): arranca con la hoja de estilos, sin esperar a
 * que JavaScript hidrate, que es lo que retrasaba el LCP casi 2 s en celular.
 *
 * Accesibilidad y texto real: las letras son `aria-hidden` y el encabezado se nombra con `aria-label`, así
 * el lector de pantalla lo dice una sola vez. Entre palabras va un espacio de verdad (no un margen): si no,
 * copiar el título da "Construyoproductosweb" y Ctrl+F no encuentra "productos web".
 */
export function SplitText({
  segments,
  as: Tag = "h1",
  id,
  className,
  delay = 0.18,
  step = 0.026,
}: SplitTextProps) {
  const words = toWords(segments);
  const fullText = segments.map((s) => s.text).join(" ");

  return (
    <Tag id={id} className={className} aria-label={fullText}>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => (
          <Fragment key={word.key}>
            {wordIndex > 0 && " "}
            <span className={cn("inline-block whitespace-nowrap", word.className)}>
              {word.chars.map(({ char, index }) => (
                <span
                  key={index}
                  className="inline-block animate-chalk-in"
                  style={{ animationDelay: `${(delay + index * step).toFixed(3)}s`, "--tilt": "2deg" } as CSSProperties}
                >
                  {char}
                </span>
              ))}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
