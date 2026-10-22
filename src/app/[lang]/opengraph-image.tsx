import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { loadBrandColors, loadBrandFonts } from "@/features/seo/brand";
import { OgCard } from "@/features/seo/og-card";
import { hasLocale, locales } from "@/i18n/config";
import { loadDictionary } from "@/i18n/dictionaries";

export const alt = "Guido Dealbera — Fullstack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Se cargan una sola vez, al evaluar el módulo (el patrón de la documentación de Next).
const [colors, fonts] = await Promise.all([loadBrandColors(), loadBrandFonts()]);

// Una imagen por idioma, generada en el build en vez de en cada pedido.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { hero } = await loadDictionary(lang);

  return new ImageResponse(
    (
      <OgCard
        colors={colors}
        eyebrow={`${site.name} — ${hero.role}`}
        title={[{ text: hero.headline.lead }, { text: hero.headline.highlight, accent: true }]}
        tags={site.stack.core}
        footer={new URL(site.url).host}
      />
    ),
    { ...size, fonts },
  );
}
