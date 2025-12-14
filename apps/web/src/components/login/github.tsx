"use client";

import React from "react";
import { GithubIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@portfolio/ui/components/button";
import { cn } from "@portfolio/ui/lib/utils";

import { signIn } from "@/hooks/auth";

type GithubLoginProps = React.ComponentProps<typeof Button>;

export function GithubLogin({
  className,
  variant = "outline",
  ...props
}: GithubLoginProps) {
  const [loading, setLoading] = React.useState(false);

  async function loginWithGithub() {
    setLoading(true);
    const result = await signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });

    setLoading(false);
    if (result.error) {
      throw new Error(result.error.message);
    }
  }

  function handleGithubLogin() {
    toast.promise(loginWithGithub, {
      loading: "Connecting to Github...",
      success: "Redirecting",
      error: "Failed to connect to Github",
    });
  }

  return (
    <Button
      variant={variant}
      className={cn(className)}
      onClick={handleGithubLogin}
      {...props}
    >
      <GithubIcon className="size-4" />
      Continue with Github
    </Button>
  );
}
