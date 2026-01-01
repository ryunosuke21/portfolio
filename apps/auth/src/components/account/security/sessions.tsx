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
import { cn } from "@portfolio/ui/lib/utils";

type SessionsProps = React.ComponentProps<typeof Card>;

export function Sessions({
  className,
  id = "sessions",
  ...props
}: SessionsProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
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
  );
}
