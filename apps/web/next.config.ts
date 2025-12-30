import "./src/env/server";
import "./src/env/client";
import type { NextConfig } from "next";

const config = {
  transpilePackages: ["@portfolio/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
} satisfies NextConfig;

export default config;
