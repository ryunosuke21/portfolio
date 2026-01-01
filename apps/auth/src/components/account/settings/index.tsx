"use client";

import type React from "react";

import { cn } from "@portfolio/ui/lib/utils";

import { DangerZone } from "@/components/account/settings/danger-zone";
import { Preference } from "@/components/account/settings/preference";

type SettingsProps = React.ComponentProps<"section">;

export function Settings({
  className,
  id = "settings",
  ...props
}: SettingsProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Preference />
      <DangerZone />
    </section>
  );
}
