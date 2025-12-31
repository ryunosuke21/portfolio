"use client";

import type React from "react";
import { Activity, Calendar, Grid3x3, Mail } from "lucide-react";

import { Button } from "@portfolio/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import { cn } from "@portfolio/ui/lib/utils";

type ApplicationsProps = React.ComponentProps<"section">;

export function Applications({
  className,
  id = "applications",
  ...props
}: ApplicationsProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Authorized Applications</CardTitle>
          <CardDescription>
            Apps and services that have access to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Grid3x3 className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Project Management Pro</p>
                  <p className="mb-2 text-muted-foreground text-sm">
                    Access to profile and email
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>Connected on Jan 15, 2024</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Analytics Dashboard</p>
                  <p className="mb-2 text-muted-foreground text-sm">
                    Read-only access to activity logs
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>Connected on Dec 8, 2023</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Revoke
              </Button>
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                  <Mail className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Email Marketing Suite</p>
                  <p className="mb-2 text-muted-foreground text-sm">
                    Access to email and contacts
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs">
                    <Calendar className="h-3 w-3" />
                    <span>Connected on Nov 22, 2023</span>
                  </div>
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
