import type { Metadata, Viewport } from "next";
import { Nunito_Sans, Poppins } from "next/font/google";
import { Chalkboard } from "@/components/motion/chalkboard";
import { GraphPaper } from "@/components/motion/graph-paper";
import { MotionProvider } from "@/components/motion/motion-provider";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { site } from "@/content/site";
import "./globals.css";

// Poppins no es variable en Google Fonts: se piden sólo los pesos que usan los títulos.
const poppins = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

// Nunito Sans sí es variable: un solo archivo cubre todos los pesos del cuerpo.
const nunito = Nunito_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-nunito",
});

const title = `${site.name} — ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.fullName, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#23272c",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" data-scroll-behavior="smooth" className={`${poppins.variable} ${nunito.variable}`}>
      <head>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}"}</style>
        </noscript>
      </head>
      <body>
        <MotionProvider>
          <GraphPaper />
          <Chalkboard />
          <ScrollProgress />
          <div className="relative z-10">{children}</div>
        </MotionProvider>
      </body>
    </html>
  );
}
