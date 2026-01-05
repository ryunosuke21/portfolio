import { createTRPCRouter } from "@/server/api/trpc";

import { accountRouter } from "./accounts";
import { sessionRouter } from "./session";

export const authRouter = createTRPCRouter({
  session: sessionRouter,
  account: accountRouter,
});
