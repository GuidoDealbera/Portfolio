import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <main id="main" className="grid min-h-[70vh] place-items-center pt-24">
      <Container className="text-center">
        <p className="font-display text-[clamp(72px,16vw,160px)] leading-none font-bold tracking-[-0.05em] text-accent">404</p>
        <h1 className="mt-4 font-display text-[clamp(24px,3.4vw,36px)] font-semibold tracking-[-0.02em]">
          {dict.notFound.title}
        </h1>
        <p className="mx-auto mt-3 max-w-[40ch] text-dust">{dict.notFound.body}</p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href={`/${locale}`} arrow>
            {dict.notFound.back}
          </ButtonLink>
        </div>
      </Container>
    </main>
  );
}
