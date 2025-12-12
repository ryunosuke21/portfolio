import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    BASE_URL: z.url().default("http://localhost:3000"),
    BETTER_AUTH_SECRET:
      process.env.NODE_ENV === "production"
        ? z.string()
        : z.string().optional(),
    DATABASE_URL: z.url(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  isServer: true,
  runtimeEnv: {
    BASE_URL: process.env.BASE_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
