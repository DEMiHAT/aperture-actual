import { Hero } from "@/components/sections/Hero";
import { StrategyCall } from "@/components/sections/StrategyCall";
import { About } from "@/components/sections/About";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Portfolio } from "@/components/sections/Portfolio";
import { FAQ } from "@/components/sections/FAQ";
import { CalendlyEmbed } from "@/components/sections/CalendlyEmbed";

export default function Home() {
  return (
    <>
      <Hero />
      <StrategyCall />
      <About />
      <Ecosystem />
      <Services />
      <Process />
      <Portfolio />
      <FAQ />
      <CalendlyEmbed />
    </>
  );
}

