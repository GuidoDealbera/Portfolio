import { withAlpha, type BrandColors } from "./brand";

export const ogSize = { width: 1200, height: 630 } as const;

type OgCardProps = {
  colors: BrandColors;
  eyebrow: string;
  /** Tramos del título; los marcados con `accent` salen en el color de acento. */
  title: readonly { text: string; accent?: boolean }[];
  subtitle?: string;
  tags?: readonly string[];
  footer: string;
};

/**
 * La tarjeta que se ve al compartir un link. El renderizador de imágenes
 * (satori) sólo entiende un subconjunto de CSS: todo con más de un hijo
 * necesita `display: flex` y los estilos van en línea.
 */
export function OgCard({ colors: c, eyebrow, title, subtitle, tags = [], footer }: OgCardProps) {
  const words = title.flatMap((part) =>
    part.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({ word, accent: part.accent === true })),
  );
  const characters = title.reduce((sum, part) => sum + part.text.length, 0);
  const titleSize = characters > 70 ? 66 : characters > 46 ? 76 : 88;
  const grid = withAlpha(c.chalk, 0.055);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "68px 80px",
        background: c.board,
        color: c.chalk,
        fontFamily: "Poppins",
        backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
          color: c.accent,
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: 3,
          textTransform: "uppercase",
        }}
      >
        <div style={{ width: 44, height: 2, background: withAlpha(c.accent, 0.6) }} />
        {eyebrow}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 1040,
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.06,
            letterSpacing: -2.5,
          }}
        >
          {words.map(({ word, accent }, index) => (
            <div key={`${word}-${index}`} style={{ color: accent ? c.accent : c.chalk, marginRight: 22 }}>
              {word}
            </div>
          ))}
        </div>

        <svg width="300" height="14" viewBox="0 0 300 12" style={{ marginTop: 14 }}>
          <path
            d="M2 8 C 48 2, 96 11, 148 6 S 252 1, 298 7"
            fill="none"
            stroke={c.accent}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {subtitle && (
          <div style={{ display: "flex", maxWidth: 940, marginTop: 26, fontSize: 30, fontWeight: 500, lineHeight: 1.4, color: c.dust }}>
            {subtitle}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 26,
          borderTop: `1px solid ${c.line}`,
          fontSize: 26,
          fontWeight: 500,
          color: c.dust,
        }}
      >
        <div style={{ display: "flex" }}>{tags.join("  ·  ")}</div>
        <div style={{ display: "flex", fontWeight: 700, color: c.chalk }}>{footer}</div>
      </div>
    </div>
  );
}
