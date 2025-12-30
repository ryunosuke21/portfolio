import { Undo2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";

import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export default function ForgotPasswordPage() {
  return (
    <div className="grid h-dvh w-dvw place-items-center">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center!">
          <CardTitle>Forgot Password</CardTitle>
          <CardDescription>
            Enter your email to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ResetPasswordForm className="w-full max-w-lg" />
          <Button asChild variant="ghost" className="w-full">
            <Link href="/sign-in">
              <Undo2 />
              <span>Back to sign in</span>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
