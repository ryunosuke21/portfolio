"use client";

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

import { TwoFactorForm } from "@/components/auth/2fa-totp-form";

export function VerifyClient() {
  const searchParams = useSearchParams();
  const verifyAltHref = `/verify/alt${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  return (
    <div className="grid h-dvh w-dvw place-items-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center!">
          <CardTitle>Verify Account</CardTitle>
          <CardDescription>
            Enter the 6-digit code from your authenticator app to verify your
            account.
          </CardDescription>
          <p className="text-muted-foreground text-xs">
            Can&apos;t access your authenticator app?{" "}
            <Button variant="link" className="mt-1 h-auto p-0 text-xs" asChild>
              <Link href={verifyAltHref}>Try another way</Link>
            </Button>
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <TwoFactorForm className="w-full max-w-lg" />
        </CardContent>
      </Card>
    </div>
  );
}
