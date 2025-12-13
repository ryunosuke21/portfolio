import { adminClient, twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

import { access, admin as adminRole, user } from "./access";

export const authClient = createAuthClient({
  plugins: [
    adminClient({ ac: access, roles: { admin: adminRole, user } }),
    twoFactorClient(),
  ],
});
