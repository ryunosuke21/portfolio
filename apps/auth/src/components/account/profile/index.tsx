import type React from "react";

import { cn } from "@portfolio/ui/lib/utils";

import { Email } from "@/components/account/profile/email";
import { LinkedAccounts } from "@/components/account/profile/linked-accounts";
import { PersonalInformation } from "@/components/account/profile/personal-information";
import { getSession } from "@/server/auth/server";
import { api } from "@/trpc/server";

type ProfileProps = React.ComponentProps<"section">;

export async function Profile({
  className,
  id = "profile",
  ...props
}: ProfileProps) {
  const session = await getSession();
  const accounts = await api.auth.account.list({ showEmail: true });

  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      {/** biome-ignore lint/style/noNonNullAssertion: Session is guaranteed to be not null because of the redirect in the page */}
      <PersonalInformation user={session!.user} />
      {/** biome-ignore lint/style/noNonNullAssertion: Session is guaranteed to be not null because of the redirect in the page */}
      <Email user={session!.user} />
      <LinkedAccounts accounts={accounts} />
    </section>
  );
}
