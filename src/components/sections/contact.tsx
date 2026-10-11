import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { channelsFor } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

/**
 * Versión 1: contacto directo. El formulario (Server Action + Resend) llega
 * cuando haya cuenta de Resend; hasta entonces, los canales que ya funcionan.
 */
export async function Contact() {
  const { contact } = await getDictionary();

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-section">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[20px] border border-line bg-surface p-[clamp(30px,5.5vw,66px)]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-56 -right-40 size-[520px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent_64%)]"
          />
          <h2
            id="contact-title"
            className="relative max-w-[16ch] font-display text-[clamp(30px,5.4vw,60px)] leading-[1.05] font-bold tracking-[-0.035em]"
          >
            {contact.title}
          </h2>
          <p className="relative mt-5 max-w-[48ch] text-[17px] text-dust">{contact.body}</p>

          <div className="relative mt-9 flex flex-wrap gap-3">
            {channelsFor("contact").map((channel, index) => (
              <Magnetic key={channel.id}>
                <ButtonLink
                  href={channel.href}
                  variant={index === 0 ? "primary" : "secondary"}
                  arrow={index === 0}
                  {...(channel.external && { target: "_blank", rel: "noreferrer" })}
                >
                  {channel.label}
                </ButtonLink>
              </Magnetic>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
