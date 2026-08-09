import type { NextConfig } from "next";

// `output: "export"` is required by the brief: the site must be statically
// exportable. It also forbids API routes and image optimisation at runtime,
// which is why no <Image> optimisation loader is configured below.
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
