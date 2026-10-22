import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Chalkboard } from "@/components/motion/chalkboard";
import { GraphPaper } from "@/components/motion/graph-paper";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { site } from "@/content/site";
import { hasLocale, localeTags, locales, otherLocale } from "@/i18n/config";
import { getDictionary, getLocale, loadDictionary } from "@/i18n/dictionaries";
import { nunito, poppins } from "../fonts";
import "../globals.css";

// Con Cache Components, cada parámetro raíz necesita al menos un valor conocido en el build.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const { meta } = await loadDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: { default: meta.title, template: `%s · ${site.name}` },
    description: meta.description,
    authors: [{ name: site.fullName, url: site.url }],
    alternates: {
      canonical: `/${lang}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      locale: localeTags[lang],
      alternateLocale: localeTags[otherLocale(lang)],
      url: `/${lang}`,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
  };
}

export const viewport: Viewport = {
  // Único color que no puede leer un token CSS: es una meta tag. Igual a --color-board en globals.css.
  themeColor: "#23272c",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: LayoutProps<"/[lang]">) {
  const [locale, dict] = await Promise.all([getLocale(), getDictionary()]);

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={`${poppins.variable} ${nunito.variable}`}>
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-70 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2.5 focus:font-bold focus:text-on-accent"
        >
          {dict.a11y.skipToContent}
        </a>
        <MotionProvider>
          <GraphPaper />
          <Chalkboard />
          <ScrollProgress />
          <div className="relative z-10">
            <Header />
            {children}
            <Footer />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
