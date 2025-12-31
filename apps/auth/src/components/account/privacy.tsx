"use client";

import type React from "react";
import { Download } from "lucide-react";

import { Button } from "@portfolio/ui/components/button";
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

type PrivacyProps = React.ComponentProps<"section">;

export function Privacy({ className, id = "privacy", ...props }: PrivacyProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Data Export</CardTitle>
          <CardDescription>
            Download a copy of your personal data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground text-sm">
            Request a complete export of your account data, including profile
            information, activity logs, and connected applications.
          </p>
          <Button variant="outline" className="gap-2 bg-transparent">
            <Download className="h-4 w-4" />
            Request Data Export
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
