import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { channelsFor, site } from "@/content/site";
import { ContactForm } from "@/features/contact/contact-form";
import { limits } from "@/features/contact/shared";
import { getDictionary } from "@/i18n/dictionaries";

export async function Contact() {
  const { contact } = await getDictionary();
  const { form } = contact;

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-section">
      <Container>
        <Reveal className="relative grid gap-[clamp(32px,5vw,64px)] overflow-hidden rounded-[20px] border border-line bg-surface p-[clamp(28px,5.5vw,66px)] md:grid-cols-[0.9fr_1.1fr]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-56 -right-40 size-130 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-accent)_12%,transparent),transparent_64%)]"
          />

          <div className="relative">
            <h2
              id="contact-title"
              className="max-w-[14ch] font-display text-[clamp(30px,4.4vw,52px)] leading-[1.05] font-bold tracking-[-0.035em]"
            >
              {contact.title}
            </h2>
            <p className="mt-5 max-w-[40ch] text-[17px] text-dust">{contact.body}</p>

            <p className="mt-10 text-xs font-bold tracking-[0.16em] text-dust uppercase">{contact.direct}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {channelsFor("contact").map((channel) => (
                <Magnetic key={channel.id}>
                  <ButtonLink
                    href={channel.href}
                    variant="secondary"
                    {...(channel.external && { target: "_blank", rel: "noreferrer" })}
                  >
                    {channel.label}
                  </ButtonLink>
                </Magnetic>
              ))}
            </div>
          </div>

          <div className="relative">
            <ContactForm
              labels={{
                name: form.name,
                email: form.email,
                message: form.message,
                submit: form.submit,
                sending: form.sending,
                successTitle: form.successTitle,
                successBody: form.successBody,
                failed: form.failed(site.email),
                errors: {
                  required: form.errors.required,
                  invalid: form.errors.invalid,
                  tooShort: form.errors.tooShort(limits.messageMin),
                  tooLong: form.errors.tooLong,
                },
              }}
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
