import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
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
            <p className="font-display text-[clamp(72px,16vw,160px)] leading-none font-bold tracking-tighter text-accent">
              404
            </p>
            <h1 lang="es" className="mt-4 font-display text-[clamp(24px,3.4vw,36px)] font-semibold tracking-tight">
              {es.notFound.title}
            </h1>
            <p lang="en" className="mt-2 text-dust">
              {en.notFound.title}
            </p>
            <div className="mt-8 flex justify-center">
              {/* "/" lo resuelve el proxy según el idioma de quien visita. */}
              <ButtonLink href="/" arrow>
                {es.notFound.back} · {en.notFound.back}
              </ButtonLink>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
