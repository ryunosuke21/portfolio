import "./src/env/server";
import "./src/env/client";
import type { NextConfig } from "next";

const config = {
  transpilePackages: ["@portfolio/ui"],
} satisfies NextConfig;

export default config;
