import { ClosingCta } from "@/components/ClosingCta";
import { Difference } from "@/components/Difference";
import { Connections } from "@/components/Connections";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Problem } from "@/components/Problem";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Difference />
        <Connections />
        <ClosingCta />
      </main>
      <Footer />
    </>
  );
}
