import type { NextRequest } from "next/server";

import { auth } from "@portfolio/auth";

export type Context = {
  session: typeof auth.$Infer.Session | null;
  headers: Headers;
};

export async function createContext(req: NextRequest): Promise<Context> {
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  return {
    session,
    headers: req.headers,
  };
}
