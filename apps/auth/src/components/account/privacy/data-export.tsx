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
import { cn } from "@portfolio/ui/lib/utils";

type DataExportProps = React.ComponentProps<typeof Card>;

export function DataExport({
  className,
  id = "data-export",
  ...props
}: DataExportProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Data Export</CardTitle>
        <CardDescription>Download a copy of your personal data</CardDescription>
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
  );
}
