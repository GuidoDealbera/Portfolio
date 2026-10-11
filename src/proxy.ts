import { NextResponse, type NextRequest } from "next/server";
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

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasLocalePrefix = locales.some((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  if (hasLocalePrefix) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Se saltea _next, api y cualquier ruta con extensión (cv .pdf, imágenes, favicon, sitemap.xml…).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
