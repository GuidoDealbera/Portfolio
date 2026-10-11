import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

const base =
  "group inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-[10px] font-bold leading-none transition-colors duration-300";

export const buttonVariants = {
  primary:
    "bg-accent px-6.5 py-4 text-on-accent hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,var(--color-chalk))]",
  secondary: "border border-line-strong px-6.5 py-4 text-chalk hover:border-dust hover:bg-surface",
  ghost: "px-1.5 py-4 text-dust hover:text-accent",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  /** Agrega una flecha que se desplaza al hacer hover. */
  arrow?: boolean;
};

/** Un link con aspecto de botón. Las rutas internas usan `next/link`; hash, mailto y externos, un `<a>` común. */
export function ButtonLink({ href, variant = "primary", arrow = false, className, children, ...props }: ButtonLinkProps) {
  const classes = cn(base, buttonVariants[variant], className);
  const content = (
    <>
      {children}
      {arrow && (
        <span aria-hidden="true" className="transition-transform duration-300 ease-chalk group-hover:translate-x-1">
          →
        </span>
      )}
    </>
  );

  if (href.startsWith("/") && !href.startsWith("//") && !props.download) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
