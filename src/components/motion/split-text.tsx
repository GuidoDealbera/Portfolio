"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { chalkEase } from "./ease";

type Segment = { text: string; className?: string };

type SplitTextProps = {
  segments: readonly Segment[];
  as?: "h1" | "h2" | "p";
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
 * Entrada letra por letra: cada carácter llega desenfocado y con una rotación
 * mínima. Las palabras no se cortan al hacer wrap. El lector de pantalla lee
 * el texto entero una sola vez, no letra por letra.
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
    <Tag id={id} className={className}>
      <span className="sr-only">{fullText}</span>
      <span aria-hidden="true">
        {words.map((word) => (
          <span key={word.key} className={cn("mr-[0.26em] inline-block whitespace-nowrap", word.className)}>
            {word.chars.map(({ char, index }) => (
              <motion.span
                key={index}
                data-reveal
                className="inline-block"
                initial={{ opacity: 0, filter: "blur(12px)", y: "0.42em", rotate: 2 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, rotate: 0 }}
                transition={{ duration: 0.82, ease: chalkEase, delay: delay + index * step }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
