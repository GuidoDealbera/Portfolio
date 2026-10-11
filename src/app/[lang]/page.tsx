import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Journey } from "@/components/sections/journey";
import { Marquee } from "@/components/sections/marquee";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <main id="main" tabIndex={-1} className="outline-none">
      <Hero />
      <Marquee />
      <Work />
      <About />
      <Journey />
      <Contact />
    </main>
  );
}
