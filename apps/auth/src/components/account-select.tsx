"use client";

import { UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@portfolio/ui/components/avatar";
import { Button } from "@portfolio/ui/components/button";
import { Card } from "@portfolio/ui/components/card";

interface Account {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const sampleAccounts: Account[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "/professional-woman-diverse.png",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "/professional-man.jpg",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    avatar: "/professional-person.png",
  },
];

export function AccountSelection() {
  const handleAccountSelect = (account: Account) => {
    console.log("[v0] Selected account:", account.email);
    // Handle account selection
  };

  const handleAddAccount = () => {
    console.log("[v0] Add account clicked");
    // Handle adding new account
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border bg-card p-8 shadow-sm">
        <div className="mb-8 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/logo.svg" alt="YourBrand" width={100} height={100} />
          </div>
          <h1 className="mb-2 text-balance font-normal text-2xl text-card-foreground">
            {"Choose an account"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {"to continue to YourBrand"}
          </p>
        </div>

        <div className="space-y-2">
          {sampleAccounts.map((account) => (
            <Button
              key={account.id}
              onClick={() => handleAccountSelect(account)}
              variant="outline"
              className="flex w-full items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-accent"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={account.avatar || "/placeholder.svg"}
                  alt={account.name}
                />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {account.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p className="truncate font-medium text-card-foreground text-sm">
                  {account.name}
                </p>
                <p className="truncate text-muted-foreground text-xs">
                  {account.email}
                </p>
              </div>
            </Button>
          ))}

          <Button
            onClick={handleAddAccount}
            variant="outline"
            className="flex w-full items-center gap-4 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-accent"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted-foreground">
              <UserPlus className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-card-foreground text-sm">
                {"Use another account"}
              </p>
            </div>
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 text-muted-foreground text-xs">
          <Link
            href="/privacy-policy"
            className="transition-colors hover:text-card-foreground"
          >
            {"Privacy Policy"}
          </Link>
          <span>{"•"}</span>
          <Link
            href="/terms-of-service"
            className="transition-colors hover:text-card-foreground"
          >
            {"Terms of Service"}
          </Link>
        </div>
      </Card>
    </div>
  );
}
