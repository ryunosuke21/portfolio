"use client";

import type React from "react";
import { Phone, Smartphone } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import { Switch } from "@portfolio/ui/components/switch";
import { cn } from "@portfolio/ui/lib/utils";

type TwoFactorAuthProps = React.ComponentProps<typeof Card>;

export function TwoFactorAuth({
  className,
  id = "two-factor-auth",
  ...props
}: TwoFactorAuthProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Two-Factor Authentication</CardTitle>
        <CardDescription>
          Add an extra layer of security to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Smartphone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Authenticator App</p>
              <p className="text-muted-foreground text-sm">
                Use an app to generate codes
              </p>
            </div>
          </div>
          <Switch defaultChecked />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <p className="font-medium">SMS Verification</p>
              <p className="text-muted-foreground text-sm">
                Receive codes via text message
              </p>
            </div>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}
