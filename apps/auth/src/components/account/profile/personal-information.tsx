"use client";

import type React from "react";
import { Check, X } from "lucide-react";

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
import { PhoneInput } from "@portfolio/ui/components/phone-input";
import { cn } from "@portfolio/ui/lib/utils";

type PersonalInformationProps = React.ComponentProps<typeof Card>;

export function PersonalInformation({
  className,
  id = "personal-information",
  ...props
}: PersonalInformationProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Update your account details and profile information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              defaultValue="john.doe@example.com"
            />
            <Badge variant="secondary" className="flex items-center gap-1">
              <Check className="h-3 w-3" />
              Verified
            </Badge>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="flex gap-2">
            <PhoneInput id="phone" defaultValue="hn" />
            <Badge variant="outline" className="flex items-center gap-1">
              <X className="h-3 w-3" />
              Not Verified
            </Badge>
          </div>
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  );
}
