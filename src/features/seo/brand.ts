import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Lo que necesitan las imágenes generadas (Open Graph, íconos). Un archivo de
 * imagen no puede leer variables CSS, así que los colores se extraen de
 * globals.css: la paleta sigue definiéndose en un solo lugar.
 */

const tokenNames = ["board", "surface", "line", "chalk", "dust", "accent", "on-accent"] as const;
export type BrandColors = Record<(typeof tokenNames)[number], string>;

export async function loadBrandColors(): Promise<BrandColors> {
  const css = await readFile(join(process.cwd(), "src/app/globals.css"), "utf8");

  const entries = tokenNames.map((name) => {
    const match = css.match(new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})\\s*;`));
    if (!match) throw new Error(`No encontré el token --color-${name} en src/app/globals.css`);
    return [name, match[1]] as const;
  });

  return Object.fromEntries(entries) as BrandColors;
}

/** Poppins en los dos pesos que usan las imágenes. Los archivos viven en src/assets/fonts (licencia OFL incluida). */
export async function loadBrandFonts() {
  const fontsDir = join(process.cwd(), "src/assets/fonts");
  const [medium, bold] = await Promise.all([
    readFile(join(fontsDir, "poppins-latin-500-normal.woff")),
    readFile(join(fontsDir, "poppins-latin-700-normal.woff")),
  ]);

  return [
    { name: "Poppins", data: medium, weight: 500 as const, style: "normal" as const },
    { name: "Poppins", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

/** `#rrggbb` -> `rgba(...)`: el renderizador de imágenes no siempre entiende hex con alfa. */
export function withAlpha(hex: string, alpha: number) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
