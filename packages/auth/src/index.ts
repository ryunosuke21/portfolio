import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import * as schema from "@portfolio/db/schema/auth";

import { db } from "@portfolio/db";
import { env } from "@portfolio/env/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",

    schema: schema,
  }),
  trustedOrigins: [env.BASE_URL],
  baseURL: env.BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
