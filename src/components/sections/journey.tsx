import { Timeline } from "@/components/motion/timeline";
import { Container } from "@/components/ui/container";
import { SectionHead } from "@/components/ui/section-head";
import { site } from "@/content/site";
import { getDictionary } from "@/i18n/dictionaries";

export async function Journey() {
  const { journey } = await getDictionary();

  const items = journey.items.map((item) => ({
    ...item,
    href: item.id === "bootcamp" ? site.career.bootcamp.url : undefined,
  }));

  return (
    <section id="journey" aria-labelledby="journey-title" className="py-section">
      <Container>
        <SectionHead id="journey-title" kicker={journey.kicker} title={journey.title} underline={2} />
        <Timeline items={items} />
      </Container>
    </section>
  );
}
