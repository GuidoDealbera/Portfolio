import { NextResponse, type NextRequest } from "next/server";
import { getProject } from "@/content/projects";
import { defaultLocale, hasLocale, localeCookie, locales, type Locale } from "@/i18n/config";

/** Primer idioma soportado de `Accept-Language`, respetando los pesos q=. */
function fromAcceptLanguage(header: string | null): Locale | undefined {
  if (!header) return undefined;

  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, ...params] = part.trim().split(";");
      const weight = params.find((param) => param.trim().startsWith("q="));
      return { primary: tag.trim().toLowerCase().split("-")[0], q: weight ? Number(weight.split("=")[1]) : 1 };
    })
    .filter(({ q }) => Number.isFinite(q) && q > 0)
    .sort((a, b) => b.q - a.q);

  return ranked.map(({ primary }) => primary).find(hasLocale);
}

function pickLocale(request: NextRequest): Locale {
  const saved = request.cookies.get(localeCookie)?.value;
  if (hasLocale(saved)) return saved;
  return fromAcceptLanguage(request.headers.get("accept-language")) ?? defaultLocale;
}

/**
 * Idioma de la URL si apunta a /<lang>/projects/<slug> con un slug que no existe.
 * El estado HTTP queda fijado cuando empieza el streaming, así que un `notFound()` dentro de la
 * página respondería 200 (un "soft 404"). Decidirlo acá, antes del render, da un 404 de verdad.
 * Acopla con la carpeta app/[lang]/projects/[slug].
 */
function unknownProjectLocale(pathname: string): Locale | undefined {
  const [lang, section, slug, ...rest] = pathname.split("/").filter(Boolean);
  const isProjectUrl = hasLocale(lang) && section === "projects" && slug !== undefined && rest.length === 0;
  return isProjectUrl && !getProject(slug) ? lang : undefined;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const missingProjectLocale = unknownProjectLocale(pathname);
  if (missingProjectLocale) {
    // Se reescribe a una ruta que no existe: conserva la URL pero responde 404 con la página localizada.
    const url = request.nextUrl.clone();
    url.pathname = `/${missingProjectLocale}/404`;
    return NextResponse.rewrite(url);
  }

  const hasLocalePrefix = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocalePrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Se saltea _next, api, los íconos generados (/icon y /apple-icon, que no tienen extensión),
  // _vercel (Analytics y Speed Insights envían a /_vercel/... sin extensión: redirigido a /es/_vercel
  // se perdería) y cualquier ruta con extensión (cv .pdf, imágenes, sitemap.xml, robots.txt…).
  matcher: ["/((?!_next|_vercel|api|icon|apple-icon|.*\\..*).*)"],
};
