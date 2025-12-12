"use client";

import { User } from "lucide-react";
import Link from "next/link";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@portfolio/ui/components/avatar";
import { Button } from "@portfolio/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@portfolio/ui/components/dropdown-menu";
import { Skeleton } from "@portfolio/ui/components/skeleton";

import { api } from "@/trpc/react";

export function UserMenu() {
  const { data, error, isLoading } = api.auth.session.get.useQuery(void 0, {
    retry: false,
  });

  if (error) {
    return (
      <Button variant="outline" asChild>
        <Link href="/login">Login</Link>
      </Button>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-9 w-24" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <Avatar>
            <AvatarImage src={data?.user.image ?? undefined} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              <User />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
