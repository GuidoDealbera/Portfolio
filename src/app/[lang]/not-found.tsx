import { Intro } from "@/components/motion/intro";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { NotFoundCode } from "@/components/ui/not-found-code";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export default async function NotFound() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <main id="main" className="grid min-h-[70vh] place-items-center pt-24">
      <Container className="text-center">
        <NotFoundCode />
        <Intro delay={0.5} rise="16px">
          <h1 className="mt-4 font-display text-[clamp(24px,3.4vw,36px)] font-semibold tracking-[-0.02em]">
            {dict.notFound.title}
          </h1>
        </Intro>
        <Intro delay={0.6} rise="16px">
          <p className="mx-auto mt-3 max-w-[40ch] text-dust">{dict.notFound.body}</p>
        </Intro>
        <Intro delay={0.7} rise="16px" className="mt-8 flex justify-center">
          <ButtonLink href={`/${locale}`} icon="house">
            {dict.notFound.back}
          </ButtonLink>
        </Intro>
      </Container>
    </main>
  );
}
