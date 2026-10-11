"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, locales, switchLabels, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  className?: string;
};

/** Guarda la elección para que la próxima visita a `/` caiga directo en este idioma. */
function remember(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

// 40 px de alto: el texto mide 21, el resto es área tocable.
const item = "grid min-h-10 min-w-8 place-items-center rounded px-1.5";

export function LanguageSwitcher({ locale, label, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  // /es/proyectos/x -> "/proyectos/x": se cambia sólo el primer segmento y se conserva la página.
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div role="group" aria-label={label} className={cn("flex items-center text-[13px] font-bold", className)}>
      {locales.map((code, index) => (
        <span key={code} className="flex items-center">
          {index > 0 && (
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
          )}
          {code === locale ? (
            <span aria-current="true" className={cn(item, "text-accent")}>
              {code.toUpperCase()}
            </span>
          ) : (
            <Link
              href={`/${code}${rest ? `/${rest}` : ""}`}
              hrefLang={code}
              lang={code}
              aria-label={switchLabels[code]}
              onClick={() => remember(code)}
              className={cn(item, "text-dust transition-colors hover:text-chalk")}
            >
              {code.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
