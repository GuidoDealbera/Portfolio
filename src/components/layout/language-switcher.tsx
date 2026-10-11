"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeCookie, locales, type Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";

type LanguageSwitcherProps = {
  locale: Locale;
  label: string;
  switchTo: Record<Locale, string>;
  className?: string;
};

/** Guarda la elección para que la próxima visita a `/` caiga directo en este idioma. */
function remember(locale: Locale) {
  document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; samesite=lax`;
}

export function LanguageSwitcher({ locale, label, switchTo, className }: LanguageSwitcherProps) {
  const pathname = usePathname();
  // /es/proyectos/x -> "/proyectos/x": se cambia sólo el primer segmento y se conserva la página.
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div role="group" aria-label={label} className={cn("flex items-center gap-1 text-[13px] font-bold", className)}>
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span aria-hidden="true" className="text-line-strong">
              /
            </span>
          )}
          {code === locale ? (
            <span aria-current="true" className="rounded px-1 text-accent">
              {code.toUpperCase()}
            </span>
          ) : (
            <Link
              href={`/${code}${rest ? `/${rest}` : ""}`}
              hrefLang={code}
              lang={code}
              aria-label={switchTo[code]}
              onClick={() => remember(code)}
              className="rounded px-1 text-dust transition-colors hover:text-chalk"
            >
              {code.toUpperCase()}
            </Link>
          )}
        </span>
      ))}
    </div>
  );
}
