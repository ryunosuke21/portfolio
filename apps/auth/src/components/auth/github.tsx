"use client";

import React from "react";
import { GitHubDark } from "@ridemountainpig/svgl-react";
import { useTheme } from "next-themes";
import { toast } from "sonner";

import { Button } from "@portfolio/ui/components/button";
import { LoadingSwap } from "@portfolio/ui/components/loading-swap";
import { cn } from "@portfolio/ui/lib/utils";

import { signIn } from "@/hooks/auth";

type GithubLoginProps = React.ComponentProps<typeof Button>;

export function GithubLogin({
  className,
  variant = "outline",
  ...props
}: GithubLoginProps) {
  const [loading, setLoading] = React.useState(false);
  const { resolvedTheme } = useTheme();

  async function loginWithGithub() {
    setLoading(true);
    const result = await signIn.social({
      provider: "github",
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
      className={cn("bg-black/80", className)}
      onClick={handleGithubLogin}
      {...props}
    >
      <LoadingSwap isLoading={loading} className="flex items-center gap-2">
        <GitHubDark />
        <span>Continue with Github</span>
      </LoadingSwap>
    </Button>
  );
}
