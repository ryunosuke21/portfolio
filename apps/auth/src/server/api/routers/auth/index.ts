import { createTRPCRouter } from "@/server/api/trpc";

import { sessionRouter } from "./session";

export const authRouter = createTRPCRouter({
  session: sessionRouter,
});
