"use client";

import type React from "react";
import { GithubIcon } from "lucide-react";

import { Button } from "@portfolio/ui/components/button";
import { cn } from "@portfolio/ui/lib/utils";

type GithubLoginProps = React.ComponentProps<typeof Button>;

export function GithubLogin({
  className,
  variant = "outline",
  ...props
}: GithubLoginProps) {
  return (
    <Button variant={variant} className={cn(className)} {...props}>
      <GithubIcon className="size-4" />
      Continue with Github
    </Button>
  );
}
