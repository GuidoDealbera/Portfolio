import Image from "next/image";
import { Magnetic } from "@/components/motion/magnetic";
import { Intro, introStyle } from "@/components/motion/intro";
import { SplitText } from "@/components/motion/split-text";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/content/site";
import { getDictionary, getLocale } from "@/i18n/dictionaries";

export async function Hero() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const { hero } = dict;

  const facts = [`${site.place.city}, ${site.place.region}`, hero.remote(site.timezone), hero.languages, hero.degree];

  // Nombre y título: leyenda de la foto en escritorio y, en el celular, al lado del avatar.
  const identity = (
    <>
      <span className="block font-display text-[17px] font-semibold tracking-[-0.02em]">{site.fullName}</span>
      <span className="mt-0.5 block text-[13px] text-dust">{hero.photoCaption}</span>
    </>
  );

  return (
    // Abajo de lg el avatar suma una fila arriba del todo: el padding superior es menor para compensarla.
    <section aria-labelledby="hero-title" className="pt-[clamp(96px,13vh,150px)] pb-section lg:pt-[clamp(112px,18vh,180px)]">
      {/* Desde lg, dos columnas: la foto acompaña al estado, el titular, el texto y las fortalezas, y los botones y
          los datos ocupan todo el ancho. Cada imagen es lazy y la otra queda con display: none, así que cada
          pantalla descarga sólo la suya. */}
      <Container className="lg:grid lg:grid-cols-[minmax(0,1fr)_clamp(280px,27vw,340px)] lg:gap-x-[clamp(40px,4.5vw,64px)]">
        {site.photo && (
          <Intro rise="10px" className="mb-5 flex items-center gap-3.5 lg:hidden">
            {/* Recorte de avatar: escalada desde arriba, la cara queda al centro del círculo. El nombre está al
                lado, así que el alt va vacío para que el lector de pantalla no lo lea dos veces. */}
            <span className="block size-14 shrink-0 overflow-hidden rounded-full border border-accent/30 bg-surface">
              <Image
                src={site.photo.src}
                alt=""
                width={site.photo.width}
                height={site.photo.height}
                sizes="72px"
                className="size-full scale-125 object-cover object-top"
              />
            </span>
            <div>{identity}</div>
          </Intro>
        )}

        {site.photo && (
          <Intro delay={0.3} rise="20px" className="hidden lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:flex">
            <figure className="flex flex-1 flex-col">
              {/* Llena el alto de las cuatro filas que acompaña, menos la leyenda, sin agrandarlas: object-cover recorta lo que sobre. */}
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-[14px] border border-line bg-surface bg-[radial-gradient(90%_60%_at_50%_30%,color-mix(in_srgb,var(--color-accent)_16%,transparent),transparent_70%)]">
                <Image src={site.photo.src} alt={hero.photoAlt} fill sizes="340px" className="object-cover object-top" />
              </div>
              <figcaption className="mt-3.5">{identity}</figcaption>
            </figure>
          </Intro>
        )}

        {site.availableForFreelance && (
          <Intro rise="10px" className="lg:col-start-1">
            <span className="soft-accent inline-flex items-center gap-2.5 rounded-full border border-accent/30 px-3.5 py-1.5 text-xs font-semibold tracking-widest text-accent uppercase">
              <span aria-hidden="true" className="relative block size-1.75 rounded-full bg-accent">
                <span className="absolute -inset-1 animate-ping-soft rounded-full border border-accent" />
              </span>
              {hero.availability}
            </span>
          </Intro>
        )}

        {/* El titular es una frase larga: el tamaño y el ancho están ajustados para que la
            primera pantalla siga entrando completa desde 720 px de alto. Desde lg comparte el ancho
            con la foto, y por eso es más chico. */}
        <SplitText
          id="hero-title"
          className="mt-6 max-w-[24ch] font-display text-[clamp(32px,4.8vw,62px)] leading-[1.06] font-bold tracking-[-0.035em] lg:col-start-1 lg:text-[clamp(38px,3.8vw,52px)]"
          segments={[{ text: hero.headline.lead }, { text: hero.headline.highlight, className: "text-accent" }]}
        />

        <Intro delay={0.5} className="lg:col-start-1">
          <p className="mt-6 max-w-[62ch] text-[clamp(16px,1.5vw,18px)] leading-[1.7] text-dust">{hero.lede}</p>
        </Intro>

        {/* Fortalezas y datos entran de a uno: la entrada de <Intro> aplicada a cada <li>. */}
        <ul aria-label={hero.strengthsLabel} className="mt-5 flex flex-wrap gap-2 lg:col-start-1">
          {hero.strengths.map((strength, index) => (
            <li
              key={strength}
              className="animate-chalk-in cursor-default rounded-full bg-raised px-3 py-1 text-[13px] font-semibold text-chalk transition-[background-color,color,translate] duration-300 ease-chalk hover:-translate-y-0.5 hover:bg-accent/15 hover:text-accent"
              style={introStyle(0.56 + index * 0.06)}
            >
              {strength}
            </li>
          ))}
        </ul>

        <Intro delay={0.8} className="mt-8 flex flex-wrap items-center gap-3 lg:col-span-2">
          <Magnetic>
            <ButtonLink href="#contact" trailingIcon="arrowRight">
              {hero.ctaContact}
            </ButtonLink>
          </Magnetic>
          <Magnetic>
            <ButtonLink href="#work" variant="secondary" trailingIcon="arrowDown">
              {hero.ctaWork}
            </ButtonLink>
          </Magnetic>
          <ButtonLink href={site.cv[locale]} variant="ghost" icon="download" download>
            {hero.ctaCv}
          </ButtonLink>
        </Intro>

        <ul className="mt-10 flex flex-wrap gap-x-5.5 gap-y-2 border-t border-line pt-5 text-[13px] text-dust lg:col-span-2">
          {facts.map((fact, index) => (
            <li key={fact} className="inline-flex animate-chalk-in items-center gap-2" style={introStyle(0.92 + index * 0.07)}>
              <span aria-hidden="true" className="size-1 rounded-full bg-accent/65" />
              {fact}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
