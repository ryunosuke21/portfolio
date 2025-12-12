import { protectedProcedure, router } from "@portfolio/api/index";

import { auth } from "@portfolio/auth";

export const accountsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const accounts = await auth.api.listUserAccounts({
      headers: ctx.headers,
    });
  }),
});
