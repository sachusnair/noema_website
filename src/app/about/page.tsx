import type { Metadata } from "next";
import {
  AboutClose,
  AboutContrast,
  AboutFounderStory,
  AboutHero,
  AboutModel,
  AboutOneLine,
  AboutPrinciples,
  AboutProblem,
  AboutQuote,
  AboutVision,
  AboutWhy,
  AboutWork,
} from "@/components/about/AboutSections";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { aboutPage, site } from "@/content/site";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: aboutPage.hero.sub,
  alternates: { canonical: `${site.url}/about` },
};

/* Told in order: the problem, why Noema exists, what it believes, how it
   works, who is building it, and where it is going. Each section is its own
   component in components/about/AboutSections.tsx; this file is the running
   order and nothing else.

   It does not use PageShell. That wrapper assumes an eyebrow, a title and a
   sub at the top of one column, which is the shape of every other standalone
   page and the opposite of what this page needed. */
export default function AboutPage() {
  return (
    <>
      <Nav />

      <main id="top">
        <AboutHero />
        <AboutProblem />
        <AboutWhy />
        <AboutModel />
        <AboutContrast />
        <AboutWork />
        <AboutFounderStory />
        <AboutQuote />
        <AboutPrinciples />
        <AboutVision />
        <AboutOneLine />
        <AboutClose />
      </main>

      <Footer />
    </>
  );
}
