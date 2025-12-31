import { oauthProviderClient } from "@better-auth/oauth-provider/client";
import type { BetterAuthClientPlugin } from "better-auth/client";
import {
  adminClient,
  inferAdditionalFields,
  lastLoginMethodClient,
  // multiSessionClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import type { multiSession } from "better-auth/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "@/server/auth";
import { ac, admin as adminRole, user as userRole } from "@/server/auth/access";

const multiSessionClient = () => {
  return {
    id: "multi-session",
    $InferServerPlugin: {} as ReturnType<typeof multiSession>,
    atomListeners: [
      {
        matcher(path) {
          return path === "/multi-session/set-active";
        },
        signal: "$sessionSignal",
      },
    ],
  } satisfies BetterAuthClientPlugin;
};

export const authClient = createAuthClient({
  plugins: [
    adminClient({ ac, roles: { admin: adminRole, user: userRole } }),
    twoFactorClient(),
    lastLoginMethodClient(),
    oauthProviderClient(),
    multiSessionClient(),
    inferAdditionalFields<typeof auth>(),
  ],
});

export type Session = typeof authClient.$Infer.Session;
