"use client";

import type React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import { Separator } from "@portfolio/ui/components/separator";
import { Switch } from "@portfolio/ui/components/switch";
import { cn } from "@portfolio/ui/lib/utils";

type SettingsProps = React.ComponentProps<typeof Card>;

export function PrivacySettings({
  className,
  id = "privacy-settings",
  ...props
}: SettingsProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Privacy Settings</CardTitle>
        <CardDescription>
          Control how your data is used and shared
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between py-3">
          <div className="space-y-0.5">
            <p className="font-medium">Profile Visibility</p>
            <p className="text-muted-foreground text-sm">
              Make your profile visible to other users
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between py-3">
          <div className="space-y-0.5">
            <p className="font-medium">Activity Tracking</p>
            <p className="text-muted-foreground text-sm">
              Allow tracking for analytics purposes
            </p>
          </div>
          <Switch defaultChecked />
        </div>
        <Separator />
        <div className="flex items-center justify-between py-3">
          <div className="space-y-0.5">
            <p className="font-medium">Marketing Emails</p>
            <p className="text-muted-foreground text-sm">
              Receive promotional content and updates
            </p>
          </div>
          <Switch />
        </div>
      </CardContent>
    </Card>
  );
}
