import { Hero } from "@/components/sections/Hero";
import { Platforms } from "@/components/sections/Platforms";
import { TechStrip } from "@/components/sections/TechStrip";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Showcase } from "@/components/sections/Showcase";
import { DesignWork } from "@/components/sections/DesignWork";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Reviews } from "@/components/sections/Reviews";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Platforms />
      <TechStrip />
      <Services />
      <About />
      <Showcase />
      <DesignWork />
      <Process />
      <Testimonials />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
