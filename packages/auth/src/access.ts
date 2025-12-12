import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statements = {
  ...defaultStatements,
  projects: ["create", "update", "delete"],
  requests: ["read", "update", "delete"],
} as const;

export const access = createAccessControl(statements);

export const admin = access.newRole({
  ...adminAc.statements,
  projects: ["create", "update", "delete"],
  requests: ["read", "update", "delete"],
});

export const user = access.newRole({
  user: [],
  session: [],
  projects: [],
  requests: [],
});
