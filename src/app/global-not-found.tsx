import type { Metadata } from "next";
import { Intro } from "@/components/motion/intro";
import { ButtonLink } from "@/components/ui/button";
import { NotFoundCode } from "@/components/ui/not-found-code";
import { en } from "@/dictionaries/en";
import { es } from "@/dictionaries/es";
import { nunito, poppins } from "./fonts";
import "./globals.css";

// El `noindex` lo agrega Next solo en toda respuesta 404.
export const metadata: Metadata = { title: "404" };

/**
 * 404 de todo lo que no coincide con ninguna ruta. No pasa por el layout (que vive dentro de
 * [lang]) ni conoce el idioma de la URL, así que habla en los dos. Los textos salen de los diccionarios.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${poppins.variable} ${nunito.variable}`}>
      <body>
        <main className="grid min-h-screen place-items-center px-6 text-center">
          <div>
            <NotFoundCode />
            <Intro delay={0.5} rise="16px">
              <h1 lang="es" className="mt-4 font-display text-[clamp(24px,3.4vw,36px)] font-semibold tracking-tight">
                {es.notFound.title}
              </h1>
            </Intro>
            <Intro delay={0.6} rise="16px">
              <p lang="en" className="mt-2 text-dust">
                {en.notFound.title}
              </p>
            </Intro>
            <Intro delay={0.7} rise="16px" className="mt-8 flex justify-center">
              {/* "/" lo resuelve el proxy según el idioma de quien visita. */}
              <ButtonLink href="/" icon="house">
                {es.notFound.back} · {en.notFound.back}
              </ButtonLink>
            </Intro>
          </div>
        </main>
      </body>
    </html>
  );
}
