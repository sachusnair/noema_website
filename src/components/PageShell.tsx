import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Reveal } from "./Reveal";

/* Wrapper for the four standalone pages. The home page keeps its own
   composition, including the time rail, because the rail marks positions in
   the overnight cycle and means nothing on a page about pricing. */
export function PageShell({
  eyebrow,
  title,
  sub,
  children,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main id="top">
        <div className="shell pt-20 pb-24 lg:pt-28 lg:pb-32">
          <header className="max-w-[62ch]">
            <Reveal>
              <p className="type-mono text-ember">{eyebrow}</p>
            </Reveal>
            <Reveal index={1}>
              <h1 className="type-display-l mt-6">{title}</h1>
            </Reveal>
            {sub ? (
              <Reveal index={2}>
                <p className="mt-7 text-step-4 leading-[1.5] text-bone/80">
                  {sub}
                </p>
              </Reveal>
            ) : null}
          </header>

          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
