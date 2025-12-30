import { oauthProviderClient } from "@better-auth/oauth-provider/client";
import {
  adminClient,
  inferAdditionalFields,
  lastLoginMethodClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import type { auth } from "@/server/auth";
import { ac, admin as adminRole, user as userRole } from "@/server/auth/access";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof auth>(),
    adminClient({ ac, roles: { admin: adminRole, user: userRole } }),
    twoFactorClient(),
    lastLoginMethodClient(),
    oauthProviderClient(),
  ],
});

export type Session = typeof authClient.$Infer.Session;
