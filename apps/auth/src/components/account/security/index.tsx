"use client";

import type React from "react";

import { cn } from "@portfolio/ui/lib/utils";

import { TwoFactorAuth } from "@/components/account/security/2fa";
import { Password } from "@/components/account/security/password";
import { Sessions } from "@/components/account/security/sessions";

type SecurityProps = React.ComponentProps<"section">;
export function Security({
  className,
  id = "security",
  ...props
}: SecurityProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Password />
      <TwoFactorAuth />
      <Sessions />
    </section>
  );
}
