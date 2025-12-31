"use client";

import type React from "react";
import { GitHubDark, Google } from "@ridemountainpig/svgl-react";
import { Check, Link2, Link2Off, Mail, X } from "lucide-react";

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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@portfolio/ui/components/item";
import { Label } from "@portfolio/ui/components/label";
import { PhoneInput } from "@portfolio/ui/components/phone-input";
import { cn } from "@portfolio/ui/lib/utils";

type ProfileProps = React.ComponentProps<"section">;

export function Profile({ className, id = "profile", ...props }: ProfileProps) {
  return (
    <section id={id} className={cn("space-y-6", className)} {...props}>
      <Card>
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

      <Card>
        <CardHeader>
          <CardTitle>Linked Accounts</CardTitle>
          <CardDescription>
            Connect your account with third-party providers
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Item variant="outline">
            <ItemMedia variant="icon" className="bg-black/80">
              <Google className="size-6" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>Google</ItemTitle>
              <ItemDescription>john.doe@gmail.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                <Link2Off />
                <span>Disconnect</span>
              </Button>
            </ItemActions>
          </Item>
          <Item variant="outline">
            <ItemMedia variant="icon" className="bg-black/80">
              <GitHubDark className="size-6" />
            </ItemMedia>
            <ItemContent>
              <ItemTitle>GitHub</ItemTitle>
              <ItemDescription>john.doe@gmail.com</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="outline" size="sm">
                <Link2 />
                <span>Connect</span>
              </Button>
            </ItemActions>
          </Item>
        </CardContent>
      </Card>
    </section>
  );
}
