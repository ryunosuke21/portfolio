"use client";

import type React from "react";

import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import { Input } from "@portfolio/ui/components/input";
import { Label } from "@portfolio/ui/components/label";
import { cn } from "@portfolio/ui/lib/utils";

type PreferenceProps = React.ComponentProps<typeof Card>;

export function Preference({
  className,
  id = "preference",
  ...props
}: PreferenceProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Account Preferences</CardTitle>
        <CardDescription>Manage your general account settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input id="language" defaultValue="English (US)" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timezone">Timezone</Label>
          <Input id="timezone" defaultValue="Pacific Time (PT)" />
        </div>
        <Button>Save Preferences</Button>
      </CardContent>
    </Card>
  );
}
