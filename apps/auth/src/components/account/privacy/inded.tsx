"use client";

import type React from "react";

import { cn } from "@portfolio/ui/lib/utils";

import { DataExport } from "@/components/account/privacy/data-export";
import { PrivacySettings } from "@/components/account/privacy/settings";

type PrivacyProps = React.ComponentProps<"section">;

export function Privacy({ className, id = "privacy", ...props }: PrivacyProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <PrivacySettings />
      <DataExport />
    </section>
  );
}
