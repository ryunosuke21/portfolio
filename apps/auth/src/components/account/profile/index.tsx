"use client";

import type React from "react";

import { cn } from "@portfolio/ui/lib/utils";

import { LinkedAccounts } from "@/components/account/profile/linked-accounts";
import { PersonalInformation } from "@/components/account/profile/personal-information";

type ProfileProps = React.ComponentProps<"section">;

export function Profile({ className, id = "profile", ...props }: ProfileProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <PersonalInformation />
      <LinkedAccounts />
    </section>
  );
}
