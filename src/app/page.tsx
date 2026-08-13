import { ClosingCta } from "@/components/ClosingCta";
import { Difference } from "@/components/Difference";
import { Connections } from "@/components/Connections";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { FounderNote } from "@/components/FounderNote";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Nav } from "@/components/Nav";
import { Problem } from "@/components/Problem";
import { TheBrief } from "@/components/TheBrief";
import { Trust } from "@/components/Trust";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Difference />
        <TheBrief />
        <HowItWorks />
        <Connections />
        <FounderNote />
        <Trust />
        <Faq />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
