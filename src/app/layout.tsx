import type { Metadata } from "next";
import { Archivo, JetBrains_Mono, Poppins } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

/* Each face is exposed as one CSS variable, consumed once in globals.css.
   Swapping a family is a change here and nowhere else.
   next/font self-hosts the files and ships matched fallback metrics, which is
   what keeps font loading from shifting the layout. */
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-GB"
      className={`${poppins.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {/* Framer Motion writes its initial state into the server HTML, so
            with JavaScript off the reveals would stay at opacity 0. This
            restores every animated element to its resolved state when no
            script can run. */}
        <noscript>
          <style>{`
            [data-reveal] {
              opacity: 1 !important;
              transform: none !important;
            }
          `}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
