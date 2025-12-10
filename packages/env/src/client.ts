import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config({ path: "../../apps/web/.env" });

export const env = createEnv({
  client: {
    NEXT_PUBLIC_BASE_URL: z.string().default("http://localhost:3000"),
  },
  clientPrefix: "NEXT_PUBLIC_",
  runtimeEnv: process.env,
  isServer: false,
});
