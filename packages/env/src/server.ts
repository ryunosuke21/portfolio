import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../apps/web/.env" });

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    BASE_URL: z.string().default("http://localhost:3000"),
    BETTER_AUTH_SECRET: z.string(),
    DATABASE_URL: z.string(),
  },
  runtimeEnv: process.env,
  isServer: true,
});
