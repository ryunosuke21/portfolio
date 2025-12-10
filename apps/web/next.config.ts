import type { NextConfig } from "next";
import { createJiti } from "jiti";

const jiti = createJiti(import.meta.url);

jiti.import("@portfolio/env/server");

const nextConfig: NextConfig = {
  typedRoutes: true,
  reactCompiler: true,
};

export default nextConfig;
