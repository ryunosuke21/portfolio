import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { twoFactor } from "better-auth/plugins";

import * as schema from "@portfolio/db/schema/auth";

import { db } from "@portfolio/db";
import { env } from "@portfolio/env/server";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    camelCase: false,
    schema: schema,
  }),
  trustedOrigins: [env.BASE_URL],
  baseURL: env.BASE_URL,
  secret: env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    nextCookies(),
    twoFactor({
      totpOptions: {
        backupCodes: {
          amount: 10,
          length: 16,
          storeBackupCodes:
            env.NODE_ENV === "production" ? "encrypted" : "plain",
        },
        digits: 6,
        period: 32,
      },
      issuer: "Personal Portfolio",
    }),
  ],
});
