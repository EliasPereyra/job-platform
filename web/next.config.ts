import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  // CMS packages ship TypeScript source.
  transpilePackages: ["@workstart/cms-sanity"],
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
};

export default nextConfig;
