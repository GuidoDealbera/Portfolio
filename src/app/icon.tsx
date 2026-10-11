import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadBrandColors, loadBrandFonts } from "@/features/seo/brand";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const [colors, fonts] = await Promise.all([loadBrandColors(), loadBrandFonts()]);

/** Favicon: el monograma sobre el color del pizarrón. */
export default function Icon() {
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
          borderRadius: 7,
          fontFamily: "Poppins",
          fontWeight: 700,
          fontSize: 18,
          letterSpacing: -1,
        }}
      >
        {site.initials.first}
        {site.initials.second}
      </div>
    ),
    { ...size, fonts },
  );
}
