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

type PasswordProps = React.ComponentProps<typeof Card>;

export function Password({
  className,
  id = "password",
  ...props
}: PasswordProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Password</CardTitle>
        <CardDescription>
          Change your password to keep your account secure
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input id="currentPassword" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input id="newPassword" type="password" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <Input id="confirmPassword" type="password" />
        </div>
        <Button>Update Password</Button>
      </CardContent>
    </Card>
  );
}
