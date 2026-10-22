import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

/** Ancho máximo y gutter lateral de toda la página, definidos en un solo lugar. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("mx-auto max-w-[1180px] px-[clamp(20px,5vw,64px)]", className)} {...props} />;
}
