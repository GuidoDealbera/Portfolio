"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/cn";
import { Container } from "@/components/ui/container";
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
    switchTo: Record<Locale, string>;
  };
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
    </svg>
  );
}

export function SiteHeader({ locale, initials, items, labels }: SiteHeaderProps) {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

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

  const linkClass =
    "group relative py-1 transition-colors duration-300 hover:text-chalk";
  const underline =
    "absolute inset-x-0 bottom-0 h-px origin-right scale-x-0 bg-accent transition-transform duration-500 ease-chalk group-hover:origin-left group-hover:scale-x-100";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[env(safe-area-inset-top,0px)] z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
        stuck || open ? "border-line bg-board/85 backdrop-blur-md" : "border-transparent",
      )}
    >
      <Container className="flex items-center justify-between gap-6 py-4">
        <Link href={`/${locale}`} className="font-display text-[21px] leading-none font-bold tracking-[-0.03em]">
          {initials[0]}
          <span className="text-accent">{initials[1]}</span>
        </Link>

        <div className="flex items-center gap-7">
          <nav aria-label={labels.mainNav} className="hidden md:block">
            <ul className="flex items-center gap-7 text-sm text-dust">
              {items.map((item) => (
                <li key={item.id}>
                  <Link href={`/${locale}#${item.id}`} className={linkClass}>
                    {item.label}
                    <span aria-hidden="true" className={underline} />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher locale={locale} label={labels.language} switchTo={labels.switchTo} />

          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="-mr-2 grid size-10 cursor-pointer place-items-center rounded-lg text-chalk md:hidden"
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
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Container>
              <ul className="flex flex-col py-3">
                {items.map((item) => (
                  <li key={item.id}>
                    <Link
                      href={`/${locale}#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="block border-b border-line py-4 font-display text-lg font-medium tracking-[-0.02em] last:border-b-0"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
