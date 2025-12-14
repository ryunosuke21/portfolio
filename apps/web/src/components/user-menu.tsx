"use client";

import { useQueryClient } from "@tanstack/react-query";
import {
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  User,
  User2,
  UserCircle2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@portfolio/ui/components/avatar";
import { Button } from "@portfolio/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@portfolio/ui/components/dropdown-menu";
import { Skeleton } from "@portfolio/ui/components/skeleton";

import { signOut } from "@/hooks/auth";
import { api } from "@/trpc/react";

export function UserMenu() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data, error, isLoading } = api.auth.session.get.useQuery(void 0, {
    retry: false,
  });

  function handleSignOut() {
    toast.promise(signOut, {
      loading: "Signing out...",
      success: () => {
        router.refresh();
        queryClient.clear();
        return "Signed out";
      },
    });
  }

  if (error) {
    return (
      <Button variant="outline" asChild>
        <Link href="/sign-in">Login</Link>
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
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuItem
          className="justify-between p-0 pr-1.5 font-normal"
          asChild
        >
          <Link href="/account/select">
            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={data?.user.image ?? undefined}
                  alt={data?.user.name ?? ""}
                />
                <AvatarFallback className="rounded-lg">
                  <User2 />
                </AvatarFallback>
              </Avatar>
              <div className="line-clamp-1 grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {data?.user.name ?? ""}
                </span>
                <span className="truncate text-muted-foreground text-xs">
                  {data?.user.email ?? ""}
                </span>
              </div>
            </div>
            <ChevronsUpDown />
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserCircle2 />
              Account
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={handleSignOut}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
