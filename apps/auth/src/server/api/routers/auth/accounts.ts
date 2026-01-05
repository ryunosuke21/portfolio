import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import type { accounts } from "@/server/db/schema/auth";

type AccountWithEmail = {
  id: string;
  provider: string;
  email?: string | null;
};

export const accountRouter = createTRPCRouter({
  list: protectedProcedure
    .input(
      z
        .object({
          showEmail: z.boolean().default(false),
        })
        .optional(),
    )
    .query(async ({ ctx, input }) => {
      const accountList = await ctx.db.query.accounts.findMany({
        where: (accountsTable, { eq }) =>
          eq(accountsTable.userId, ctx.session.user.id),
      });

      const showEmail = !!input?.showEmail;

      type Account = typeof accounts.$inferSelect;

      // Helper function to extract email if possible
      async function getAccountWithEmail(
        account: Account,
      ): Promise<AccountWithEmail> {
        // Try idToken (typical for Google, etc)
        if (showEmail && account.idToken) {
          try {
            const payloadB64 = account.idToken.split(".")[1] as string;
            const payload = JSON.parse(
              Buffer.from(payloadB64, "base64url").toString("utf8"),
            ) as { email?: string };
            return {
              id: account.id,
              provider: account.providerId,
              email: payload.email,
            };
          } catch {
            // Fallthrough to null if parsing fails
          }
        }

        // Try GitHub API if github and showEmail enabled
        if (
          showEmail &&
          account.providerId === "github" &&
          account.accessToken
        ) {
          try {
            const res = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `Bearer ${account.accessToken}`,
                Accept: "application/vnd.github+json",
                "User-Agent": "your-nextjs-app",
              },
            });

            if (res.ok) {
              const emails = (await res.json()) as {
                email: string;
                primary: boolean;
                verified: boolean;
                visibility: "public" | "private";
              }[];
              const primaryEmail = emails.find((email) => email.primary);
              return {
                id: account.id,
                provider: account.providerId,
                email: primaryEmail?.email ?? null,
              };
            }
          } catch {
            // Ignore and fallthrough
          }
        }

        // Fallback: no email
        return {
          id: account.id,
          provider: account.providerId,
          email: null,
        };
      }

      const result: AccountWithEmail[] = showEmail
        ? await Promise.all(accountList.map(getAccountWithEmail))
        : accountList.map((account) => ({
            id: account.id,
            provider: account.providerId,
            email: null,
          }));

      return result;
    }),
});
