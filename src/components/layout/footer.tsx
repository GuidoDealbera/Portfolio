import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/container";
import { channelsFor, site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

const linkClass = "rounded transition-colors duration-300 hover:text-accent";

export async function Footer() {
  // `new Date()` no puede correr en el prerender: se cachea y el año se renueva una vez por día.
  "use cache";
  cacheLife("days");

  const dict = await getDictionary();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-[13px] text-dust">
        <div className="flex flex-col gap-1">
          <span className="text-chalk">{dict.footer.copyright(year, site.fullName)}</span>
          <span>{dict.footer.tagline}</span>
        </div>

        <div className="flex items-center gap-6 font-bold">
          {channelsFor("footer").map((channel) => (
            <a key={channel.id} href={channel.href} target="_blank" rel="noreferrer" className={linkClass}>
              {channel.label}
            </a>
          ))}
          <a href="#main" aria-label={dict.a11y.backToTop} className={`${linkClass} text-base`}>
            <span aria-hidden="true">↑</span>
          </a>
        </div>
      </Container>
    </footer>
  );
}
