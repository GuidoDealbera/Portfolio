import type { ReactNode, SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Todos los íconos del sitio, en línea y sin dependencias.
 *
 * - De interfaz: Lucide (lucide.dev, licencia ISC), trazo de 2 en una grilla de 24.
 * - De marca, los oficiales y en un solo color claro, como piden sus guías sobre fondo oscuro:
 *   - GitHub: `mark-github` de Primer Octicons, el sistema de diseño de GitHub (github.com/logos).
 *   - LinkedIn: el "In" de brand.linkedin.com, en el trazado de Simple Icons 10.4.0. LinkedIn sólo publica
 *     el logo en PNG; se comparó contra ese PNG oficial.
 *   - WhatsApp: el glifo del centro de marca de Meta (about.meta.com/brand), en el trazado de Simple Icons.
 * - El avión de papel es propio: es el mismo que despega al enviar el formulario.
 */

/** El avión de papel visto desde arriba, apuntando a +x y centrado en el origen: el pliegue central separa las alas. */
export const paperPlane = { outline: "M22 0 L-20 -14 L-11 0 L-20 14 Z", crease: "M-11 0 L22 0" } as const;

type Glyph = {
  body: ReactNode;
  viewBox?: string;
  /** Relleno en lugar de trazo: los logos de marca. */
  fill?: boolean;
  strokeWidth?: number;
};

const glyphs = {
  arrowRight: { body: <path d="M5 12h14m-7-7 7 7-7 7" /> },
  arrowLeft: { body: <path d="m12 19-7-7 7-7m7 7H5" /> },
  arrowDown: { body: <path d="M12 5v14m7-7-7 7-7-7" /> },
  arrowUp: { body: <path d="m5 12 7-7 7 7m-7 7V5" /> },
  arrowUpRight: { body: <path d="M7 7h10v10M7 17 17 7" /> },
  download: {
    body: (
      <>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        {/* La flecha va aparte para poder moverla sola. */}
        <path className="icon-part" d="M12 15V3m-5 7 5 5 5-5" />
      </>
    ),
  },
  mail: {
    body: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path className="icon-part" d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      </>
    ),
  },
  house: {
    body: (
      <>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </>
    ),
  },
  paperPlane: {
    viewBox: "-22 -22 44 44",
    strokeWidth: 3.6,
    body: (
      <>
        <path d={paperPlane.outline} />
        <path d={paperPlane.crease} strokeOpacity={0.7} />
      </>
    ),
  },
  github: {
    fill: true,
    body: (
      <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
    ),
  },
  linkedin: {
    fill: true,
    body: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  whatsapp: {
    fill: true,
    body: (
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    ),
  },
} satisfies Record<string, Glyph>;

export type IconName = keyof typeof glyphs;

type IconProps = { name: IconName } & Omit<SVGProps<SVGSVGElement>, "name">;

/** Decorativo siempre: el texto del botón o del link ya dice lo mismo. */
export function Icon({ name, className, ...props }: IconProps) {
  const glyph: Glyph = glyphs[name];
  const paint = glyph.fill
    ? { fill: "currentColor" }
    : {
        fill: "none",
        stroke: "currentColor",
        strokeWidth: glyph.strokeWidth ?? 2,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
      };

  return (
    <svg
      viewBox={glyph.viewBox ?? "0 0 24 24"}
      aria-hidden="true"
      focusable="false"
      className={cn("size-[1.1em] shrink-0", className)}
      {...paint}
      {...props}
    >
      {glyph.body}
    </svg>
  );
}

/**
 * Cómo se mueve cada ícono cuando el puntero pasa por el botón o link que lo contiene (que lleva `group`).
 * Cada uno hace lo que dice: la flecha avanza hacia donde lleva, la descarga baja, el avión se prepara.
 */
export const iconHover: Record<IconName, string> = {
  arrowRight: "group-hover:translate-x-1",
  arrowLeft: "group-hover:-translate-x-1",
  arrowDown: "group-hover:translate-y-0.5",
  arrowUp: "group-hover:-translate-y-1",
  arrowUpRight: "group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
  download: "[&_.icon-part]:transition-transform [&_.icon-part]:duration-300 group-hover:[&_.icon-part]:translate-y-0.5",
  mail: "[&_.icon-part]:transition-transform [&_.icon-part]:duration-300 group-hover:[&_.icon-part]:translate-y-px group-hover:-rotate-6",
  house: "group-hover:-translate-y-0.5",
  paperPlane: "group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:-rotate-12",
  github: "group-hover:-rotate-8 group-hover:scale-110",
  linkedin: "group-hover:-rotate-8 group-hover:scale-110",
  whatsapp: "group-hover:-rotate-8 group-hover:scale-110",
};
