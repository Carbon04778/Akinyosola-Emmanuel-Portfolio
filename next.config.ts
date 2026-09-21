import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // three.js ships untranspiled ESM examples; keep it happy under Turbopack.
  transpilePackages: ["three"],
};

export default nextConfig;
