import { cacheLife } from "next/cache";
import { Reveal } from "@/components/motion/reveal";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { Container } from "@/components/ui/container";
import { Icon, iconHover, type IconName } from "@/components/ui/icons";
import { channelsFor, site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/cn";

// min-h-10: el texto mide 21 px de alto; el resto es área tocable.
const linkClass = "group inline-flex min-h-10 items-center gap-1.5 rounded transition-colors duration-300 hover:text-accent";
const iconClass = (name: IconName) => cn("transition-transform duration-300 ease-chalk", iconHover[name]);

export async function Footer() {
  // `new Date()` no puede correr en el prerender: se cachea y el año se renueva una vez por día.
  "use cache";
  cacheLife("days");

  const dict = await getDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-[13px] text-dust">
        <Reveal y={14} className="flex flex-col gap-1">
          <span className="text-chalk">{dict.footer.copyright(year, site.fullName)}</span>
          <span>{dict.footer.tagline}</span>
        </Reveal>

        <Stagger as="div" step={0.07} delay={0.1} className="flex items-center gap-4 font-bold">
          {channelsFor("footer").map((channel) => (
            <StaggerItem as="span" key={channel.id} className="inline-flex">
              <a href={channel.href} target="_blank" rel="noreferrer" className={linkClass}>
                <Icon name={channel.icon} className={iconClass(channel.icon)} />
                {channel.label}
              </a>
            </StaggerItem>
          ))}
          <StaggerItem as="span" className="inline-flex">
            <a href="#main" aria-label={dict.a11y.backToTop} className={cn(linkClass, "min-w-10 justify-center text-base")}>
              <Icon name="arrowUp" className={iconClass("arrowUp")} />
            </a>
          </StaggerItem>
        </Stagger>
      </Container>
    </footer>
  );
}
