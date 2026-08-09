import { ImageResponse } from "next/og";
import { site } from "@/content/site";

// Required by `output: "export"`: the card is rendered once at build time.
export const dynamic = "force-static";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.title;

/* Void, the wordmark, the tagline. Nothing else: a share card that tries to
   show product UI at this size just renders as noise. */
export default async function OpengraphImage() {
  const poppins = await fetch(
    new URL(
      "https://raw.githubusercontent.com/google/fonts/main/ofl/poppins/Poppins-Bold.ttf",
    ),
  ).then((response) => response.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0A0A0B",
          color: "#EDEDEA",
          padding: "96px",
          fontFamily: "Poppins",
        }}
      >
        <div style={{ fontSize: 96, letterSpacing: "-0.03em", display: "flex" }}>
          {site.name}
          <span style={{ color: "#FF5A1F" }}>.</span>
        </div>
        <div
          style={{
            fontSize: 48,
            letterSpacing: "-0.03em",
            marginTop: 24,
            color: "#82858C",
          }}
        >
          {site.tagline}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Poppins", data: poppins, style: "normal", weight: 700 }],
    },
  );
}
