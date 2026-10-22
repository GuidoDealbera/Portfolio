"use client";

import { AnimatePresence, motion, stagger, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { chalkEase } from "@/components/motion/ease";
import { introStyle } from "@/components/motion/intro";
import { Container } from "@/components/ui/container";
import { Icon, iconHover } from "@/components/ui/icons";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { LanguageSwitcher } from "./language-switcher";

type SiteHeaderProps = {
  locale: Locale;
  initials: readonly [string, string];
  items: readonly { id: string; label: string }[];
  labels: {
    mainNav: string;
    openMenu: string;
    closeMenu: string;
    language: string;
  };
};

/** Dos trazos que se cruzan en una X al abrir el menú, y se separan al cerrarlo. */
function MenuIcon({ open }: { open: boolean }) {
  const bar =
    "absolute left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-current transition-[translate,rotate] duration-400 ease-chalk";
  return (
    <span aria-hidden="true" className="relative block size-6">
      <span className={cn(bar, "top-1.75", open && "translate-y-1 rotate-45")} />
      <span className={cn(bar, "bottom-1.75", open && "-translate-y-1 -rotate-45")} />
    </span>
  );
}

/**
 * La sección que se está leyendo: la que cruza la franja del medio de la pantalla. Sólo en la home; en un
 * caso de estudio esas secciones no existen y no se marca ninguna.
 */
function useActiveSection(items: SiteHeaderProps["items"], pathname: string) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const targets = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          // Al volver al inicio, la sección que sale de la franja deja de estar marcada.
          setActive((current) => (entry.isIntersecting ? id : current === id ? null : current));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
    // `pathname`: al volver a la home desde un caso, las secciones son elementos nuevos y hay que observarlos.
  }, [items, pathname]);

  return active;
}

export function SiteHeader({ locale, initials, items, labels }: SiteHeaderProps) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const onHome = pathname === `/${locale}`;
  const active = useActiveSection(items, pathname);

  useMotionValueEvent(scrollY, "change", (y) => setStuck(y > 12));

  // Escape cierra el menú. El listener sólo existe mientras está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = "group relative py-1 transition-colors duration-300 hover:text-chalk";
  const underline =
    "absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-chalk group-hover:origin-left group-hover:scale-x-100";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        stuck || open ? "border-line bg-board/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      {/* Baja desde arriba al cargar. La animación va en el contenido y no en el <header>: un filtro en el
          mismo elemento que el backdrop-filter apagaría el desenfoque del fondo. */}
      <Container className="flex animate-chalk-in items-center justify-between gap-6 py-4" style={introStyle(0, "-14px")}>
        <Link
          href={`/${locale}`}
          className="group -mx-2 inline-flex min-h-10 items-center px-2 font-display text-[21px] leading-none font-bold tracking-[-0.03em]"
        >
          <span className="inline-block transition-[translate,rotate] duration-500 ease-chalk group-hover:-translate-y-0.5 group-hover:-rotate-6">
            {initials[0]}
          </span>
          <span className="inline-block text-accent transition-[translate,rotate] duration-500 ease-chalk group-hover:translate-y-0.5 group-hover:rotate-6">
            {initials[1]}
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <nav aria-label={labels.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm text-dust">
              {items.map((item) => {
                const current = onHome && active === item.id;
                return (
                  <li key={item.id}>
                    <Link
                      href={`/${locale}#${item.id}`}
                      aria-current={current ? "true" : undefined}
                      className={cn(linkClass, current && "text-chalk")}
                    >
                      {item.label}
                      <span aria-hidden="true" className={underline} />
                      {/* Una sola línea que se desliza de un link al siguiente a medida que se baja. */}
                      {current && (
                        <motion.span
                          aria-hidden="true"
                          layoutId="nav-current"
                          className="absolute inset-x-0 bottom-0 h-px bg-accent"
                          transition={{ duration: 0.5, ease: chalkEase }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <LanguageSwitcher locale={locale} label={labels.language} />

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2 grid size-10 cursor-pointer place-items-center rounded-lg text-chalk transition-[background-color,scale] duration-300 hover:bg-raised active:scale-90 md:hidden"
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={labels.mainNav}
            className="overflow-hidden border-t border-line md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: chalkEase }}
          >
            <Container>
              {/* Los links entran de a uno, desde la izquierda, mientras el menú se despliega. */}
              <motion.ul
                className="flex flex-col py-3"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { delayChildren: stagger(0.06, { startDelay: 0.08 }) } } }}
              >
                {items.map((item) => (
                  <motion.li
                    key={item.id}
                    className="border-b border-line last:border-b-0"
                    variants={{ hidden: { opacity: 0, x: -14 }, visible: { opacity: 1, x: 0 } }}
                    transition={{ duration: 0.45, ease: chalkEase }}
                  >
                    <Link
                      href={`/${locale}#${item.id}`}
                      onClick={() => setOpen(false)}
                      aria-current={onHome && active === item.id ? "true" : undefined}
                      className="group flex items-center justify-between py-4 font-display text-lg font-medium tracking-[-0.02em] transition-colors duration-300 hover:text-accent aria-current:text-accent"
                    >
                      {item.label}
                      <Icon name="arrowRight" className={cn("text-dust transition-transform duration-300 ease-chalk", iconHover.arrowRight)} />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
