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

import { env } from "@/env/server";
import { db } from "@/server/db";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    camelCase: false,
    usePlural: true,
  }),
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
      redirectURI: "http://localhost:3000/api/auth/callback/github",
    },
  },
  plugins: [
    nextCookies(),
    twoFactor(),
    admin(),
    multiSession(),
    lastLoginMethod(),
    jwt(),
    oauthProvider({
      loginPage: "/sign-in",
      consentPage: "/consent",
      signup: {
        page: "/sign-up",
      },
      selectAccount: {
        page: "/",
        shouldRedirect: async () => {
          return true;
        },
      },
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
