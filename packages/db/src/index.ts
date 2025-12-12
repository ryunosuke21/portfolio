import { drizzle } from "drizzle-orm/neon-serverless";

import { env } from "@portfolio/env/server";
import * as schema from "./schema";

export const db = drizzle(env.DATABASE_URL, {
  schema,
  casing: "snake_case",
  logger: true,
});
