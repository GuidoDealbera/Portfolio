import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadBrandColors, loadBrandFonts } from "@/features/seo/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const [colors, fonts] = await Promise.all([loadBrandColors(), loadBrandFonts()]);

/** Ícono para la pantalla de inicio de iOS. Sin bordes redondeados: iOS los aplica solo. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.board,
          color: colors.accent,
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: 100,
          letterSpacing: -5,
        }}
      >
        {site.initials.first}
        {site.initials.second}
      </div>
    ),
    { ...size, fonts },
  );
}
