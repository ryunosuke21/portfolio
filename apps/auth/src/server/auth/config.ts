import { oauthProvider } from "@better-auth/oauth-provider";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  admin,
  jwt,
  lastLoginMethod,
  multiSession,
  twoFactor,
} from "better-auth/plugins";

import { MAX_SESSIONS } from "@/constants";
import { env } from "@/env/server";
import { ac, admin as adminRole, user as userRole } from "@/server/auth/access";
import { db } from "@/server/db";

export const auth = betterAuth({
  baseURL: env.BASE_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    camelCase: false,
    usePlural: true,
  }),
  user: {
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
        returned: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
    requireEmailVerification: false,
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: true,
      trustedProviders: ["github"],
    },
    updateAccountOnSignIn: false,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      redirectURI: `${env.BASE_URL}/api/auth/callback/github`,
    },
  },
  plugins: [
    nextCookies(),
    twoFactor(),
    admin({
      ac,
      roles: {
        admin: adminRole,
        user: userRole,
      },
      adminRoles: ["admin"],
      defaultRole: "user",
    }),
    multiSession({
      maximumSessions: MAX_SESSIONS,
    }),
    lastLoginMethod({
      storeInDatabase: true,
    }),
    jwt(),
    oauthProvider({
      loginPage: "/sign-in",
      consentPage: "/consent",
      signup: {
        page: "/sign-up",
      },
      selectAccount: {
        page: "/select-account",
        shouldRedirect: async () => {
          return true;
        },
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
