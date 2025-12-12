import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { admin, twoFactor } from "better-auth/plugins";

import { env } from "@/env/server";
import { db } from "@/server/db";
import * as schema from "@/server/db/schema";

import { access, admin as adminRole, user } from "./access";

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
    admin({
      ac: access,
      roles: {
        admin: adminRole,
        user,
      },
      adminRoles: ["admin"],
      allowImpersonatingAdmins: false,
      bannedUserMessage: "You are banned from the admin panel",
      defaultRole: "user",
      defaultBanReason: "You are banned from the admin panel",
    }),
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

export type Auth = typeof auth;
