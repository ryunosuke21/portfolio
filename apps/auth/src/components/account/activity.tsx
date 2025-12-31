"use client";

import type React from "react";
import { Clock, Grid3x3, Lock, Settings } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@portfolio/ui/components/card";
import { cn } from "@portfolio/ui/lib/utils";

type ActivityProps = React.ComponentProps<"section">;

export function Activity({
  className,
  id = "activity",
  ...props
}: ActivityProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            View your account activity and login history
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-l-4 border-l-primary bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                <Lock className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Successful login</p>
                <p className="text-muted-foreground text-sm">
                  Chrome on macOS • San Francisco, CA
                </p>
                <div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="h-3 w-3" />
                  <span>2 minutes ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-l-muted-foreground bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Settings className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Settings updated</p>
                <p className="text-muted-foreground text-sm">
                  Changed password
                </p>
                <div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="h-3 w-3" />
                  <span>3 hours ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-l-muted-foreground bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Grid3x3 className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">New application authorized</p>
                <p className="text-muted-foreground text-sm">
                  Project Management Pro
                </p>
                <div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="h-3 w-3" />
                  <span>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-lg border-l-4 border-l-muted-foreground bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <Lock className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Successful login</p>
                <p className="text-muted-foreground text-sm">
                  Mobile App • New York, NY
                </p>
                <div className="mt-1 flex items-center gap-1 text-muted-foreground text-xs">
                  <Clock className="h-3 w-3" />
                  <span>2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
