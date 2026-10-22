import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, iconHover, type IconName } from "./icons";

// active:scale: al apretar, el botón se hunde un poco. Los colores tardan 300 ms; el hundimiento, 150.
const base =
  "group relative isolate inline-flex cursor-pointer items-center justify-center gap-2.5 overflow-hidden rounded-[10px] font-bold leading-none transition-[color,background-color,border-color,opacity,scale] duration-300 active:scale-[0.97] active:duration-150";

// Destello de tiza que cruza el botón principal al pasar el mouse, como el de las portadas de los proyectos.
const shine =
  "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:-translate-x-full before:bg-[linear-gradient(110deg,transparent_30%,color-mix(in_srgb,var(--color-chalk)_45%,transparent)_50%,transparent_70%)] before:transition-transform before:duration-700 before:ease-chalk hover:before:translate-x-full";

export const buttonVariants = {
  primary: cn(
    "bg-accent px-6.5 py-4 text-on-accent hover:bg-[color-mix(in_srgb,var(--color-accent)_88%,var(--color-chalk))]",
    shine,
  ),
  secondary: "border border-line-strong px-6.5 py-4 text-chalk hover:border-dust hover:bg-surface",
  ghost: "px-1.5 py-4 text-dust hover:text-accent",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

type IconSlots = {
  /** Ícono antes del texto. */
  icon?: IconName;
  /** Ícono después del texto: flechas que indican hacia dónde lleva. */
  trailingIcon?: IconName;
};

/** El texto con sus íconos. Cada ícono se mueve a su manera al pasar el mouse por el botón. */
function Content({ icon, trailingIcon, children }: IconSlots & { children: ReactNode }) {
  const iconClass = (name: IconName) => cn("transition-transform duration-300 ease-chalk", iconHover[name]);
  return (
    <>
      {icon && <Icon name={icon} className={iconClass(icon)} />}
      {children}
      {trailingIcon && <Icon name={trailingIcon} className={iconClass(trailingIcon)} />}
    </>
  );
}

type ButtonProps = ComponentProps<"button"> & IconSlots & { variant?: ButtonVariant };

/** El mismo botón, para acciones reales (enviar un formulario) en lugar de navegar. */
export function Button({ variant = "primary", icon, trailingIcon, className, children, type = "button", ...props }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        base,
        buttonVariants[variant],
        "disabled:cursor-not-allowed disabled:opacity-55 disabled:active:scale-100 disabled:before:hidden",
        className,
      )}
      {...props}
    >
      <Content icon={icon} trailingIcon={trailingIcon}>
        {children}
      </Content>
    </button>
  );
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href"> &
  IconSlots & {
    href: string;
    variant?: ButtonVariant;
  };

/** Un link con aspecto de botón. Las rutas internas usan `next/link`; hash, mailto y externos, un `<a>` común. */
export function ButtonLink({
  href,
  variant = "primary",
  icon,
  trailingIcon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(base, buttonVariants[variant], className);
  const content = (
    <Content icon={icon} trailingIcon={trailingIcon}>
      {children}
    </Content>
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
