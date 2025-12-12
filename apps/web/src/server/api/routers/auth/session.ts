import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const sessionRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
});
