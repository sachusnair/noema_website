"use client";

import { useCallback, useState } from "react";
import {
  MARK_DOT,
  MARK_N,
  MARK_N_PATH,
  MARK_VIEWBOX,
  NoemaMark,
} from "./NoemaMark";
import { brand } from "@/content/site";

/* Hex rather than the CSS variables. A canvas takes a colour string, not a
   custom property, and reading the computed values back would make an export
   depend on whichever page it happened to be rendered on. These three are the
   same values as the @theme tokens in globals.css. */
const VOID = "#0A0A0B";
const BONE = "#EDEDEA";
const EMBER = "#FF5A1F";

/* Drawn at four times the requested size and scaled down once, because a 16px
   canvas filled directly leaves the diagonal visibly stepped. */
const SUPERSAMPLE = 4;

function paint(canvas: HTMLCanvasElement, size: number, background: boolean) {
  const context = canvas.getContext("2d");
  if (!context) return;

  canvas.width = size;
  canvas.height = size;
  const scale = size / MARK_VIEWBOX;

  context.clearRect(0, 0, size, size);
  if (background) {
    context.fillStyle = VOID;
    context.fillRect(0, 0, size, size);
  }

  context.fillStyle = BONE;
  context.beginPath();
  MARK_N.forEach(([x, y], index) => {
    const point: [number, number] = [x * scale, y * scale];
    if (index === 0) context.moveTo(...point);
    else context.lineTo(...point);
  });
  context.closePath();
  context.fill();

  context.fillStyle = EMBER;
  context.beginPath();
  context.arc(
    MARK_DOT.cx * scale,
    MARK_DOT.cy * scale,
    MARK_DOT.r * scale,
    0,
    Math.PI * 2,
  );
  context.fill();
}

function render(size: number, background: boolean): HTMLCanvasElement {
  const large = document.createElement("canvas");
  paint(large, size * SUPERSAMPLE, background);

  const out = document.createElement("canvas");
  out.width = size;
  out.height = size;
  const context = out.getContext("2d");
  if (context) {
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(large, 0, 0, size, size);
  }
  return out;
}

function save(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  // Revoked on the next frame: revoking synchronously can beat the download
  // starting in Safari.
  requestAnimationFrame(() => URL.revokeObjectURL(url));
}

function svgSource() {
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${MARK_VIEWBOX} ${MARK_VIEWBOX}" width="${MARK_VIEWBOX}" height="${MARK_VIEWBOX}">`,
    `<rect width="${MARK_VIEWBOX}" height="${MARK_VIEWBOX}" fill="${VOID}"/>`,
    `<path d="${MARK_N_PATH}" fill="${BONE}"/>`,
    `<circle cx="${MARK_DOT.cx}" cy="${MARK_DOT.cy}" r="${MARK_DOT.r}" fill="${EMBER}"/>`,
    `</svg>`,
  ].join("");
}

const control =
  "inline-flex items-center justify-center rounded-default font-body font-medium transition-colors duration-200";

export function BrandDownloader() {
  const [size, setSize] = useState<number>(512);

  const downloadPng = useCallback(
    (background: boolean, file: string) => {
      render(size, background).toBlob((blob) => {
        if (blob) save(blob, `${file}-${size}.png`);
      }, "image/png");
    },
    [size],
  );

  const downloadSvg = useCallback(() => {
    save(
      new Blob([svgSource()], { type: "image/svg+xml" }),
      "noema-icon.svg",
    );
  }, []);

  return (
    <div className="mt-16 lg:mt-20">
      <fieldset>
        <legend className="type-mono text-ash">{brand.sizeLabel}</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {brand.sizes.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              aria-pressed={option === size}
              className={`${control} border px-4 py-2 font-mono text-step-1 ${
                option === size
                  ? "border-ember bg-ember text-void"
                  : "border-ash/50 text-bone hover:border-ember hover:text-ember"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {brand.variants.map((variant) => {
          const onVoid = variant.id === "void";
          return (
            <div
              key={variant.id}
              className="flex flex-col border border-ash/25 bg-carbon p-6"
            >
              {/* The preview is the SVG, not the canvas: it stays crisp at
                  whatever size the card happens to be, and the export is
                  redrawn from the same numbers anyway. The chequerboard behind
                  the transparent one is what makes the two cards distinguishable
                  on a dark page. */}
              <div
                className="flex items-center justify-center py-8"
                style={
                  onVoid
                    ? undefined
                    : {
                        backgroundImage:
                          "repeating-conic-gradient(#1b1c20 0% 25%, #131417 0% 50%)",
                        backgroundSize: "16px 16px",
                      }
                }
              >
                <NoemaMark className="size-32" background={onVoid} />
              </div>

              <h2 className="mt-6 text-step-3">{variant.label}</h2>
              <p className="mt-2 flex-1 text-step-1 leading-[1.6] text-bone/70">
                {variant.note}
              </p>

              <button
                type="button"
                onClick={() => downloadPng(onVoid, variant.file)}
                className={`${control} mt-6 border border-ash px-5 py-3 text-step-2 text-bone hover:border-ember hover:text-ember`}
              >
                {brand.download}
                <span className="ml-2 font-mono text-ash">
                  {size}&times;{size}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 border-t border-ash/25 pt-6">
        <button
          type="button"
          onClick={downloadSvg}
          className={`${control} border border-ash px-5 py-3 text-step-2 text-bone hover:border-ember hover:text-ember`}
        >
          {brand.downloadSvg}
        </button>
        <p className="mt-3 max-w-[60ch] text-step-1 text-bone/70">
          {brand.svgNote}
        </p>
      </div>

      <noscript>
        <p className="mt-8 max-w-[60ch] text-step-1 text-ash">
          {brand.unavailable}
        </p>
      </noscript>
    </div>
  );
}
