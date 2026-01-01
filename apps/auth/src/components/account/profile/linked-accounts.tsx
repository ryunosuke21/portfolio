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
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@portfolio/ui/components/item";
import { cn } from "@portfolio/ui/lib/utils";

type LinkedAccountsProps = React.ComponentProps<typeof Card>;

export function LinkedAccounts({
  className,
  id = "linked-accounts",
  ...props
}: LinkedAccountsProps) {
  return (
    <Card className={cn("space-y-6", className)} id={id} {...props}>
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
  );
}
