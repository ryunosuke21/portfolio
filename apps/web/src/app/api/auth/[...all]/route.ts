import { toNextJsHandler } from "better-auth/next-js";

import { auth } from "@portfolio/auth";

export const { GET, POST } = toNextJsHandler(auth.handler);
