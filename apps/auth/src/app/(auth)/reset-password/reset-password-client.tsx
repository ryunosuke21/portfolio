"use client";

import { Undo2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export function ResetPasswordClient() {
  const searchParams = useSearchParams();
  const signInHref = `/sign-in${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <div className="grid h-dvh w-dvw place-items-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center!">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>
            Enter your new password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm className="w-full max-w-lg" />
          <Button asChild variant="ghost" className="w-full">
            <Link href={signInHref}>
              <Undo2 />
              <span>Back to sign in</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
