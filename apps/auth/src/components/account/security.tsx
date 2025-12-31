"use client";

import type React from "react";
import { Globe, Phone, Smartphone } from "lucide-react";

import { Badge } from "@portfolio/ui/components/badge";
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
import { Switch } from "@portfolio/ui/components/switch";
import { cn } from "@portfolio/ui/lib/utils";

type SecurityProps = React.ComponentProps<"section">;
export function Security({
  className,
  id = "security",
  ...props
}: SecurityProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Card>
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

      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Active Sessions</CardTitle>
          <CardDescription>
            Manage devices where you&apos;re currently logged in
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Chrome on macOS</p>
                  <p className="text-muted-foreground text-sm">
                    San Francisco, CA • Last active now
                  </p>
                  <Badge variant="secondary" className="mt-2">
                    Current Session
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                  <Smartphone className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Mobile App on iPhone</p>
                  <p className="text-muted-foreground text-sm">
                    New York, NY • Last active 2 hours ago
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
